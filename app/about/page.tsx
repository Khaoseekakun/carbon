import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Heart, Globe, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Carbon Footprint Calculator',
  description: 'Learn about our mission to help individuals and organizations reduce their carbon footprint',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        เกี่ยวกับ Carbon footprint assessment website
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        พันธกิจของเราคือการส่งเสริมศักยภาพให้บุคคลและองค์กรต่างๆ ด้วยเครื่องมือที่จำเป็นในการทำความเข้าใจและลดปริมาณการปล่อยคาร์บอน
        </p>
      </div>
      <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-12">
        <Image 
        src="https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
        alt="ภูมิทัศน์ธรรมชาติ" 
        className="object-cover"
        fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
        <p className="text-white text-xl md:text-2xl font-medium">
          สร้างอนาคตที่ยั่งยืนด้วยการคำนวณครั้งละหนึ่งครั้ง
        </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">เรื่องราวของเรา</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          CarbonCalc ก่อตั้งขึ้นในปี 2024 โดยทีมนักวิทยาศาสตร์สิ่งแวดล้อมและวิศวกรซอฟต์แวร์ที่มีวิสัยทัศน์ร่วมกัน: เพื่อให้การคำนวณปริมาณคาร์บอนสามารถเข้าถึงได้ แม่นยำ และดำเนินการได้สำหรับทุกคน
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          เราตระหนักว่าถึงแม้หลายคนจะใส่ใจเรื่องการเปลี่ยนแปลงสภาพภูมิอากาศ แต่การทำความเข้าใจผลกระทบส่วนบุคคลอาจซับซ้อนและน่ากังวล นั่นคือเหตุผลที่เราพัฒนาเครื่องมือที่ใช้งานง่ายซึ่งไม่เพียงคำนวณการปล่อยคาร์บอน แต่ยังให้คำแนะนำเฉพาะบุคคลสำหรับการลดปริมาณการปล่อย
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          ปัจจุบัน เครื่องมือคำนวณของเราได้รับการใช้งานจากบุคคล องค์กร และสถาบันการศึกษาทั่วโลกในความพยายามร่วมกันเพื่อลดการปล่อยคาร์บอนทั่วโลก
        </p>
        </div>
        <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">แนวทางของเรา</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          เราเชื่อว่าการเปลี่ยนแปลงที่มีความหมายมาจากความเข้าใจและการดำเนินการที่เป็นรูปธรรม แนวทางของเราประกอบด้วย:
        </p>
        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
          <span className="mr-2 mt-1 text-green-600 dark:text-green-400">•</span>
          <span><strong>ความแม่นยำทางวิทยาศาสตร์</strong>: การคำนวณของเราขึ้นอยู่กับงานวิจัยที่ผ่านการตรวจสอบจากผู้เชี่ยวชาญและมาตรฐานที่ได้รับการยอมรับในระดับสากล</span>
          </li>
          <li className="flex items-start">
          <span className="mr-2 mt-1 text-green-600 dark:text-green-400">•</span>
          <span><strong>การปรับให้เหมาะสมเฉพาะบุคคล</strong>: เราให้คำแนะนำที่ปรับให้เหมาะสมกับไลฟ์สไตล์และสถานการณ์เฉพาะของคุณ</span>
          </li>
          <li className="flex items-start">
          <span className="mr-2 mt-1 text-green-600 dark:text-green-400">•</span>
          <span><strong>ความเรียบง่าย</strong>: แนวคิดสิ่งแวดล้อมที่ซับซ้อนถูกแปลเป็นข้อมูลที่ชัดเจนและนำไปปฏิบัติได้</span>
          </li>
          <li className="flex items-start">
          <span className="mr-2 mt-1 text-green-600 dark:text-green-400">•</span>
          <span><strong>ผลกระทบเชิงบวก</strong>: เรามุ่งเน้นการส่งเสริมการเปลี่ยนแปลงเชิงบวกแทนที่จะสร้างความวิตกกังวลเกี่ยวกับสภาพภูมิอากาศ</span>
          </li>
        </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">ค่านิยมของเรา</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="border-green-100 dark:border-green-900/30">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Leaf className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">ความซื่อสัตย์ต่อสิ่งแวดล้อม</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
          เรามุ่งมั่นในความแม่นยำทางวิทยาศาสตร์และความโปร่งใสในทุกการคำนวณและคำแนะนำของเรา
          </p>
        </CardContent>
        </Card>
        
        <Card className="border-green-100 dark:border-green-900/30">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Heart className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">ความเห็นอกเห็นใจ</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
          เราเข้าใจว่าการเปลี่ยนแปลงเป็นการเดินทาง และเราพร้อมสนับสนุนด้วยความเข้าใจ
          </p>
        </CardContent>
        </Card>
        
        <Card className="border-green-100 dark:border-green-900/30">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Globe className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">มุมมองระดับโลก</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
          เราคำนึงถึงความหลากหลายของผู้คนทั่วโลกในแนวทางและโซลูชันของเรา
          </p>
        </CardContent>
        </Card>
        
        <Card className="border-green-100 dark:border-green-900/30">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Users className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">ความครอบคลุม</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
          เราเชื่อว่าทุกคนมีบทบาทในการแก้ไขปัญหาการเปลี่ยนแปลงสภาพภูมิอากาศ ไม่ว่าจะมีพื้นฐานหรือสถานการณ์ใด
          </p>
        </CardContent>
        </Card>
      </div>

      {/* <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        ทีมของเรา
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        CarbonCalc รวมผู้เชี่ยวชาญด้านวิทยาศาสตร์สิ่งแวดล้อม การวิเคราะห์ข้อมูล การพัฒนาซอฟต์แวร์ และการออกแบบประสบการณ์ผู้ใช้ ทีมที่หลากหลายของเรามีความมุ่งมั่นร่วมกันในเรื่องความยั่งยืน
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
          <Image 
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100" 
            alt="สมาชิกทีม" 
            width={100} 
            height={100} 
            className="object-cover w-full h-full"
          />
          </div>
          <h3 className="font-medium">ดร. ไมเคิล เฉิน</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">นักวิทยาศาสตร์สิ่งแวดล้อม</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
          <Image 
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" 
            alt="สมาชิกทีม" 
            width={100} 
            height={100} 
            className="object-cover w-full h-full"
          />
          </div>
          <h3 className="font-medium">ซาราห์ จอห์นสัน</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">วิศวกรซอฟต์แวร์</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
          <Image 
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100" 
            alt="สมาชิกทีม" 
            width={100} 
            height={100} 
            className="object-cover w-full h-full"
          />
          </div>
          <h3 className="font-medium">เดวิด โรดริเกซ</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">นักออกแบบ UX</p>
        </div>
        </div>
      </div> */}

      {/* <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        เข้าร่วมภารกิจของเรา
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
        เรากำลังมองหาบุคคลและองค์กรที่มีความหลงใหลในการร่วมมือกันอยู่เสมอ ไม่ว่าคุณจะสนใจโอกาสในการเป็นพันธมิตร มีข้อเสนอแนะเกี่ยวกับเครื่องมือคำนวณของเรา หรือเพียงแค่ต้องการเรียนรู้เพิ่มเติม เรายินดีที่จะรับฟังจากคุณ
        </p>
        <div className="inline-flex">
        <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400">
          ติดต่อเรา
        </a>
        </div>
      </div> */}
      </div>
    </div>
  );
}