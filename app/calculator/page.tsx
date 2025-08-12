import { Metadata } from 'next';
import CalculatorForm from '@/components/calculator/calculator-form';
import CalculatorNewForm from '@/components/calculator/calculator-new-form';
export const metadata: Metadata = {
  title: 'Carbon Footprint Calculator',
  description: 'Calculate your carbon footprint and learn how to reduce your environmental impact',
};

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            เครื่องคำนวณคาร์บอนฟุตพริ้นท์
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            คำนวณคาร์บอนฟุตพริ้นท์ของคุณในหลายหมวดหมู่ ตอบคำถามด้านล่างเพื่อรับการประเมินส่วนบุคคล
          </p>
        </div>

        <CalculatorNewForm/>
        
        {/* <CalculatorForm /> */}
      </div>
    </div>
  );
}