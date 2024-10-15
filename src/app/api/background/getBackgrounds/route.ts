import { NextRequest,NextResponse } from "next/server";
import prisma from "@/libs/connect_db"; 

export async function POST(req: NextRequest){
    try {        
        const backgrounds = await prisma.backgroud.findMany();
        return NextResponse.json(backgrounds);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}