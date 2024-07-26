import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelTypes } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

interface ServerSideBarProps {
  serverId: string;
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
    </div>
  );
};

export default ServerSideBar;
