import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Roles } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
){
    try{
const profile = await currentProfile();
const {name,type} = await req.json();
const {searchParams} = new URL(req.url);
const serverId = searchParams.get("serverId");
if(!profile){
    return new NextResponse("Unauthorized", { status: 401 });
}
if(!serverId){
    return new NextResponse("Server ID is required", { status: 400 });
}
if(name === "general"){
    return new NextResponse("Name can't be 'General'", { status: 400 });
}
const server = await db.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
          role: {
            in: [Roles.Admin, Roles.Moderator],
          },
        },
      },
    },
    include: {
      channels: true,
    },
  });
  
  if (server) {
    await db.channel.create({
      data: {
        profileId: profile.id,
        name,
        type,
        serverId: server.id,
      },
    });
  }
  
  return new NextResponse("Channel created successfully", { status: 200 });

    }catch(error){
console.log(error);
return new NextResponse("Internal Server Error", { status: 500 });
    }
}