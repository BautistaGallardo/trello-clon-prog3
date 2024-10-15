import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

export async function DELETE(req: NextRequest) {
    const data = await req.json();

    try {
        if (!data.id) {
            throw new Error("Missing required fields");
        }

        // Buscar el tablero y validar su existencia
        const board = await prisma.board.findUnique({
            where: {
                id: data.id
            }
        });

        if (!board) {
            throw new Error("Board not found");
        }

        // Eliminar comentarios asociados a todas las tarjetas asociadas al tablero
        await prisma.comment.deleteMany({
            where: {
                listComment: {
                    card: {
                        listCard: {
                            boardId: data.id
                        }
                    }
                }
            }
        });

        await prisma.listComment.deleteMany({
            where: {
                card: {
                    listCard: {
                        boardId: data.id
                    }
                }
            }
        });

        // Eliminar tarjetas asociadas a todas las listas de tarjetas asociadas al tablero
        await prisma.card.deleteMany({
            where: {
                listCard: {
                    boardId: data.id
                }
            }
        });

        // Eliminar listas de tarjetas asociadas al tablero
        await prisma.listCard.deleteMany({
            where: {
                boardId: data.id
            }
        });

        // Finalmente, eliminar el tablero principal
        await prisma.board.delete({
            where: {
                id: data.id
            }
        });

        return NextResponse.json({ message: "Board deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
