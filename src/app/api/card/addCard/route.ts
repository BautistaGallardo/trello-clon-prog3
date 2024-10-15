import Card from "@/components/card/card";
import listContent from "@/components/listCard/componentsListCard/listContent";
import prisma from "@/libs/connect_db";
import { NextResponse, NextRequest } from "next/server";

interface Card {
    id: string;
    title: string;
    content: string;
    listCardId: string;
    index: number;
}


export async function GET(req: NextRequest) {
    try {
        const cards = await prisma.card.findMany({});
        
        return NextResponse.json(cards);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function POST(req:Request) {
    try {
        const data = (await req.json()) as Card;

        // search the actual max index
        const maxIndex = await prisma.card.findFirst({
            where: {
                listCardId: data.listCardId
            },
            select: {
                index: true
            },
            orderBy: {
                index: "desc"
            }
        });

        const newIndex = maxIndex ? maxIndex.index + 1 : 0;

        const card = await prisma.card.create({
            data: {
                title: data.title,
                content: data.content,
                listCardId: data.listCardId,
                index: newIndex
            }
        });

        const listComment = await prisma.listComment.create({
            data: {
                cardId: card.id   
            }
        });
        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: card
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }    
}

