import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ id: string }>
}
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const {id} = await params
        const airModel = await prisma.airModels.findMany({
            where : {
                brandId : Number(id)
            }
        })

        return NextResponse.json({
            success : true,
            data : airModel
        })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงข้อมูลได้"
        })
    }
}