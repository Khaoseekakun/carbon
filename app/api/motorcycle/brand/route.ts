import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const motorcycleBrands = await prisma.motorcycleBrands.findMany()
        return NextResponse.json({
            success: true,
            data: motorcycleBrands
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงข้อมูลได้"
        })
    }
}