import prisma from "@/libs/connect_db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
    const data = await req.json();
    if (!data.title || !data.content || !data.boardId) {
        return new NextResponse("Missing required fields", { status: 400 });
    }

    const maxIndex = await prisma.listCard.findFirst({
        where: {
            boardId: data.boardId
        },
        select: {
            index: true
        },
        orderBy: {
            index: "desc"
        }
    });

    const newIndex = maxIndex ? maxIndex.index + 1 : 0;

    const listCard = await prisma.listCard.create({
        data: {
            title: data.title,
            content: data.content,
            boardId: data.boardId,
            index: newIndex
        }
    });

    // actualiza el index de las listas
    const updateIndex = await prisma.listCard.updateMany({
        where: {
            boardId: data.boardId,
            index: {
                gte: newIndex
            }
        },
        data: {
            index: {
                increment: 1
            }
        }
    });

    return NextResponse.json({...listCard,card:[]});
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}