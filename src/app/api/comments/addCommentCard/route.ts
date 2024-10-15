import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

interface Comment {
    id: string;
    content: string;
    cardId: string;
    userEmail: string;
}

export async function POST(req: NextRequest) {
    try {
        const data:Comment = await req.json();

        if (!data.content || !data.cardId || !data.userEmail) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        const listComment = await prisma.listComment.findUnique({
            select: {
                id: true
            },
            where: {
                cardId: data.cardId
            }
        });

        const UserId = await prisma.user.findUnique({
            select: {
                id: true
            },
            where: {
                email: data.userEmail
            }
        });
        console.log(data);
        if (!listComment || !UserId) {
            return NextResponse.json({ error: "List Comment not found" }, { status: 404 });
        }
        const comment = await prisma.comment.create({
            data: {
                content: data.content,
                listCommentId: listComment.id,
                userId: UserId?.id
            }
        });
        
        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
