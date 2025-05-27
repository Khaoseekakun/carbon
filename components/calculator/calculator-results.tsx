"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, RotateCcw, ThumbsUp, AlertTriangle, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { CalculatorFormValues } from '@/lib/schemas/calculator-schema';
import { calculateCarbonFootprint } from '@/lib/carbon-calculations';

interface CalculatorResultsProps {
  data: CalculatorFormValues;
  onReset: () => void;
}

export default function CalculatorResults({ data, onReset }: CalculatorResultsProps) {
  const [activeTab, setActiveTab] = useState('summary');
  const { toast } = useToast();
  
  // Calculate carbon footprint based on form data
  const results = calculateCarbonFootprint(data);
  
  // Prepare data for charts
  const categoryData = [
    { name: 'Home', value: results.homeEmissions },
    { name: 'Transport', value: results.transportEmissions },
    { name: 'Food', value: results.foodEmissions },
    { name: 'Lifestyle', value: results.lifestyleEmissions },
    { name: 'Travel', value: results.travelEmissions },
  ];
  
  // Comparison data
  const comparisonData = [
    { name: 'Your Footprint', value: results.totalEmissions },
    { name: 'Country Average', value: 8500 },
    { name: 'Global Average', value: 4800 },
    { name: 'Sustainable Level', value: 2000 },
  ];
  
  // Colors for charts
  const COLORS = ['#059669', '#0284c7', '#d97706', '#dc2626', '#7c3aed'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Carbon Footprint Results',
        text: `My annual carbon footprint is ${results.totalEmissions.toFixed(2)} kg CO2e. Calculate yours!`,
        url: window.location.href,
      }).catch((error) => {
        toast({
          title: "Couldn't share results",
          description: "There was an error sharing your results.",
          variant: "destructive",
        });
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `My annual carbon footprint is ${results.totalEmissions.toFixed(2)} kg CO2e. Calculate yours at CarbonCalc!`
      ).then(() => {
        toast({
          title: "Copied to clipboard!",
          description: "Share your results with others.",
        });
      });
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF or image
    toast({
      title: "Report generated!",
      description: "Your carbon footprint report has been downloaded.",
    });
  };

  // Determine footprint category
  const getFootprintCategory = (emissions: number) => {
    if (emissions < 3000) return { label: 'Low Impact', color: 'text-green-600 dark:text-green-400', icon: <ThumbsUp className="h-5 w-5 mr-1" /> };
    if (emissions < 6000) return { label: 'Moderate Impact', color: 'text-amber-600 dark:text-amber-400', icon: <AlertTriangle className="h-5 w-5 mr-1" /> };
    return { label: 'High Impact', color: 'text-red-600 dark:text-red-400', icon: <AlertTriangle className="h-5 w-5 mr-1" /> };
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
        จากไลฟ์สไตล์ของคุณ เราได้คำนวณการปล่อยคาร์บอนประจำปีของคุณแล้ว สำรวจรายละเอียดด้านล่าง
        </p>
      </div>

      <div className="mb-8">
        <div className="text-center mb-6">
        <div className="text-4xl font-bold mb-1">{results.totalEmissions.toFixed(2)}</div>
        <div className="text-lg">กิโลกรัม CO₂e ต่อปี</div>
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
        <span>{((results.totalEmissions / 2000) * 100).toFixed(0)}% สูงกว่าที่กำหนด</span>
        </div>
        <Progress value={(2000 / results.totalEmissions) * 100} className="h-2 bg-gray-100 dark:bg-gray-800" />
        <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>0 กิโลกรัม</span>
        <span>2,000 กิโลกรัม (ยั่งยืน)</span>
        <span>10,000+ กิโลกรัม</span>
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
          การปล่อยคาร์บอนประจำปีของคุณที่ <strong>{results.totalEmissions.toFixed(2)} กิโลกรัม CO₂e</strong> นั้น {results.totalEmissions > 4800 ? 'สูงกว่า' : 'ต่ำกว่า'} ค่าเฉลี่ยโลกที่ 4,800 กิโลกรัม
          หมวดหมู่ที่มีผลกระทบมากที่สุดคือ <strong>{categoryData.sort((a, b) => b.value - a.value)[0].name}</strong>.
          </p>
          
          <p>
          {results.totalEmissions < 3000 
            ? "คุณทำได้ดีมาก! การปล่อยคาร์บอนของคุณต่ำกว่าค่าเฉลี่ยอย่างมาก แสดงถึงความมุ่งมั่นในความยั่งยืน"
            : results.totalEmissions < 6000
            ? "คุณมีการปล่อยคาร์บอนในระดับปานกลาง ด้วยการเปลี่ยนแปลงบางอย่าง คุณสามารถลดผลกระทบต่อสิ่งแวดล้อมได้อย่างมาก"
            : "การปล่อยคาร์บอนของคุณสูงกว่าค่าเฉลี่ย ข่าวดีคือมีหลายวิธีที่คุณสามารถลดผลกระทบได้"}
          </p>
        </div>
        </TabsContent>
      </Tabs>
      </CardContent>
    </Card>
  );
}