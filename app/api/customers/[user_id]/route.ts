import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        if (isNaN(Number(id))) {
            return NextResponse.json({
                status: false,
                message: "Customer ID is NAN"
            })
        }

        const clustomer_data = await prisma.customers.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (clustomer_data) {
            const { password, ...clustomerWithoutPassword } = clustomer_data;
            return NextResponse.json({
                status: true,
                clustomer: clustomerWithoutPassword
            });
        } else {
            return NextResponse.json({
                status: false,
                message: "Customer not found"
            });
        }

    } catch (error) {
        return NextResponse.json(
            { status: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}