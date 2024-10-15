import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

export async function DELETE(req: NextRequest) {
    const data = await req.json();

    try {
        if (!data.id) {
            throw new Error("Missing required fields");
        }

        const listCard = await prisma.listCard.findUnique({
            where: {
                id: data.id
            }
        });

        if (!listCard) {
            throw new Error("List not found");
        }

        await prisma.comment.deleteMany({
            where: {
                listComment:{
                    card: {
                        listCardId: data.id
                    }
                }
            }
        });

        await prisma.listComment.deleteMany({
            where: {
                card: {
                    listCardId: data.id
                }
            }
        });

        await prisma.card.deleteMany({
            where: {
                listCardId: data.id
            }
        });

        await prisma.listCard.delete({
            where: {
                id: data.id
            }
        });

        return NextResponse.json({ message: "List deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
