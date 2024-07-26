
"use client"

import { ServerWithMembersWithProfiles } from "@/types"
import { Roles } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ChevronDownIcon, LogOut, Plus, Settings, Trash, User,MessageCirclePlus } from "lucide-react"
import { useModal } from "@/hooks/use-model-store"

interface ServerHeaderProps {
     server:ServerWithMembersWithProfiles,
     role?:Roles
}
const ServerHeader = ({
    server,
    role
}:ServerHeaderProps) => {
    const onOpen = useModal();
    const isAdmin = role == Roles.Admin
    const isModerator = isAdmin || role == Roles.Moderator
    console.log(role)

    const handleInvite=()=>{
        onOpen.onOpen("Invite",{server})
    }
    const handleServerSettings=()=>{
        onOpen.onOpen("editServer",{server})
    }
    const handleManageMember=()=>{
        onOpen.onOpen("members",{server})
    }
    
  return (
   <DropdownMenu>
    <DropdownMenuTrigger className="focus:outline-none" asChild>
    <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 ">{server.name}
    <ChevronDownIcon className="h-5 w-5 ml-auto"/>
    </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
    { isModerator && (
        <DropdownMenuItem onClick={handleInvite}>
            Invite People 
            <MessageCirclePlus className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>

    )}
    { isAdmin && (
        <DropdownMenuItem onClick={handleServerSettings}>
           Server Settings
           <Settings className="w-4 h-4 ml-auto"/>
        </DropdownMenuItem>

    )}
    { isModerator && (
        <DropdownMenuItem onClick={handleManageMember}>
           Manage Members
           <User className="w-4 h-4 ml-auto"/>
        </DropdownMenuItem>

    )}
    { isModerator && (
        <DropdownMenuItem>
           Create Channels
           <Plus className="w-4 h-4 ml-auto"/>
        </DropdownMenuItem>

    )}

    {
        isModerator &&
        <DropdownMenuSeparator/>
    }

    {
        isAdmin && (
            <DropdownMenuItem className="text-rose-500">
                Delete Server
           <Trash className="w-4 h-4 ml-auto"/>

            </DropdownMenuItem>
        )
    }
    {
        !isAdmin && (
            <DropdownMenuItem className="text-rose-500">
                Leave Server
           <LogOut className="w-4 h-4 ml-auto"/>

            </DropdownMenuItem>
        )
    }
    </DropdownMenuContent>

   </DropdownMenu>
  )
}

export default ServerHeader