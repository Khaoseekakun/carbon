'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
import { Share2, Trophy, Bell } from 'lucide-react';
import { useSession } from '../providers/SessionProvider';
import { useEffect, useState } from 'react';
import { Organization } from '@/lib/generated/prisma';
import axios from 'axios';
import OrganizationMembers from './organization-members';

const dailyData = [
  { date: '2024-03-01', emissions: 12.5 },
  { date: '2024-03-02', emissions: 11.8 },
  { date: '2024-03-03', emissions: 10.2 },
  { date: '2024-03-04', emissions: 9.5 },
  { date: '2024-03-05', emissions: 8.9 },
  { date: '2024-03-06', emissions: 9.1 },
  { date: '2024-03-07', emissions: 8.5 },
];

const monthlyData = [
  { month: 'ม.ค.', emissions: 350 },
  { month: 'ก.พ.', emissions: 320 },
  { month: 'มี.ค.', emissions: 280 },
];

const achievements = [
  { id: 1, title: 'ใช้ขนส่งสาธารณะ 10 วัน', progress: 80 },
  { id: 2, title: 'ลดพลาสติกสำเร็จ', progress: 100 },
  { id: 3, title: 'ประหยัดพลังงาน 15%', progress: 60 },
];

export default function ProfilePage() {

  const { session, logout, loading } = useSession();
  const [org, setOrg] = useState<Organization | null>(null)
  const [load, setLoad] = useState(true)
  useEffect(() => {
    if (!session && loading == false) {
      window.location.href = "/"
    } else {
      (async () => {
        try {
          const org_data = await axios.get(`/api/organization/${session?.org_id!}`, {
            headers: {
              'Content-Type': "application/json"
            }
          })
        } catch (error) {

        }
      })()
    }
  }, [session, loading])

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-10 w-10 text-green-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span className="text-lg text-green-700 font-medium">กำลังตรวจสอบข้อมูล...</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-12">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="personal" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">ส่วนบุคคล</TabsTrigger>
            <TabsTrigger value="organization">องค์กร</TabsTrigger>
          </TabsList>

          {/* Personal Profile */}
          <TabsContent value="personal">
            {
              session?.type == "organization" ? (
                <>
                  <OrganizationMembers></OrganizationMembers>
                  
                </>
              ) :
                (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Info */}
                    <Card className="md:col-span-1">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="relative w-32 h-32 mx-auto mb-4">
                            <Image
                              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                              alt="Profile"
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <h2 className="text-2xl font-bold mb-2">คุณสมชาย รักษ์โลก</h2>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">@green_warrior</p>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">คาร์บอนฟุตพริ้นท์วันนี้</p>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">8.5 kg CO₂</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">คาร์บอนฟุตพริ้นท์เดือนนี้</p>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">280 kg CO₂</p>
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
                            <LineChart data={dailyData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="emissions" stroke="#10b981" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
            }

            {/* Achievements */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                ความสำเร็จของคุณ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{achievement.title}</h4>
                      <Progress value={achievement.progress} className="h-2 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.progress}% สำเร็จ
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Organization Profile */}
          <TabsContent value="organization">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Organization Info */}
              <Card className="md:col-span-1">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                        alt="Organization Logo"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">บริษัท รักษ์โลก จำกัด</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">สมาชิก: 150 คน</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">คาร์บอนฟุตพริ้นท์รวมวันนี้</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">1,250 kg CO₂</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">คาร์บอนฟุตพริ้นท์รวมเดือนนี้</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">35,000 kg CO₂</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organization Charts */}
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">การปล่อย CO₂ รายเดือน</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="emissions" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Organization Goals */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">เป้าหมายองค์กร</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">ลด CO₂ ลง 10% ภายใน 3 เดือน</h4>
                    <Progress value={70} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">70% สำเร็จ</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">ปลูกต้นไม้ครบ 500 ต้น</h4>
                    <Progress value={90} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">450/500 ต้น</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Notifications */}
            <div className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Bell className="h-6 w-6 text-green-500 mr-2" />
                    <h3 className="text-xl font-bold">การแจ้งเตือน</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <p className="text-green-700 dark:text-green-300">
                        วันนี้องค์กรของคุณลด CO₂ ได้ 120 kg! สุดยอด! 🎉
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <p className="text-blue-700 dark:text-blue-300">
                        เหลืออีก 50 ต้นจะถึงเป้าหมายการปลูกต้นไม้! 🌱
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
      </div>
    </div>
  );
}