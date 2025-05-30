import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = new URLSearchParams(req.nextUrl.search);
        const email = searchParams.get('email');
        if (email) {
            const checkEmail = await prisma.customers.findFirst({
                where: {
                    email: email
                }
            })

            return NextResponse.json({
                status: true,
                customer: checkEmail
            })

        } else {
            return NextResponse.json({
                status: false,
                message: "โปรดกรอกอีเมล"
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: false,
            message: "เซิร์ฟเวอร์ไม่สามารถตอบกลับได้"
        })
    }
}