import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Thermometer, CloudRain, Fish, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Environmental Impact | Carbon Footprint Calculator',
  description: 'Learn about the environmental impact of carbon emissions and the importance of reducing your carbon footprint',
};

export default function ImpactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            การทำความเข้าใจผลกระทบต่อสิ่งแวดล้อม
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            เรียนรู้เกี่ยวกับผลกระทบในโลกแห่งความเป็นจริงของการปล่อยก๊าซคาร์บอน และเหตุใดการลดปริมาณการปล่อยก๊าซคาร์บอนจึงมีความสำคัญ
          </p>
        </div>
        <div className="mb-16">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
            <Image 
              src="https://news.cnrs.fr/sites/default/files/styles/visuel_principal/public/assets/images/adobestock_480971838_vp.jpg" 
              alt="Climate change impact" 
              className="object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <p className="text-white text-xl md:text-2xl font-medium">
                วิกฤตสภาพอากาศส่งผลกระทบต่อเราทุกคน
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">วิกฤตการณ์รอยเท้าคาร์บอน</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            รอยเท้าคาร์บอนคือปริมาณก๊าซเรือนกระจกทั้งหมด (รวมถึงคาร์บอนไดออกไซด์และมีเทน) ที่เกิดจากการกระทำของเรา โดยเฉลี่ยแล้ว บุคคลในประเทศพัฒนาแล้วผลิตก๊าซคาร์บอนไดออกไซด์เทียบเท่าประมาณ 10 ตันต่อปี ในขณะที่ระดับที่ยั่งยืนจะอยู่ที่ประมาณ 2 ตัน
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            การปล่อยคาร์บอนที่มากเกินไปนี้ส่งผลให้เกิดการเปลี่ยนแปลงสภาพภูมิอากาศ ซึ่งส่งผลกระทบร้ายแรงต่อโลกของเราแล้ว ได้แก่ อุณหภูมิที่สูงขึ้น สภาพอากาศที่เลวร้าย การรบกวนระบบนิเวศ และภัยคุกคามต่อสุขภาพและความเป็นอยู่ของมนุษย์
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            ข่าวดีก็คือ เราทุกคนสามารถมีส่วนร่วมในการแก้ไขปัญหาได้ด้วยการทำความเข้าใจและลดปริมาณการปล่อยคาร์บอน การเปลี่ยนแปลงเล็กๆ น้อยๆ ที่เกิดขึ้นกับผู้คนหลายล้านคนสามารถสร้างผลกระทบเชิงบวกที่สำคัญได้          
          </p>
        </div>
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">ผลกระทบสิ่งแวดล้อมที่สำคัญ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-100 dark:border-green-900/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mr-3">
                    <Thermometer className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-medium">ภาวะโลกร้อน</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  ก๊าซเรือนกระจกกักเก็บความร้อนไว้ในชั้นบรรยากาศ ส่งผลให้อุณหภูมิโลกสูงขึ้น ส่งผลให้เกิดคลื่นความร้อน ภัยแล้ง และไฟป่ารุนแรงมากขึ้น
                </p>
                <div className="flex items-center text-xs text-orange-600 dark:text-orange-400">
                  <span className="font-medium">1.1°C</span>
                  <span className="mx-2">ภาวะโลกร้อนในปัจจุบันสูงกว่าระดับก่อนยุคอุตสาหกรรม</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 dark:border-green-900/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                    <CloudRain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium">สภาพอากาศสุดขั้ว</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  การเปลี่ยนแปลงสภาพภูมิอากาศส่งผลให้วัฏจักรน้ำรุนแรงขึ้น ทำให้เกิดพายุ เฮอร์ริเคน และน้ำท่วมที่รุนแรงมากขึ้นในบางพื้นที่ ขณะที่บางพื้นที่ประสบกับภัยแล้งรุนแรง
                </p>
                <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                  <span className="font-medium">5เท่า</span>
                  <span className="mx-2">ภัยพิบัติทางธรรมชาติเพิ่มขึ้นตั้งแต่ปีพ.ศ.2513</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 dark:border-green-900/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mr-3">
                    <Fish className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-medium">การสูญเสียความหลากหลายทางชีวภาพ</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  อุณหภูมิที่สูงขึ้นและรูปแบบภูมิอากาศที่เปลี่ยนแปลงทำให้พืชและสัตว์ต้องปรับตัวหรือย้ายถิ่นฐาน หลายสิ่งไม่สามารถปรับตัวได้ทันท่วงที จนนำไปสู่การสูญพันธุ์
                </p>
                <div className="flex items-center text-xs text-cyan-600 dark:text-cyan-400">
                  <span className="font-medium">1 ล้าน</span>
                  <span className="mx-2">สายพันธุ์ที่เสี่ยงต่อการสูญพันธุ์เนื่องจากการเปลี่ยนแปลงสภาพภูมิอากาศ</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 dark:border-green-900/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-3">
                    <Trash2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium">มลพิษ</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  กิจกรรมเดียวกันที่ก่อให้เกิดการปล่อยคาร์บอนมักจะสร้างมลพิษในรูปแบบอื่นๆ ซึ่งส่งผลต่อคุณภาพอากาศ ระบบน้ำ และสุขภาพของดิน
                </p>
                <div className="flex items-center text-xs text-purple-600 dark:text-purple-400">
                  <span className="font-medium">9 ล้าน</span>
                  <span className="mx-2">การเสียชีวิตจากมลพิษในแต่ละปีทั่วโลก</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            เหตุใดปริมาณคาร์บอนฟุตพริ้นท์ของคุณจึงสำคัญ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">ผลกระทบส่วนบุคคล</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                การปล่อยมลพิษของแต่ละคนส่งผลต่อปริมาณการปล่อยมลพิษทั่วโลก การทำความเข้าใจถึงผลกระทบต่อสิ่งแวดล้อมเป็นขั้นตอนแรกในการลดผลกระทบดังกล่าว
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">พลังรวม</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                เมื่อผู้คนนับล้านทำการเปลี่ยนแปลงเล็กๆ น้อยๆ ผลที่ตามมาจะสำคัญมากและสามารถผลักดันให้เกิดการเปลี่ยนแปลงในระบบได้
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">คนรุ่นอนาคต</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                การกระทำของเราในวันนี้จะกำหนดโลกที่ลูกหลานของเราจะได้รับสืบทอด
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-medium mb-4">การเปลี่ยนแปลงเล็กๆ น้อยๆ ผลกระทบใหญ่หลวง</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              การลดปริมาณคาร์บอนแม้เพียงเล็กน้อยก็อาจส่งผลดีต่อสิ่งแวดล้อมได้อย่างมาก:
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-6">
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-green-600 dark:text-green-400">•</span>
                <span>การรับประทานอาหารมังสวิรัติ 1 มื้อต่อสัปดาห์เป็นเวลา 1 ปี ช่วยลดการปล่อยก๊าซเรือนกระจกเทียบเท่ากับการขับรถ 1,160 กิโลเมตร</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-green-600 dark:text-green-400">•</span>
                <span>การเปลี่ยนมาใช้หลอดไฟ LED ในบ้านของคุณสามารถลดการใช้พลังงานไฟฟ้าแสงสว่างได้มากถึง 80%</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-green-600 dark:text-green-400">•</span>
                <span>การลดอุณหภูมิเทอร์โมสตัทลงเพียง 1°C จะช่วยประหยัด CO₂ ได้ถึง 340 กก. ต่อปี</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-green-600 dark:text-green-400">•</span>
                <span>การเติมลมยางอย่างเหมาะสมสามารถเพิ่มประสิทธิภาพการใช้น้ำมันได้ถึง 3% ช่วยประหยัดน้ำมันและลดการปล่อยมลพิษ</span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Button asChild className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                <Link href="/calculator">คำนวณคาร์บอนฟุตพริ้นท์ของคุณ</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
           ดำเนินการเลยวันนี้
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            การทำความเข้าใจปริมาณการปล่อยคาร์บอนของคุณเป็นเพียงจุดเริ่มต้นเท่านั้น เครื่องคำนวณของเรามีคำแนะนำเฉพาะบุคคลเพื่อช่วยคุณลดผลกระทบตามไลฟ์สไตล์และสถานการณ์เฉพาะตัวของคุณ
          </p>
          <div className="space-x-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
              <Link href="/calculator">คำนวณรอยเท้าของคุณ</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/tips">ดูเคล็ดลับการลด</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}