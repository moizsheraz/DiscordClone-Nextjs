import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req:Request,{params}:{params:{serverId:string}}){
    try{
        const profile =  await currentProfile();
        const {name,imageUrl} =  await req.json();
        if(!profile){
            return new NextResponse("Unauthorized",{status:401});
        }
        const server = await db.server.update({
            where:{
                id:params.serverId,
                profileId:profile.id // only admins can update the server
            },
            data:{
                 name,
                 imageUrl
            }
            
        })

        return new NextResponse(JSON.stringify(server), { status: 200 });


    }catch(error){
        return new NextResponse("Internal Server Error",{status:500});
    }
}



export async function DELETE(req:Request,{params}:{params:{serverId:string}}){
    try{
        const profile =  await currentProfile();
        if(!profile){
            return new NextResponse("Unauthorized",{status:401});
        }
        const server = await db.server.delete({
            where:{
                id:params.serverId,
                profileId:profile.id // only admins can delete the server
            }
            
        })

        return new NextResponse(JSON.stringify(server), { status: 200 });


    }catch(error){
        return new NextResponse("Internal Server Error",{status:500});
    }
}