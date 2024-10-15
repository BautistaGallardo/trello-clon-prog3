import { NextRequest,NextResponse } from "next/server";
import prisma from "@/libs/connect_db"; 

export async function POST(req: NextRequest){
    try {
        const data = await req.json()

        const board = await prisma.board.findUnique(
            {
                where: {id: data.id}
            }
        );
        const background = await prisma.backgroud.findUnique(
            {
                where: {id: board?.backgroudId}
            }
        );
        return NextResponse.json(background);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}