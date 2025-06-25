import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();

        if (isNaN(Number(id))) {
            return NextResponse.json({
                status: false,
                message: "Organization ID is NAN"
            })
        }


        const org_data = await prisma.organization.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                org_members: {
                    include: {
                        HistoryCalculator: {
                            orderBy: {
                                createdAt: 'desc'
                            }
                        }
                    },
                }
            }
        })

        if (org_data) {
            const memberCount = org_data.org_members.length;
            const TotalCarbonFootprintValueToday = org_data.org_members.reduce((total, member) => {
                const todayFootprint = member.HistoryCalculator?.reduce((sum, history) => {
                    if (new Date(history.createdAt).toDateString() === new Date().toDateString()) {
                        return sum + (history.result || 0);
                    }
                    return sum;
                }, 0) || 0;
                return total + todayFootprint;
            }, 0);

            const TotalCarbonFootprintHistoryMonth = org_data.org_members.reduce((total, member) => {
                const monthFootprint = member.HistoryCalculator?.reduce((sum, history) => {
                    const historyDate = new Date(history.createdAt);
                    const currentDate = new Date();
                    if (historyDate.getMonth() === currentDate.getMonth() && historyDate.getFullYear() === currentDate.getFullYear()) {
                        return sum + (history.result || 0);
                    }
                    return sum;
                }
                    , 0) || 0;
                return total + monthFootprint;
            }, 0);

            const { org_password, org_members, ...orgWithoutPassword } = org_data;
            return NextResponse.json({
                status: true,
                message: "Organization data retrieved successfully",
                organization: {
                    ...orgWithoutPassword,
                    memberCount,
                    HistoryCalculator: org_data.org_members.flatMap(member => member.HistoryCalculator || []),
                    TotalCarbonFootprintValueToday,
                    TotalCarbonFootprintHistoryMonth
                }
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

export async function DELETE(req: NextRequest) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({
                status: false,
                message: "Authorization token is missing"
            });
        }
        if (!token.startsWith('Bearer ')) {
            return NextResponse.json({ status: false, message: "Unauthorized: Missing or invalid token" }, { status: 401 });
        }

        try {
            const decodedToken = verify(token, process.env.JSONWEBTOKEN_SECRET as string)

            if (!decodedToken || typeof decodedToken !== 'object' || !('id' in decodedToken)) {
                return NextResponse.json({ status: false, message: "Unauthorized: Invalid token payload" }, { status: 401 });
            }
            if (decodedToken.type !== "organization") {
                return NextResponse.json({
                    status: false,
                    message: "Unauthorized: Invalid token type"
                });
            }

            const id = req.nextUrl.pathname.split('/').pop();
            if (isNaN(Number(id)) || Number(id) !== decodedToken.id) {
                return NextResponse.json({
                    status: false,
                    message: "Unauthorized: ID mismatch or invalid ID"
                });
            }

            const deletedOrganization = await prisma.organization.delete({
                where: {
                    id: Number(id)
                }
            });

            return NextResponse.json({
                status: true,
                message: "Organization deleted successfully",
                deletedOrganization
            });
        } catch (error) {
            return NextResponse.json({
                status: false,
                message: "Invalid or expired token"
            });
        }
    } catch (error) {
        return NextResponse.json(
            { status: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}