"use client"
import { Channel, ChannelTypes, Roles, Server } from '@prisma/client'
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ActionToolTip } from '../ui/action-tooltip'
import { useModal } from '@/hooks/use-model-store'

interface ServerChannelProps {
channel:Channel,
server:Server,
role?:Roles
}
const iconMap={
    [ChannelTypes.Text]:Hash,
    [ChannelTypes.Audio]:Mic,
    [ChannelTypes.Video]:Video
};


const ServerChannel = ({
    channel,server,role
}:ServerChannelProps) => {
    const params = useParams();
    const router = useRouter();
    const onOpen = useModal();
    const Icon = iconMap[channel.type];

    const handleDeleteChannel=()=>{
        onOpen.onOpen("DeleteServer", {server,channel });

    }
    const handleEditChannel = () => {
        onOpen.onOpen("editChannel", { server,channel });
    }

  return (
  <Button variant={"destructive"} className={cn(" px-2 py-2 rounded-md flex justify-start  gap-x-2 w-full bg-transparent hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1")} >
<Icon className="flex-shrink-0 w-5 h-5 text-zinc-500" />
<p className={cn(params.channelId === channel.id && "text-purple-700","text-zinc-500 hover:text-zinc-600 dark:text-zinc-400")}>{channel.name}</p>
{channel.name !== "general" && role != Roles.Guest && (
    <div className="ml-auto flex items-center gap-x-2">
        <ActionToolTip label='Edit'>
    <Edit className=' group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition ' onClick={handleEditChannel}/>
        </ActionToolTip>
        <ActionToolTip label='Delete'>
    <Trash className=' group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition '  onClick={handleDeleteChannel}/>
        </ActionToolTip>
    </div>
)}
{channel.name == "general" && (
    <Lock className=" w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 ml-auto "/>
)}
  </Button>
  )
}

export default ServerChannel