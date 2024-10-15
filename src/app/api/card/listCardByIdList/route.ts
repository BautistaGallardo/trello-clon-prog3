import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

export async function POST(req: NextRequest) {
    try {
    const data = await req.json();
    const cards = await prisma.card.findMany({
        where: {
            listCardId: data.id
        },
        orderBy: {
            index: "asc"
        }
    });
    return NextResponse.json(cards);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}