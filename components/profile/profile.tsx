'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useSession } from '../providers/SessionProvider';
import { useEffect, useState } from 'react';
import { HistoryCalculator, Organization } from '@/lib/generated/prisma';
import axios from 'axios';
import OrganizationMembers from './organization-members';
import { PersonStanding } from './PersonStanding';

interface OrganizationNew extends Organization {
  memberCount: number;
  TotalCarbonFootprintValueToday: number;
  TotalCarbonFootprintHistoryMonth: number;
  HistoryCalculator: HistoryCalculator[];
}


export default function ProfilePage() {

  const { session, logout, loading } = useSession();
  const [org, setOrg] = useState<OrganizationNew | null>(null)

  // mothname, and value
  const [monthlyData, setMonthlyData] = useState<{ month: string, emissions: number }[]>([])

  useEffect(() => {
    if (!session && loading == false) {
      window.location.href = "/"
    } else {
      if (loading == false) {
        (async () => {
          try {
            const org_data = await axios.get(`/api/organization/${session?.org_id}`, {
              headers: {
                'Content-Type': "application/json"
              }
            })
            console.log(org_data)
            if (org_data.data.status) {
              setOrg(org_data.data.organization)
            } else {
              setOrg(null)
            }
          } catch (error) {
            console.log(error)
          }
        })()
      }
    }
  }, [session, loading])


  useEffect(() => {
    if (org == null) return;
    setMonthlyData(
      org.HistoryCalculator.reduce((acc: { month: string, emissions: number }[], history: HistoryCalculator) => {
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
  }, [org])

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

  if (org == null && session?.type != "organization") return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardContent className="text-center p-6">
          <h2 className="text-2xl font-bold mb-4">ไม่พบข้อมูลองค์กร</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">ดูเหมือนว่าคุณยังไม่ได้เข้าร่วมองค์กรใด ๆ</p>
          <button
            onClick={() => window.location.href = "/organization/join"}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            เข้าร่วมองค์กร
          </button>
        </CardContent>
      </Card>
    </div>
  )

  if (org == null && session?.type == "organization") return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardContent className="text-center p-6">
          <h2 className="text-2xl font-bold mb-4">ไม่พบข้อมูลองค์กร</h2>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-12">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="personal" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">ส่วนตัว</TabsTrigger>
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
                  <PersonStanding logout={logout} session={session}></PersonStanding>
                )
            }
          </TabsContent>

          {/* Organization Profile */}
          <TabsContent value="organization">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-1">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={org?.org_logo || '/images/org_default_logo.png'}
                        alt="Organization Logo"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h2 className="text-2xl font-bold mb-2"> {org?.org_name || 'ไม่ทราบชื่อองค์กรณ์'}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">สมาชิก: {org?.memberCount} คน</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">คาร์บอนฟุตพริ้นท์รวมวันนี้</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{org?.TotalCarbonFootprintValueToday} kg CO₂</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">คาร์บอนฟุตพริ้นท์รวมเดือนนี้</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{org?.TotalCarbonFootprintHistoryMonth} kg CO₂</p>
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
                        <CartesianGrid strokeDasharray="12 12" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="emissions" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">การปล่อย CO₂ รายวัน (Daily Emissions)</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">วันที่</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">CO₂ (kg)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                        {org?.HistoryCalculator
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map((history, idx) => (
                            <tr key={history.id || idx}>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {new Date(history.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {history.result !== undefined && history.result !== null
                                  ? history.result.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                  : '-'}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications */}
            {/* <div className="mt-8">
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
            </div> */}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
      </div>
    </div >
  );
}