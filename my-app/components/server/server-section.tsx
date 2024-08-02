"use client"

import { ServerWithMembersWithProfiles } from "@/types"
import { Roles,ChannelTypes } from "@prisma/client"
import { ActionToolTip } from "../ui/action-tooltip"
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-model-store";

interface ServerSectionProps{
    label:string,
    role?:Roles,
    sectionType:"channels" | "members",
    channelType?:ChannelTypes
    server?:ServerWithMembersWithProfiles

}
const ServerSection = ({label,role,sectionType,channelType,server}:ServerSectionProps) => {
    const onOpen = useModal();
    const handleCreateChannel=()=>{
        onOpen.onOpen("createChannel",{server})
    }
  return (
    <div className="flex items-center justify-between py-2">
        <p className="text-xs uppercase font-semibold text-zinc-500 dar:text-zinc-400">
            {label}
        </p>
        {role !== Roles.Guest && sectionType === "channels" && (
            <ActionToolTip label="Create Channel">
                <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition " onClick={handleCreateChannel}>
                    <Plus className="h-4 w-4 "/>
                </button>
            </ActionToolTip>
        )}
    </div>
  )
}

export default ServerSection