import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

export async function PUT(req: NextRequest) {
    try {
    if (!req.body) {
        return new NextResponse("Missing request body", { status: 400 });
    }

    const data = await req.json()

    const newArray = data.newLists.map(async (list: any) => {
        const updateCardPosition = list.card.map(async (card: any, index:number) => {
            const updateCard = await prisma.card.update({
                where: {
                    id: card.id
                },
                data: {
                    index: index
                }
            })
            if (card.listId !== list.id) {
                const updateCardList = await prisma.card.update({
                    where: {
                        id: card.id
                    },
                    data: {
                        listCardId: list.id
                    }
                })
            }
        })
    })

    return NextResponse.json(newArray);

    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

} 