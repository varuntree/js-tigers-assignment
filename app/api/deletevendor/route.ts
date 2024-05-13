import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function DELETE(req: NextRequest) {
    
    try {
        const body = await req.json();
        const id = parseInt(body.id, 10);
        console.log("id is the follwo", id)
        if (isNaN(id)) {
            return NextResponse.json({ message: "Invalid ID format" });
        }

        const result = await prisma.vendor.delete({
            where: {
                id: id
            }
        });
        console.log(result)

        return NextResponse.json({ message: "Successfully deleted" });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Some error in deleting in the db"});
    }
}
