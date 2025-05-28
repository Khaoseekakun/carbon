import { Metadata } from 'next';
import LoginForm from '@/components/auth/login-form';

export const metadata: Metadata = {
    title: 'เข้าสู่ระบบ | Carbon Footprint Calculator',
    description: 'เข้าสู่ระบบเพื่อจัดการข้อมูลคาร์บอนฟุตพริ้นท์ของคุณ',
};

export default function LoginPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        เข้าสู่ระบบ
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        เข้าสู่ระบบเพื่อจัดการข้อมูลคาร์บอนฟุตพริ้นท์ของคุณ
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}