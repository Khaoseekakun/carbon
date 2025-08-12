import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const public_transport = await prisma.publicTransportTypes.findMany()
        return NextResponse.json({
            success: true,
            data: public_transport
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงข้อมูลได้"
        })
    }
}