import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className=" flex flex-col items-center h-full text-primary bg-slate-100 w-full dark:bg-[#1E1F22] light py-3">
     <div className="flex gap-3 flex-col">
     <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full  ">
        {/* Here we will render user's servers */}
        {servers.map((server) => (
          <div key={server.id} className="mb-4 ">
           <NavigationItem id={server.id} imageUrl={server.imageUrl} name={server.name}/>
          </div>
        ))}
      </ScrollArea>
     </div>

<div className="pb-3  mt-auto flex items-center flex-col gap-y-4">
<ModeToggle/>
<UserButton afterSignOutUrl="/" appearance={{
   elements:{
      avatarBox:"h-[48px] w-[48px] "
   }
}}/>
</div>

    </div>
  );
};
