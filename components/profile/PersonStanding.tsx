'use client'
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis, LineChart, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { HistoryCalculator as PrismaHistoryCalculator } from "@/lib/generated/prisma";
import { Button } from "../ui/button";
import Link from "next/link";

// Extend the type to include 'activity'
type HistoryCalculator = PrismaHistoryCalculator & { activity?: string };

interface HistoryData {
    today: HistoryCalculator[],
    month: HistoryCalculator[],
    all: HistoryCalculator[]
}
export function PersonStanding({ session }: { session: any; logout: () => void }) {
    const [loading, setLoading] = useState(true);

    const [monthlyData, setMonthlyData] = useState<{ month: string, emissions: number }[]>([])
    const [historyData, setHistoryData] = useState<HistoryData>({
        today: [],
        month: [],
        all: []
    });
    useEffect(() => {
        loadHistoryData()
    }, []);

    useEffect(() => {
        if (session == null) return;
        setMonthlyData(
            historyData.all.reduce((acc: { month: string, emissions: number }[], history: HistoryCalculator) => {
                const historyDate = new Date(history.createdAt);
                const monthName = historyDate.toLocaleString('default', { month: 'short' });
                const year = historyDate.getFullYear();
                const monthKey = `${monthName} ${year}`;

                const existingMonth = acc.find(m => m.month === monthKey);
                if (existingMonth) {
                    existingMonth.emissions += history.result || 0;
                } else {
                    acc.push({ month: monthKey, emissions: history.result || 0 });
                }
                return acc;
            }, [])
                .sort((a, b) => {
                    const [aMonth, aYear] = a.month.split(' ');
                    const [bMonth, bYear] = b.month.split(' ');
                    const aDate = new Date(`${aMonth} 1, ${aYear}`);
                    const bDate = new Date(`${bMonth} 1, ${bYear}`);
                    return aDate.getTime() - bDate.getTime();
                })
        );
    }, [historyData])



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

                            <Button asChild className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                                <Link href="/calculator">คำนวณตอนนี้</Link>
                            </Button>
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
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" /><YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="emissions" stroke="#10b981" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="md:col-span-3 mt-8">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">ประวัติการบันทึกคาร์บอนฟุตพริ้นท์</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">กิจกรรม</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">คาร์บอนฟุตพริ้นท์ (kg CO₂)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                {historyData.all.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-4 text-center text-gray-500">ไม่มีข้อมูลประวัติ</td>
                                    </tr>
                                ) : (
                                    historyData.all
                                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                        .map((item, idx) => (
                                            <tr key={item.id || idx}>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    {new Date(item.createdAt).toLocaleString('th-TH', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">{item.activity || '-'}</td>
                                                <td className="px-4 py-2 whitespace-nowrap">{item.result} kg</td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}