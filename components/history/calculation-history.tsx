"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Mock data - replace with actual data from your backend
const generateMockData = () => {
    const today = new Date();
    const dailyData = Array.from({ length: 30 }, (_, i) => ({
        date: format(new Date(today.getTime() - i * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
        total: Math.random() * 20 + 10,
        home: Math.random() * 8 + 4,
        transport: Math.random() * 6 + 2,
        food: Math.random() * 4 + 1,
        other: Math.random() * 2 + 1,
    })).reverse();

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        month: format(new Date(today.getFullYear(), today.getMonth() - i, 1), 'MMM yyyy'),
        total: Math.random() * 600 + 300,
        home: Math.random() * 240 + 120,
        transport: Math.random() * 180 + 60,
        food: Math.random() * 120 + 30,
        other: Math.random() * 60 + 30,
    })).reverse();

    return { dailyData, monthlyData };
};

const { dailyData, monthlyData } = generateMockData();

export default function CalculationHistory() {
    const [selectedDates, setSelectedDates] = useState<Date | undefined>(new Date());
    const [view, setView] = useState('daily'); // 'daily' หรือ 'monthly'

    const handleDownload = () => {
        // เพิ่มฟังก์ชันดาวน์โหลด CSV
        console.log('กำลังดาวน์โหลดข้อมูล...');
    };

    return (
        <div className="space-y-8">
            <Tabs defaultValue="chart" className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <TabsList>
                        <TabsTrigger value="chart">มุมมองกราฟ</TabsTrigger>
                        <TabsTrigger value="table">มุมมองตาราง</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setView(view === 'daily' ? 'monthly' : 'daily')}>
                            <Filter className="h-4 w-4 mr-2" />
                            {view === 'daily' ? 'แสดงรายเดือน' : 'แสดงรายวัน'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownload}>
                            <Download className="h-4 w-4 mr-2" />
                            ส่งออกข้อมูล
                        </Button>
                    </div>
                </div>

                <TabsContent value="chart" className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    {view === 'daily' ? 'คาร์บอนฟุตพริ้นท์รายวัน' : 'คาร์บอนฟุตพริ้นท์รายเดือน'}
                                </h3>
                                <div className="h-[400px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={view === 'daily' ? dailyData : monthlyData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey={view === 'daily' ? 'date' : 'month'}
                                                tick={{ fontSize: 12 }}
                                            />
                                            <YAxis
                                                label={{ value: 'กก. CO₂e', angle: -90, position: 'insideLeft' }}
                                            />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="total"
                                                stroke="#10b981"
                                                name="รวม"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">เลือกช่วงวันที่</h3>
                                <Calendar
                                    mode="single"
                                    selected={selectedDates}
                                    onSelect={setSelectedDates}
                                    className="rounded-md border"
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">การปล่อยคาร์บอนแยกตามหมวดหมู่</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={view === 'daily' ? dailyData : monthlyData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey={view === 'daily' ? 'date' : 'month'}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            label={{ value: 'กก. CO₂e', angle: -90, position: 'insideLeft' }}
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="home" fill="#10b981" name="ที่อยู่อาศัย" />
                                        <Bar dataKey="transport" fill="#3b82f6" name="การเดินทาง" />
                                        <Bar dataKey="food" fill="#f59e0b" name="อาหาร" />
                                        <Bar dataKey="other" fill="#8b5cf6" name="อื่น ๆ" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="table">
                    <Card>
                        <CardContent className="p-6">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>{view === 'daily' ? 'วันที่' : 'เดือน'}</TableHead>
                                            <TableHead className="text-right">รวม</TableHead>
                                            <TableHead className="text-right">ที่อยู่อาศัย</TableHead>
                                            <TableHead className="text-right">การเดินทาง</TableHead>
                                            <TableHead className="text-right">อาหาร</TableHead>
                                            <TableHead className="text-right">อื่น ๆ</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(view === 'daily' ? dailyData : monthlyData).map((entry, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {'date' in entry ? entry.date : 'month' in entry ? entry.month : ''}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {entry.total.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {entry.home.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {entry.transport.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {entry.food.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {entry.other.toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}