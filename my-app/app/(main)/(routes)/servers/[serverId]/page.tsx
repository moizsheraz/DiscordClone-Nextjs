import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}
const page = async ({ params }: ServerIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels:{
        where:{
          name:"general"
        },
        orderBy:{
          createdAt:"asc"
        }
      }
    }
  });

  const initialChannel = server?.channels.find((c) => c.name === "general");
  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id || ""}  `);
};

export default page;
