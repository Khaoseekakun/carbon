import { Metadata } from 'next';
import CalculationHistory from '@/components/history/calculation-history';

export const metadata: Metadata = {
    title: 'Calculation History | Carbon Footprint Calculator',
    description: 'View your carbon footprint calculation history and track your progress over time.',
};

export default function HistoryPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        ประวัติการคำนวณของคุณ
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        ติดตามคาร์บอนฟุตพริ้นท์ของคุณตลอดเวลาและดูความก้าวหน้าในการบรรลุเป้าหมายความยั่งยืน
                    </p>
                </div>

                <CalculationHistory />
            </div>
        </div>
    );
}