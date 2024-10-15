import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/connect_db";


// get all comments of a card
export async function GET(req: NextRequest) {
    try {
        const qparams = req.nextUrl.searchParams.get("id");

        if (!qparams) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        const comments = await prisma.comment.findMany({
            where: {
                listComment: {
                    cardId: qparams
                }
            }
        });
        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

