import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/connect_db";

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        if (!data) {
            return new NextResponse("Invalid request data", { status: 400 });
        }

        const newArrayList = data.newLists.map(async (list: any, index:number) => {
            const updateCardListIndex = await prisma.listCard.update({
                where: {
                    id: list.id
                },
                data: {
                    index: index
                }
            });
        })
        return NextResponse.json(newArrayList);

    } catch (error) {
        console.error("Error:", error);
        if (error instanceof SyntaxError) {
            return new NextResponse("Invalid JSON", { status: 400 });
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
