import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        console.log(id)

        if (isNaN(Number(id))) {
            return NextResponse.json({
                status: false,
                message: "Organization ID is NAN"
            })
        }


        const org_data = await prisma.organization.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (org_data) {
            const { org_password, ...orgWithoutPassword } = org_data;
            return NextResponse.json({
                status: true,
                organization: orgWithoutPassword
            });
        } else {
            return NextResponse.json({
                status: false,
                message: "Organization not found"
            });
        }

    } catch (error) {
        return NextResponse.json(
            { status: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}