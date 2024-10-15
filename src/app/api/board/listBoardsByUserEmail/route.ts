import { NextRequest,NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log(data);
        if (!data.userEmail) {
            throw new Error("Missing required fields");
        }
        const user = await prisma.user.findUnique({
            where: { email: data.userEmail }
        });
        
        
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        const boards = await prisma.board.findMany({
            where: {
                userId: user.id
            },
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
