import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Roles } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID is required", { status: 400 });
    }

    if (!params.channelId) {
      return new NextResponse("Channel ID is required", { status: 400 });
    }

    const server = await db.server.update({
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
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(server), { status: 200 });

  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
