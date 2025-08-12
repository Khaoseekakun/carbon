import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ id: string }>
}
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        const public_transport = await prisma.publicTransportTypes.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (public_transport) {
            return NextResponse.json({
                success: true,
                data: public_transport
            })
        } else {
            return NextResponse.json({
                success: false,
                message : "Public Transport Not Found"
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงข้อมูลได้"
        })
    }
}