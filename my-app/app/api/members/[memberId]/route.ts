import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
  {params}:{params:{memberId:string}}
){
try{

}catch(error){
    return new NextResponse("Internal Server Error",{status:500})
}
}