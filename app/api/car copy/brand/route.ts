import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const carbrand = await prisma.carBrands.findMany()
        return NextResponse.json({
            success: true,
            data: carbrand
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงข้อมูลได้"
        })
    }
}