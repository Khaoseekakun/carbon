import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

interface bodyData {
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    city: string,
    province: string,
    zipCode: string,
    org_select: number

}
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as bodyData
        // Check if any field in bodyData is missing or empty
        const requiredFields: (keyof bodyData)[] = [
            "username",
            "email",
            "password",
            "phone",
            "address",
            "city",
            "province",
            "zipCode",
            "org_select"
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

        const saveData = await prisma.customers.create({
            data: {
                username: body.username,
                email: body.email,
                password: hasPassword,
                phone: body.phone,
                address: body.address,
                city: body.city,
                province: body.province,
                zipCode: body.zipCode,
                org_memberOf: {
                    connect: {
                        id: Number(body.org_select)
                    }
                },
                organizationId: Number(body.org_select),
            }
        });
        return NextResponse.json({
            status: true,
            message: "สร้างบัญชีผู้ใช้สำเร็จ",
            data: saveData
        });
    } catch (error) {
        return NextResponse.json({
            status: false,
            message: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
        })
    }
}