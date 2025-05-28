import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // use org_name
        const searchParams = new URLSearchParams(req.nextUrl.search);
        const org_name = searchParams.get('org_name');
        if (org_name) {

            const org_value = await prisma.organization.findMany({
                where: {
                    org_name: {
                        contains: org_name
                    }
                },
                take: 50
            })
            return NextResponse.json({
                organizations: org_value
            })
        } else {
            const org_value = await prisma.organization.findMany({
                take: 50
            })
            return NextResponse.json({
                organizations: org_value
            })
        }

    } catch (error) {
        console.log(error as any)
        return NextResponse.json({}, {
            status: 500
        })
    }
}