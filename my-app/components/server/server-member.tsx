"use client"

import { Member, Profile ,Roles,Server} from "@prisma/client"
import { ShieldAlert, ShieldCheck } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { UserAvatar } from "../user-avatar"


interface ServerMemberProps{
    member : Member & {profile:Profile},
    server:Server
}
const ServerMember = ({member,server}:ServerMemberProps) => {
    const roleIconMap={
        [Roles.Guest] : null,
        [Roles.Moderator] : <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
        [Roles.Admin] : <ShieldAlert className="h-4 w-4 text-indigo-500"/>,
    }
    const params = useParams();
    const router = useRouter();
    const icon = roleIconMap[member.role];
  return (
    <Button variant={"destructive"} className={cn(" px-2 py-4 justify-start  rounded-md flex  gap-x-2 w-full bg-transparent hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1")} >
   {icon}
    <p className={cn(params.memberId === member.id && "text-purple-700","text-zinc-500 gap-3 flex justify-center items-center hover:text-zinc-600 dark:text-zinc-400")}>
        <UserAvatar src={member.profile.imageUrl} className="h-8 w-8 md:h-8 md:w-8"  />
        {member.profile.name}
        </p>

      </Button>
  )
}

export default ServerMember