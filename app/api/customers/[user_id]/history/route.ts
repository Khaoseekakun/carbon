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

        if (verify.id != Number(user_id)) {
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

export async function POST(req: NextRequest) {
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

        // Get user_id from URL path
        const user_id = req.nextUrl.pathname.split('/')[3];
        if (isNaN(Number(user_id))) {
            return NextResponse.json({
                status: false,
                message: "Customer ID is NAN"
            }, { status: 400 });
        }

        // Verify that the token user ID matches the URL user ID
        if (verify.id != Number(user_id)) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized5"
            }, { status: 401 });
        }

        // Verify customer exists
        const customer_data = await prisma.customers.findFirst({
            where: {
                id: Number(user_id)
            }
        });

        if (!customer_data) {
            return NextResponse.json({
                status: false,
                message: "Customer not found"
            }, { status: 404 });
        }

        // Parse request body
        const body = await req.json();
        const { 
            userId, 
            result, 
            homeEmissions, 
            transportEmissions, 
            foodEmissions, 
            lifestyleEmissions, 
            travelEmissions 
        } = body;

        // Validate required fields
        if (!userId || result === undefined) {
            return NextResponse.json({
                status: false,
                message: "Missing required fields: userId and result"
            }, { status: 400 });
        }

        // Additional check: ensure the userId in body matches the verified user
        if (userId !== verify.id) {
            return NextResponse.json({
                status: false,
                message: "User ID mismatch"
            }, { status: 401 });
        }

        // Prepare calculation data to store as JSON
        const calculationData = {
            totalEmissions: result,
            homeEmissions: homeEmissions || 0,
            transportEmissions: transportEmissions || 0,
            foodEmissions: foodEmissions || 0,
            lifestyleEmissions: lifestyleEmissions || 0,
            travelEmissions: travelEmissions || 0,
            timestamp: new Date().toISOString()
        };

        // Save to database
        const historyRecord = await prisma.historyCalculator.create({
            data: {
                customerId: Number(user_id),
                calculation: JSON.stringify(calculationData),
                result: Number(result)
            }
        });

        return NextResponse.json({
            status: true,
            message: "Calculation history saved successfully",
            data: {
                id: historyRecord.id,
                totalEmissions: result,
                createdAt: historyRecord.createdAt
            }
        }, { status: 201 });

    } catch (error) {
        console.error("Error saving calculation history:", error);
        return NextResponse.json({
            status: false,
            message: "Internal Server Error"
        }, { status: 500 });
    }
}
