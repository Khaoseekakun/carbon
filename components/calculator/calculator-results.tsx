"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, RotateCcw, ThumbsUp, AlertTriangle, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { CalculatorFormValues } from '@/lib/schemas/calculator-schema';
import { calculateCarbonFootprint } from '@/lib/carbon-calculations';
import axios from 'axios';
import { useSession } from '../providers/SessionProvider';

interface CalculatorResultsProps {
  data: CalculatorFormValues;
  onReset: () => void;
}

export default function CalculatorResults({ data, onReset }: CalculatorResultsProps) {
  const [activeTab, setActiveTab] = useState('summary');
  const { toast } = useToast();

  // คำนวณการปล่อยคาร์บอนจากข้อมูลฟอร์ม
  const results = calculateCarbonFootprint(data);

  // เตรียมข้อมูลสำหรับกราฟ
  const categoryData = [
    { name: 'ที่อยู่อาศัย', value: results.homeEmissions },
    { name: 'การเดินทาง', value: results.transportEmissions },
    { name: 'อาหาร', value: results.foodEmissions },
    { name: 'ไลฟ์สไตล์', value: results.lifestyleEmissions },
    { name: 'ท่องเที่ยว', value: results.travelEmissions },
  ];

  // ข้อมูลเปรียบเทียบ
  const comparisonData = [
    { name: 'ของคุณ', value: results.totalEmissions },
    { name: 'ค่าเฉลี่ยประเทศ', value: 8500 / 365 },
    { name: 'ค่าเฉลี่ยโลก', value: 4800 / 365 },
    { name: 'ระดับยั่งยืน', value: 2000 / 365 },
  ];

  // สีสำหรับกราฟ
  const COLORS = ['#059669', '#0284c7', '#d97706', '#dc2626', '#7c3aed'];


  const { session, logout, loading } = useSession();


  const handleSaveDataToOrganization = async () => {
    try {
      toast({
        title: "กำลังบันทึกข้อมูล...!",
        description: "กรุณารอสักครู่ ข้อมูลการคำนวณของคุณกำลังถูกบันทึก",
      });

      const response = await axios.post(`/api/customers/${session?.id}/history`, {
        userId: session?.id,
        result: Number(results.totalEmissions.toFixed(2)),
        homeEmissions: Number(results.homeEmissions.toFixed(2)),
        transportEmissions: Number(results.transportEmissions.toFixed(2)),
        foodEmissions: Number(results.foodEmissions.toFixed(2)),
        lifestyleEmissions: Number(results.lifestyleEmissions.toFixed(2)),
        travelEmissions: Number(results.travelEmissions.toFixed(2)),
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.token}`
        }
      });

      // Check if the API response indicates success
      if (response.data.status === true) {
        toast({
          title: "บันทึกข้อมูลสำเร็จ!",
          description: `ข้อมูลการคำนวณของคุณถูกบันทึกแล้ว (ID: ${response.data.data.id})`,
          variant: "default",
        });
      } else {
        // API returned success status but with status: false
        toast({
          title: "เกิดข้อผิดพลาด",
          description: response.data.message || "ไม่สามารถบันทึกข้อมูลได้",
          variant: "destructive",
        });
      }

    } catch (error: any) {
      console.error("Error saving calculation history:", error);
      
      // Handle different types of errors
      let errorMessage = "ไม่สามารถบันทึกข้อมูลได้";
      
      if (error.response) {
        // API responded with error status
        const statusCode = error.response.status;
        const errorData = error.response.data;
        
        switch (statusCode) {
          case 401:
            errorMessage = "ไม่มีสิทธิ์เข้าถึง กรุณาเข้าสู่ระบบใหม่";
            break;
          case 404:
            errorMessage = "ไม่พบข้อมูลผู้ใช้";
            break;
          case 400:
            errorMessage = errorData.message || "ข้อมูลที่ส่งไม่ถูกต้อง";
            break;
          case 500:
            errorMessage = "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์";
            break;
          default:
            errorMessage = errorData.message || "เกิดข้อผิดพลาดที่ไม่คาดคิด";
        }
      } else if (error.request) {
        // Network error
        errorMessage = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต";
      }
      
      toast({
        title: "เกิดข้อผิดพลาด",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  const getFootprintCategory = (emissions: number) => {
    if (emissions < 3000 / 365) return { label: 'ผลกระทบต่ำ', color: 'text-green-600 dark:text-green-400', icon: <ThumbsUp className="h-5 w-5 mr-1" /> };
    if (emissions < 6000 / 365) return { label: 'ผลกระทบปานกลาง', color: 'text-amber-600 dark:text-amber-400', icon: <AlertTriangle className="h-5 w-5 mr-1" /> };
    return { label: 'ผลกระทบสูง', color: 'text-red-600 dark:text-red-400', icon: <AlertTriangle className="h-5 w-5 mr-1" /> };
  };

  const footprintCategory = getFootprintCategory(results.totalEmissions);

  return (
    <Card className="border-green-100 dark:border-green-900/30 shadow-md">
      <CardContent className="p-6">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="h-8 w-8 mr-2 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl md:text-3xl font-bold">ผลลัพธ์การปล่อยคาร์บอนของคุณ</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            จากไลฟ์สไตล์ของคุณ เราได้คำนวณการปล่อยคาร์บอนประจำวันของคุณแล้ว สำรวจรายละเอียดด้านล่าง
          </p>
        </div>

        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-1">{results.totalEmissions.toFixed(2)}</div>
            <div className="text-lg">กิโลกรัม CO₂e วัน</div>
            <div className="mt-2">
              <Badge className={`${footprintCategory.color.includes('green') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : footprintCategory.color.includes('amber') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'} flex items-center py-1.5 px-3 text-sm font-medium`}>
                <span className="flex items-center">
                  {footprintCategory.icon}
                  {footprintCategory.label}
                </span>
              </Badge>
            </div>
          </div>

          <div className="mb-2 flex justify-between text-sm">
            <span>ระดับที่ยั่งยืน</span>
            {((5.48 - 5.48) / 5.48) * 100 > 0 && (
              <span>สูงกว่าที่กำหนด {(((5.48 - 5.48) / 5.48) * 100).toFixed(0)}% </span>
            )}
          </div>
          <Progress value={Math.max(0, Math.min(100, ((5.48 / 5.48) * 100)))} className="h-2 bg-gray-100 dark:bg-gray-800" />
          <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0 กิโลกรัม</span>
            <span>5.48 กิโลกรัม (ยั่งยืน)</span>
            <span>23.29+ กิโลกรัม</span>
          </div>
        </div>

        <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="summary">สรุป</TabsTrigger>
            <TabsTrigger value="breakdown">รายละเอียด</TabsTrigger>
            <TabsTrigger value="actions">ลดผลกระทบ</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">การปล่อยคาร์บอนตามหมวดหมู่</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value.toFixed(2)} กิโลกรัม CO₂e`, 'การปล่อยคาร์บอน']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">การเปรียบเทียบ</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={comparisonData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'กิโลกรัม CO₂e', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(2)} กิโลกรัม CO₂e`, 'การปล่อยคาร์บอน']} />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">ผลกระทบของคุณ</h3>
              <p>
                การปล่อยคาร์บอนประจำปีของคุณที่ <span className='text-red-500'>{results.totalEmissions.toFixed(2)} กิโลกรัม CO₂e</span> นั้น {results.totalEmissions > 13.15 ? 'สูงกว่า' : 'ต่ำกว่า'} ค่าเฉลี่ยโลกที่ 13.15 กิโลกรัม
                หมวดหมู่ที่มีผลกระทบมากที่สุดคือ <span className='text-red-500'>{categoryData.sort((a, b) => b.value - a.value)[0].name}</span>
              </p>

              <p>
                {results.totalEmissions < 13.15
                  ? "คุณทำได้ดีมาก! การปล่อยคาร์บอนของคุณต่ำกว่าค่าเฉลี่ยอย่างมาก แสดงถึงความมุ่งมั่นในความยั่งยืน"
                  : results.totalEmissions < (13.15 * 4)
                    ? "คุณมีการปล่อยคาร์บอนในระดับปานกลาง ด้วยการเปลี่ยนแปลงบางอย่าง คุณสามารถลดผลกระทบต่อสิ่งแวดล้อมได้อย่างมาก"
                    : "การปล่อยคาร์บอนของคุณสูงกว่าค่าเฉลี่ย ข่าวดีคือมีหลายวิธีที่คุณสามารถลดผลกระทบได้"}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {
        session && (
          <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t bg-gray-50 dark:bg-gray-900/40 w-full">
            <div className="flex-1" />
            <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
              <Button
                variant="outline"
                onClick={handleSaveDataToOrganization}
                className="flex items-center gap-2 w-full md:w-auto"
              >
                <Download className="h-4 w-4" />
                บันทึกข้อมูลการคำนวณ
              </Button>
            </div>
          </div>
        )
      }

    </Card>
  );
}