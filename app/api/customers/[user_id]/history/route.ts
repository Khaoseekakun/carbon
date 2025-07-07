import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token-verify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized1"
            }, { status: 401 });
        }

        const verify = verifyToken(token);
        if (!verify) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized2"
            }, { status: 401 });
        }
        
        if (typeof verify === "string") {
            return NextResponse.json({
                status: false,
                message: "Unauthorized3"
            }, { status: 401 });
        }
        if (verify.type !== "person") {
            return NextResponse.json({
                status: false,
                message: "Unauthorized4"
            }, { status: 401 });
        }

        //path: http://localhost/api/customers/[user_id]/history
        const user_id = req.nextUrl.pathname.split('/')[3]
        if (isNaN(Number(user_id))) {
            return NextResponse.json({
                status: false,
                message: "Customer ID is NAN"
            })
        }

        if(verify.id != Number(user_id)) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized5"
            }, { status: 401 });
        }

        const customer_data = await prisma.customers.findFirst({
            where: {
                id: Number(user_id)
            }
        })

        if (!customer_data) {
            return NextResponse.json({
                status: false,
                message: "Customer not found"
            });
        }

        const history = await prisma.historyCalculator.findMany({
            where: {
                customerId: Number(customer_data.id)
            },
            orderBy: {
                createdAt: 'desc'
            },
        })
        
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        return NextResponse.json({
            status: true,
            data: {
                today: history.filter(item => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate.getDate() === today.getDate() &&
                        itemDate.getMonth() === today.getMonth() &&
                        itemDate.getFullYear() === today.getFullYear();
                }),
                month: history.filter(item => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear();
                }),
                all: history
            }
        });
    } catch (error) {
        return NextResponse.json(
            { status: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}