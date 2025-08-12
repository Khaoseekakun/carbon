import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ id: string, model_id : string }>
}
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const {id, model_id} = await params
        const air = await prisma.airModels.findFirst({
            where: {
                id : Number(model_id),
                brandId: Number(id)     
            }
        })

        if(air){
            return NextResponse.json({
                success : true,
                data : air
            })
        }else{
            return NextResponse.json({
                success : false,
                message : "Air Model not found"
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงข้อมูลได้"
        })
    }
}