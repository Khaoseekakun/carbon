import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

interface bodyData {
    org_name: string,
    org_email: string,
    org_password: string,
    org_phone: string,
    org_address: string,
    org_city: string,
    org_province: string,
    org_zipCode: string

}
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as bodyData
        // Check if any field in bodyData is missing or empty
        const requiredFields: (keyof bodyData)[] = [
            "org_name",
            "org_email",
            "org_password",
            "org_phone",
            "org_address",
            "org_city",
            "org_province",
            "org_zipCode",
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

        const hasPassword = createHash('sha256').update(body.org_password).digest('hex')

        const saveData = await prisma.organization.create({
            data: {
                org_name: body.org_name,
                org_email: body.org_email,
                org_password: hasPassword,
                org_phone: body.org_phone,
                org_address: body.org_address,
                org_city: body.org_city,
                org_province: body.org_province,
                org_zipCode: body.org_zipCode,
            }
        });
        return NextResponse.json({
            status: true,
            message: "สร้างบัญชีองค์กรสำเร็จ",
            data: saveData
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: false,
            message: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
        })
    }
}