import prisma from "@/libs/connect_db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
    const data = await req.json();
    const list = await prisma.listCard.findMany({
        where: {
            boardId: data.id
        },
        select: {
            id: true,
            title: true,
            content: true,
            card: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    index: true,
                },
                orderBy: {
                    index: "asc"
                }
            }
        }, 
        orderBy: {
            index: "asc"
        }
    });


    return NextResponse.json(list);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}