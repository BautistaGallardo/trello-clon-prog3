import { NextRequest,NextResponse } from "next/server";
import prisma from "@/libs/connect_db"; 

export async function GET(req: NextRequest){
    try {
        const qparam = req.nextUrl.searchParams.get("id");

        if (!qparam) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        const board = await prisma.board.findUnique(
            {
                where: {id: qparam}
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