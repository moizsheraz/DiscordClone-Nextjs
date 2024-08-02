"use client"
import { Channel, ChannelTypes, Roles, Server } from '@prisma/client'
import { Hash, Mic, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

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
    const Icon = iconMap[channel.type];

  return (
  <Button variant={"destructive"} className={cn(" px-2 py-2 rounded-md flex justify-start  gap-x-2 w-full bg-transparent hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1")} >
<Icon className="flex-shrink-0 w-5 h-5 text-zinc-500" />
<p className={cn(params.channelId === channel.id && "text-purple-700")}>{channel.name}</p>
  </Button>
  )
}

export default ServerChannel