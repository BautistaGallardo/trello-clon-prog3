import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

export async function GET(req: NextRequest) {
    try {
        const qparam = req.nextUrl.searchParams.get("userEmail");
        console.log(qparam);
        if (!qparam) {
            throw new Error("Missing required fields");
        }
        const user = await prisma.user.findUnique({
            where: { email: qparam }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const boards = await prisma.board.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                lastVisited: 'desc' 
            },
            take: 6, 
            select: {
                id: true,
                title: true,
                content: true,
                backgroudId: true,
                backgroud: {
                    select: {
                        url: true
                    }
                }
            }
        });

        return NextResponse.json(boards);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
