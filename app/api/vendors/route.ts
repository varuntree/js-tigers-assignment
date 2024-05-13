import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";



export async function GET(req: NextRequest) {
  function replacer(key:any, value:any) {
    if (typeof value === 'bigint') {
      return value.toString(); // Convert BigInt to string
    }
    return value; // Return other values unchanged
  }
  
  try {
    const session:any = await getServerSession(authOptions); // Pass the request and auth options
    
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    
    const result = await prisma.user.findFirst({
      where: {
        id: Number(session.user?.id)
      },
      include: {
        vendor: true,
      },
    });
    
    const jsonString = JSON.stringify({ result }, replacer);
    return new Response(jsonString)
  } catch (e) {
    console.error(e); 
    return NextResponse.json({message:"this is an hndlerd error"})
  }
}
