import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal"

const SetupPage = async() => {
  const profile = await initialProfile();

  // checking if the user is part of any server
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id, // Changed semicolon to comma
        }
      }
    }
  });


  // if user is already part of server then redirect to that server
  if (server) {
    return redirect(`/servers/${server.id}`); // Added parentheses to redirect
  }

  return (
  <InitialModal/>
  );
};

export default SetupPage;
