import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const segments = req.nextUrl.pathname.split('/');
        const id = segments[segments.length - 2]; // Gets '3'
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return NextResponse.json({ error: "Invalid organization id" }, { status: 400 });
        }

        const members_data = await prisma.organization.findFirst({
            where: {
                id: numericId
            },
            include: {
                org_members: {
                    include: {
                        HistoryCalculator: {
                            orderBy: {
                                id: 'desc'
                            }, take: 1
                        }
                    }
                }
            }
        });

        if (!members_data) return NextResponse.json({ error: "Invalid organization id" }, { status: 400 });

        const cutPassword = members_data.org_members ? members_data.org_members.map((user) => ({
            ...user,
            password: "------"
        })) : []


        return NextResponse.json(
            {
                status: true,
                members: cutPassword
            }
        )
    } catch (error) {
        return NextResponse.json({ status: false, message: "Sever internal error" });
    }
}
