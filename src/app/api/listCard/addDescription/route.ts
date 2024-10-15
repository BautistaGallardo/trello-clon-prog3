import prisma from "@/libs/connect_db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    const data = await req.json();

    try {
        if (!data.id || !data.description) {
            throw new Error("Missing required fields");
        }

        const list = await prisma.listCard.findUnique({
            where: {
                id: data.id
            }
        });

        if (!list) {
            return NextResponse.json({ error: "Card not found" }, { status: 404 });
        }

        if (list.content === data.description) {
            return NextResponse.json({ message: "Card already has this description" }, { status: 200 });
        }

        const addDescription = await prisma.listCard.update({
            where: {
                id: data.id
            },
            data: {
                content: data.description
            }
        });

        return NextResponse.json({ message: "Card and its comments deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}