import prisma from "@/libs/connect_db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = (await req.json())
        console.log(data);
        // Check if the required fields are present in the request data
        if (!data.title || !data.content || !data.userEmail ) {
            throw new Error("Missing required fields");
        }

        const user = await prisma.user.findUnique({
            where: { email: data.userEmail }
        });
        
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Create the board with user connection and background
        const newBoard = await prisma.board.create({
            data: {
                title: data.title,
                content: data.content,
                userId: user.id,
                backgroudId: data.background, // Ensure the correct spelling of backgroundId
            }
        });

        return NextResponse.json(newBoard);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
