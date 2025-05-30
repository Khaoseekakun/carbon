import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Carbon Footprint Calculator',
  description: 'Our terms of service outline the rules and guidelines for using our carbon footprint calculator.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          ข้อกำหนดในการให้บริการ
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead mb-8">
            อัพเดทล่าสุด: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">นโยบายความเป็นส่วนตัว(Privacy Policy)</h2>
            <p className="mb-4">
              เว็บไซต์คำนวฯคาร์บอนฟุตพริ้นท์ของเราให้ความสำคัญแก่ผู้ใช้บริการของเรา และมุ่งมั่นในการป้องกันข้อมูลส่วนตัวของท่านตามกฎหมายที่เกี่ยวข้อง นโยบายความเป็นส่วนตัวนี้จัดทำขึ้นเพื่อชี้แจงว่า เรารวบรวม ใช้ เปิดเผย และจัดเก็บข้อมูลของท่านอย่างไร
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. ข้อมูลที่เก็บรวบรวม</h2>
            <p className="mb-4">
              ทางเว็บไซต์ของเราจะทำการเก็บข้อมูล ชื่อ-นามสกุล ที่อยู่ เบอร์โทร อีเมลผู้ใช้งาน
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>ชื่อ-นามสกุล</li>
              <li>ที่อยู่</li>
              <li>เบอร์โทร</li>
              <li>อีเมลผู้ใช้งาน</li>
              <li>รูปภาพ</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. วัตถุประสงค์ในการใช้ข้อมูล</h2>
            <p className="mb-4">
              เราต้องการใช้ข้อมูลของท่านเพื่อนำไปเก็บรวบรวมข้อมูลในเพื่อในการทำโครงงานไปนำเสอนวิทยาลัยเทคนิคเชียงใหม่
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. การเปิดเผยข้อมูล</h2>
            <p className="mb-4">
              ทางเราจะจำเป็นต้องทำการเปิดเผยข้อมูลผู้ใช้งานให้กับทางวิทยาลัยเพื่อใช้ในการยืนยันว่ามีผู้ใช้งานจริง และยืนยันว่าทางเว็บไซต์สามารถทำงานได้
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. คุกกี้ (Cookies)</h2>
            <p className="mb-4">
              เราใช้คุกกี้เพื่อวิเคราะห์พฤติกรรมผู้ใช้งาน และปรับปรุงประสบการณ์ในการใช้เว็บไซต์ ท่านสามารถปิดการใช้งานคุกกี้ได้จากเบราว์เซอร์ของท่าน
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. การรักษาความปลอดภัยของข้อมูล</h2>
            <p className="mb-4">
              เรามีมาตราการในการรักษาข้อมูลของท่านทั้งผู้ใช้งานทางบุคคลหรือองค์กร เพื่อป้องกันข้อมูลส่วนบุคคลจากการเข้าถึงโดยไม่ได้รับอนุญาต และเผยแพร่ หรือการสูญหายของข้อมูล
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. สิทธิของท่าน</h2>
            <p className="mb-4">
              ท่านจะมีสิทธิดังนี้
            </p>
             <ul className="list-disc pl-6 mb-4">
              <li>ขออนุญาตในการข้อเข้าถึงข้อมูลส่วนตัวของตน</li>
              <li>ขอแก้ไขข้อมูลของตนเองได้</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. การเปลี่ยนแปลงนโยบาย</h2>
            <p className="mb-4">
              เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นบางครั้งบางคราว โดยจะแจ้งให้ทราบผ่านเว็บไซต์ของเรา
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. ติดต่อเรา</h2>
            <p className="mb-4">
              หากท่านมีคำถาม ข้อเสนอแนะ หรือข้อร้องเรียนเกี่ยวกับนโยบายนี้ กรุณาติดต่อ:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>อีเมล: sinsamuth.dev@gmail.com</li>
              <li>เบอร์โทรศัพท์: 099-381-7763</li>
              <li>ที่อยู่: 9 ถนนเวียงแก้ว ตำบลศรีภูมิ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ วิทยาลัยเทคนิคเชียงใหม่ </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}