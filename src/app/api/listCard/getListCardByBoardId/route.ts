import prisma from "@/libs/connect_db";
import { NextResponse, NextRequest,NextFetchEvent } from "next/server";

export async function GET(req: NextRequest) {
    try {
    const qparam = req.nextUrl.searchParams.get("id");

    if (!qparam) {
        return new NextResponse("Bad Request", { status: 400 });
    }
    const list = await prisma.listCard.findMany({
        where: {
            boardId: qparam
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