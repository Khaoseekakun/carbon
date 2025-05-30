import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken"
interface bodyData {
    loginType: "person" | "org",
    email: string,
    password: string,

}
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as bodyData
        // Check if any field in bodyData is missing or empty
        const requiredFields: (keyof bodyData)[] = [
            "loginType",
            "email",
            "password",
        ];

        const missingFields = requiredFields.filter(
            (field) => body[field] === undefined || body[field] === null || body[field] === ""
        );

        if (missingFields.length > 0) {
            return NextResponse.json({
                status: false,
                message: `กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(", ")}`
            });
        }

        const hasPassword = createHash('sha256').update(body.password).digest('hex')

        if (body.loginType == "person") {
            const getCustomer = await prisma.customers.findFirst({
                where: {
                    email: body.email
                }
            })


            if (getCustomer) {
                if (getCustomer.password == hasPassword) {
                    const token = jwt.sign({
                        id: getCustomer.id,
                        email: getCustomer.email,
                        username: getCustomer.username,
                        org_id: getCustomer.organizationId,
                        phone: getCustomer.phone,
                        picture: getCustomer.profilePicture
                    }, process.env.JSONWEBTOKEN_SECRET!, {
                        expiresIn: '30m'
                    })


                    return NextResponse.json({
                        status: true,
                        data: {
                            id: getCustomer.id,
                            email: getCustomer.email,
                            org_id: getCustomer.organizationId,
                            phone: getCustomer.phone,
                            picture: getCustomer.profilePicture,
                            token : token
                        },
                        message : "เข้าสู่ระบบสำเร็จ"
                    })
                }

                return NextResponse.json({
                    status: false,
                    message: "อีเมล หรือ รหัสผ่านไม่ถูกต้อง"
                })
            } else {
                // 
                return NextResponse.json({
                    status: false,
                    message: "อีเมล หรือ รหัสผ่านไม่ถูกต้อง"
                })
            }
        }

    } catch (error) {
        return NextResponse.json({
            status: false,
            message: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
        })
    }
}