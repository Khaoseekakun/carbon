import { prisma } from "@/lib/prisma";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const token = req.headers.get('authorization');

        const segments = req.nextUrl.pathname.split('/');
        const id = segments[3]; // Gets '3'
        const memberId = segments[5]; // Gets '4'

        if (!token || !token.startsWith('Bearer ')) {
            return NextResponse.json({ status: false, message: "Unauthorized: Missing or invalid token" }, { status: 401 });
        }

        const numericId = Number(id);
        if (isNaN(numericId)) {
            return NextResponse.json({ status: false, message: "Invalid organization id" }, { status: 400 });
        }
        const numericMemberId = Number(memberId);
        if (isNaN(numericMemberId)) {
            return NextResponse.json({ status: false, message: "Invalid member id" }, { status: 400 });
        }

        try {
            const data = verify(token.split(' ')[1], process.env.JSONWEBTOKEN_SECRET as string);
            if (!data || typeof data !== 'object' || !('id' in data)) {
                return NextResponse.json({ status: false, message: "Unauthorized: Invalid token payload" }, { status: 401 });
            }

            if (data.type !== "organization") {
                return NextResponse.json({ status: false, message: "Unauthorized: Token type mismatch" }, { status: 401 });
            }

            if (Number(data.id) !== Number(id)) {
                return NextResponse.json({ status: false, message: "Unauthorized: Organization id mismatch" }, { status: 401 });
            }

            const members_data = await prisma.organization.findFirst({
                where: {
                    id: numericId
                },
            });

            if (!members_data) {
                return NextResponse.json({ status: false, message: "Invalid organization id: Organization not found" }, { status: 400 });
            }

            const findMember = await prisma.customers.findFirst({
                where: {
                    id: numericMemberId,
                    organizationId: numericId
                }
            });

            if (!findMember) {
                return NextResponse.json({ status: false, message: "Invalid member id: Member not found" }, { status: 400 });
            }

            await prisma.historyCalculator.deleteMany({
                where: {
                    customerId: findMember.id
                }
            });

            const deleteMember = await prisma.customers.delete({
                where: {
                    id: findMember.id
                }
            });

            return NextResponse.json({
                status: true,
                message: "Member deleted successfully",
                data: deleteMember
            });
        } catch (error) {
            return NextResponse.json({ status: false, message: "Unauthorized: Token verification failed" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ status: false, message: "Server internal error" }, { status: 500 });
    }
}
