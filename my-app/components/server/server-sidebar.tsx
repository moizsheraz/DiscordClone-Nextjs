import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelTypes, Roles } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./server-search";
import { Hash, Mic, Video } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Separator } from "../ui/separator";

interface ServerSideBarProps {
  serverId: string;
}

const iconMap={
  [ChannelTypes.Text]:<Hash className="mr-2 h-4 w-4"/>,
  [ChannelTypes.Audio]:<Mic className="mr-2 h-4 w-4"/>,
  [ChannelTypes.Video]:<Video className="mr-2 h-4 w-4"/>
}
const roleIconMap=
{
[Roles.Guest] : null,
  [Roles.Moderator] : <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500"/>,
  [Roles.Admin] : <ShieldCheck className="mr-2 h-4 w-4 text-red-500"/>
}

const ServerSideBar = async ({ serverId }: ServerSideBarProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  const textChannels = server.channels.filter((channel) => ChannelTypes.Text === channel.type);
  const audioChannels = server.channels.filter((channel) => ChannelTypes.Audio === channel.type);
  const videoChannels = server.channels.filter((channel) => ChannelTypes.Video === channel.type);

  // Check the structure of server.members and profile to ensure correct filtering
  console.log('Server Members:', server.members);
  console.log('Current Profile:', profile);

  const members = server.members.filter((member) => member.profileId !== profile.id); // Exclude current user
  const currentUserMember = server.members.find((member) => member.profileId === profile.id);

  // Check if the currentUserMember and its role are correct
  console.log('Current User Member:', currentUserMember);

  const role = currentUserMember?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31]">
        <ServerHeader role={role} server={server} />
        <ScrollArea className="flex-1 px-3">
          <div className="mt-2">
      <ServerSearch data={[
        {
          label: "Text Channels",
          type:"channel",
          data:textChannels?.map((channel)=>{
            return {
              icon: iconMap[channel.type],
              name: channel.name,
              id: channel.id,
            }
            
          } )
        },
        {
          label: "Voice Channels",
          type:"channel",
          data:audioChannels?.map((channel)=>{
            return {
              icon: iconMap[channel.type],
              name: channel.name,
              id: channel.id,
            }
            
          } )
        },
        {
          label: "Video Channels",
          type:"channel",
          data:videoChannels?.map((channel)=>{
            return {
              icon: iconMap[channel.type],
              name: channel.name,
              id: channel.id,
            }
            
          } )
        },
        {
          label: "Members",
          type:"member",
          data:members?.map((member)=>{
            return {
              icon: roleIconMap[member.role],
              name: member.profile.name,
              id: member.id,
            }
            
          } )
        }

      ]}/>
          </div>
          <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
        </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
