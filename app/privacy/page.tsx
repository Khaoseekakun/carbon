import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Carbon Footprint Calculator",
  description:
    "Our privacy policy explains how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          นโยบายความเป็นส่วนตัว (Privacy Policy)
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">นโยบายความเป็นส่วนตัว</h2>
            <p className="mb-4">
              เว็บไซต์คำนวณคาร์บอนฟุตพริ้นท์ของเราให้ความสำคัญแก่ผู้ใช้บริการของเราและมุ่งมั่นในการป้องกันข้อมูลส่วนตัวของท่านตามกฎหมายที่เกี่ยวข้อง
              และนโยบายความเป็นส่วนตัวนี้
              และจัดทำขึ้นเพื่อชี้แจงว่าเรารวบรวมข้อมูลของท่านเพื่อใช้ในการศึกษาและรวบรวมข้อมูลของผู้ใช้งาน
              ในการนำไว้เก็บเป็นตัวอย่างผู้ใช้งานเว็บไซต์ในการนำเสอนโครงงานนำเสนอให้กับวิทยาลัยเทคนิคเชียงใหม่
              โดยข้อมูลที่เก็บจัดแยกได้ดังนี้
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">โดยมีข้อมูลดังนี้</h2>
            <p className="mb-4">
            ข้อมูลที่เราเก็บรวบรวม
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>ขออนุญาตในการข้อเข้าถึงข้อมูลส่วนตัวของตน</li>
              <li>ขอแก้ไขข้อมูลของตนเองได้</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">ติดต่อเรา</h2>
            <p className="mb-4">
              หากท่านมีคำถาม ข้อเสนอแนะ หรือข้อร้องเรียนเกี่ยวกับนโยบายนี้
              กรุณาติดต่อ:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>อีเมล: sinsamuth.dev@gmail.com</li>
              <li>เบอร์โทรศัพท์: 099-381-7763</li>
              <li>
                ที่อยู่: 9 ถนนเวียงแก้ว ตำบลศรีภูมิ อำเภอเมืองเชียงใหม่
                จังหวัดเชียงใหม่ วิทยาลัยเทคนิคเชียงใหม่
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
