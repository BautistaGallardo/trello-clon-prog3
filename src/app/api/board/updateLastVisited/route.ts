import prisma from "@/libs/connect_db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const data = (await req.json());

        if (!data.id) {
            throw new Error("Missing required fields");
        }

        const board = await prisma.board.findUnique({
            where: {
                id: data.id
            }
        });

        if (!board) {
            return new NextResponse("Board not found", { status: 404 });
        }

        const updateBoard = await prisma.board.update({
            where: {
                id: data.id
            },
            data: {
                lastVisited: new Date()
            }
        });

        return NextResponse.json(updateBoard);

    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
