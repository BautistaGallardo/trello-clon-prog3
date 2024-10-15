import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

export async function DELETE(req: NextRequest) {
    const data = await req.json();

    try {
        if (!data.id) {
            throw new Error("Missing required fields");
        }

        // Buscar la carta y validar su existencia
        const card = await prisma.card.findUnique({
            where: {
                id: data.id
            }
        });

        if (!card) {
            throw new Error("Card not found");
        }

        // Eliminar los comentarios asociados a la carta
        await prisma.comment.deleteMany({
            where: {
                listComment:{
                    cardId: data.id
                }
            }
        });

        await prisma.listComment.deleteMany({
            where: {
                cardId: data.id
            }
        });

        // Eliminar la carta
        await prisma.card.delete({
            where: {
                id: data.id
            }
        });

        return NextResponse.json({ message: "Card and its comments deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
