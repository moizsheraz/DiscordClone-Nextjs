import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import Error from "next/error";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!params.serverId) {
            return new NextResponse("Server ID is required", { status: 400 });
        }
        // only admin will do this all
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                inviteCode: uuidv4()
            }
        });
        return new NextResponse(JSON.stringify(server), { status: 200 });
    } catch (error:any) {
        console.log("[SERVER_ID]", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
