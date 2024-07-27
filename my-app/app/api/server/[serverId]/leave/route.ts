import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function Patch(
    req:Request,
    {params}:{params:{serverId: string}}

){
try{
const profile = await currentProfile();
if(!profile){
    return new NextResponse("Unauthorized",{status:401});
}
if(!params.serverId){
    return new NextResponse("Server ID is required", { status: 400 });
}

const server = await db.server.update({
  where:{
    id:params.serverId,
   profileId:{
    not:profile.id
   },
   members:{
    some:{
        profileId:profile.id
    }
   }

  },
  data:{
    members:{
        deleteMany:{
            profileId:profile.id
        }
    }
  }

  });

  return NextResponse.json("Server member removed successfully", { status: 200 });

}catch(error) {
    console.log(error);
}

}