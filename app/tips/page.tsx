import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Home, Bike, ShoppingBag, Share2, Trophy, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เคล็ด(ไม่)ลับ ลดคาร์บอนฟุตพริ้นท์ สำหรับวัยรุ่น',
  description: 'คำแนะนำง่าย ๆ ในการลดคาร์บอนฟุตพริ้นท์สำหรับวัยรุ่น',
};

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              เคล็ด(ไม่)ลับ ลดคาร์บอนฟุตพริ้นท์ สำหรับวัยรุ่น
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              ทุกการเปลี่ยนแปลงเล็ก ๆ สร้างความเปลี่ยนแปลงใหญ่ 🌎💚 มาช่วยโลกไปด้วยกันเถอะ!
            </p>
            <div className="relative w-full h-[300px] rounded-2xl overflow-hidden mb-8">
              <Image
                src="https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg"
                alt="Teens helping environment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tips Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* At Home Tips */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-100 dark:border-green-900">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Home className="h-8 w-8 text-green-500 mr-3" />
                  <h2 className="text-2xl font-semibold">ที่บ้าน 🏠</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>ปิดไฟและปลั๊กไฟเมื่อไม่ใช้</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>ใช้เครื่องใช้ไฟฟ้าที่ประหยัดพลังงาน</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>DIY ของเก่าให้เป็นของใหม่ (เช่น ทำสมุดจากกระดาษใช้แล้ว)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Outside Tips */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Bike className="h-8 w-8 text-blue-500 mr-3" />
                  <h2 className="text-2xl font-semibold">นอกบ้าน 🚲</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>ปั่นจักรยานไปโรงเรียนหรือสถานที่ใกล้บ้าน</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>แชร์รถกับเพื่อน (carpool)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>พกขวดน้ำส่วนตัว ลดการซื้อน้ำขวดพลาสติก</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Food and Shopping Tips */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-yellow-100 dark:border-yellow-900">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <ShoppingBag className="h-8 w-8 text-yellow-500 mr-3" />
                  <h2 className="text-2xl font-semibold">อาหารและการช้อป 🍔🛍️</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>ลองกินมังสวิรัติสัปดาห์ละครั้ง</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>ซื้อเสื้อผ้า secondhand หรือแลกของกับเพื่อน</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>พกถุงผ้า ลดถุงพลาสติก</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="py-12 bg-green-100/50 dark:bg-green-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="h-8 w-8 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold">รู้หรือไม่? 🤔</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/90 dark:bg-gray-800/90">
              <CardContent className="p-6">
                <p className="text-sm">การปั่นจักรยานแทนการขับรถ 1 กิโลเมตร ช่วยลด CO₂ ได้ 250 กรัม! 🚲</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 dark:bg-gray-800/90">
              <CardContent className="p-6">
                <p className="text-sm">การกินมังสวิรัติ 1 มื้อ = ปลูกต้นไม้ 1 ต้น ในแง่ของการลด CO₂ 🌱</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 dark:bg-gray-800/90">
              <CardContent className="p-6">
                <p className="text-sm">ถุงพลาสติก 1 ใบ ใช้เวลาย่อยสลาย 450 ปี! 😱</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">ลดพลาสติกให้ได้ 7 วัน! คุณทำได้ไหม? 💪</h2>
                <p className="text-gray-600 dark:text-gray-400">ติดตามความสำเร็จของคุณ</p>
              </div>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>วันที่ 1</span>
                  <span>วันที่ 7</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">วันที่ 1 ✅</Badge>
                <Badge variant="secondary">วันที่ 2 ✅</Badge>
                <Badge variant="outline">วันที่ 3</Badge>
                <Badge variant="outline">วันที่ 4</Badge>
                <Badge variant="outline">วันที่ 5</Badge>
                <Badge variant="outline">วันที่ 6</Badge>
                <Badge variant="outline">วันที่ 7</Badge>
              </div>
              <div className="flex justify-center gap-4">
                <Button className="bg-green-500 hover:bg-green-600">
                  เข้าร่วม Teen Eco Squad 🌿
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>ฉันกำลังเป็นสายกรีน 🌎💚</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}