'use client'
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis, LineChart, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { HistoryCalculator } from "@/lib/generated/prisma";

interface HistoryData {
    today: HistoryCalculator[],
    month: HistoryCalculator[],
    all: HistoryCalculator[]
}
export function PersonStanding({ session, logout }: { session: any; logout: () => void }) {
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState<HistoryData>({
        today: [],
        month: [],
        all: []
    });
    useEffect(() => {
        try {
        } catch (error) {

        }
    }, []);


    const loadHistoryData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/customers/${session?.id}/history`, {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${session?.token}`
                }
            });

            if (response.data.status) {
                const data = response.data.data as HistoryData;
                setHistoryData(data);
            } else {
                console.error("Failed to load history data:", response.data.message);
            }
        } catch (error) {
            console.error("Error loading history data:", error);
        }
        finally {
            setLoading(false);
        }
    }




    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Info */}
            <Card className="md:col-span-1">
                <CardContent className="p-6">
                    <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <Image
                                src={session?.picture || "/images/user_unknown.jpg"}
                                alt="Profile"
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{session?.username}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{session?.email!}</p>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">คาร์บอนฟุตพริ้นท์วันนี้</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{historyData.today.reduce((acc, curr) => acc + curr.result, 0)} kg CO₂</p>
                                <p className="text-sm font-bold text-red-600 dark:text-red-400">{historyData.today.reduce((acc, curr) => acc + curr.result, 0) == 0 ? "วันนี้ยังไม่ได้บันทึกข้อมูล" : ""}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">คาร์บอนฟุตพริ้นท์เดือนนี้</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{historyData.month.reduce((acc, curr) => acc + curr.result, 0)} kg CO₂</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Charts */}
            <Card className="md:col-span-2">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">การปล่อย CO₂ ตามเวลา</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={historyData.all.map(item => ({
                                // createdAt is : // 2023-10-01T00:00:00.000Z
                                date: item.createdAt.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
                                emissions: item.result
                            }))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" /><YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="emissions" stroke="#10b981" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}