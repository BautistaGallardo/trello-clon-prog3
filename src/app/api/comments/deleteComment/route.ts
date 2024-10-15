import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

export async function DELETE(req: NextRequest) {
    const data = await req.json();

    try {
        if (!data.id) {
            throw new Error("Missing required fields");
        }

        const comment = await prisma.comment.findUnique({
            where: {
                id: data.id
            }
        });

        if (!comment) {
            throw new Error("Comment not found");
        }

        await prisma.comment.delete({
            where: {
                id: data.id
            }
        });

        return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
