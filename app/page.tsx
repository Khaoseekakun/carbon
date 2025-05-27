import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, Globe, Truck, Utensils, BarChart3, House } from 'lucide-react';
import FeatureCard from '@/components/home/feature-card';
import StatsSection from '@/components/home/stats-section';
import TestimonialsSection from '@/components/home/testimonials-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ส่วน Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
          วัด <span className="text-green-600 dark:text-green-400">Carbon Footprint</span> ของคุณ & สร้างความเปลี่ยนแปลง
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          คำนวณ ทำความเข้าใจ และลดผลกระทบต่อสิ่งแวดล้อมของคุณด้วยเครื่องมือคำนวณ Carbon Footprint ที่ใช้งานง่ายของเรา
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
          <Link href="/calculator">คำนวณ Carbon Footprint ของคุณ</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
          <Link href="/about">เรียนรู้เพิ่มเติม</Link>
          </Button>
        </div>
        </div>
      </div>
      </section>

      {/* ส่วน Features */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">วิธีการทำงาน</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          เครื่องมือคำนวณ Carbon ของเรามอบการวิเคราะห์ที่ครอบคลุมเกี่ยวกับผลกระทบต่อสิ่งแวดล้อมของคุณในหลายหมวดหมู่
        </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<House className="h-10 w-10 text-green-600 dark:text-green-400" />}
          title="พลังงานในบ้าน"
          description="คำนวณผลกระทบ Carbon จากการใช้พลังงานในครัวเรือนของคุณ รวมถึงไฟฟ้า การทำความร้อน และการทำความเย็น"
        />
        <FeatureCard 
          icon={<Truck className="h-10 w-10 text-green-600 dark:text-green-400" />}
          title="การขนส่ง"
          description="วัดการปล่อยก๊าซจากการเดินทางประจำวัน การเดินทางทางอากาศ และวิธีการขนส่งอื่น ๆ"
        />
        <FeatureCard 
          icon={<Utensils className="h-10 w-10 text-green-600 dark:text-green-400" />}
          title="อาหาร & การบริโภค"
          description="เข้าใจว่าการเลือกอาหารของคุณส่งผลต่อ Carbon Footprint อย่างไรด้วยเครื่องมือคำนวณอาหารของเรา"
        />
        <FeatureCard 
          icon={<Globe className="h-10 w-10 text-green-600 dark:text-green-400" />}
          title="ข้อมูลเชิงลึกเฉพาะบุคคล"
          description="รับคำแนะนำเฉพาะบุคคลเพื่อลดผลกระทบต่อสิ่งแวดล้อมของคุณตามไลฟ์สไตล์เฉพาะของคุณ"
        />
        <FeatureCard 
          icon={<BarChart3 className="h-10 w-10 text-green-600 dark:text-green-400" />}
          title="การติดตามความก้าวหน้า"
          description="ติดตามการพัฒนาของคุณเมื่อเวลาผ่านไปและตั้งเป้าหมายเพื่อลด Carbon Footprint"
        />
        <FeatureCard 
          icon={<BadgeCheck className="h-10 w-10 text-green-600 dark:text-green-400" />}
          title="แผนปฏิบัติการ"
          description="รับแผนปฏิบัติการที่ใช้งานได้จริงทีละขั้นตอนเพื่อสร้างการเปลี่ยนแปลงที่มีความหมายในชีวิตประจำวันของคุณ"
        />
        </div>
      </div>
      </section>

      {/* ส่วน Stats */}
      {/* <StatsSection /> */}

      {/* ส่วน CTA */}
      <section className="py-16 md:py-24 bg-green-600 dark:bg-green-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          พร้อมที่จะลด Carbon Footprint ของคุณหรือยัง?
        </h2>
        <p className="text-xl text-green-100 mb-8">
          เข้าร่วมกับผู้คนหลายพันคนที่สร้างผลกระทบเชิงบวกต่อโลกของเรา
        </p>
        <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100">
          <Link href="/calculator">เริ่มต้นเลยตอนนี้</Link>
        </Button>
        </div>
      </div>
      </section>

      {/* ส่วน Testimonials */}
      {/* <TestimonialsSection /> */}
    </div>
  );
}