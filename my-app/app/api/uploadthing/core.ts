import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from '@clerk/nextjs/server';
 
const f = createUploadthing();
 

const handleAuth = () => {
    const { userId } = auth();
    if (!userId) {
        throw new UploadThingError("Unauthorized");
    }
    return {userId:userId};
}


export const ourFileRouter = {

    serverImage: f(["image"])
    .middleware(()=>handleAuth())
    .onUploadComplete((data) => console.log("file", data)),

    messageFile: f(["image", "pdf"])
    .middleware(()=>handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
