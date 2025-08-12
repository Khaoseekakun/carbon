import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ id: string, model_id : string }>
}
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const {id, model_id} = await params
        const motorcycl = await prisma.motorcycleModels.findFirst({
            where: {
                id : Number(model_id),
                brandId: Number(id)     
            }
        })

        if(motorcycl){
            return NextResponse.json({
                success : true,
                data : motorcycl
            })
        }else{
            return NextResponse.json({
                success : false,
                message : "Car Model not found"
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงข้อมูลได้"
        })
    }
}