import prisma from "@/libs/connect_db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    const data = await req.json();

    try {
        if (!data.id) {
            throw new Error("Missing required fields");
        }

        const card = await prisma.card.findUnique({
            where: {
                id: data.id
            }
        });

        if (!card) {
            return NextResponse.json({ error: "Card not found" }, { status: 404 });
        }

        if (card.content === data.description) {
            return NextResponse.json({ message: "Card already has this description" }, { status: 200 });
        }

        if (!data.description) {
            const addDescription = await prisma.card.update({
                where: {
                    id: data.id
                },
                data: {
                    content: ""
                }
            });
        }

        const addDescription = await prisma.card.update({
            where: {
                id: data.id
            },
            data: {
                content: data.description
            }
        });

        return NextResponse.json(addDescription.content, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}