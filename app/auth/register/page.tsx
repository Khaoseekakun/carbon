import { Metadata } from 'next';
import RegisterForm from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'สมัครสมาชิก | Carbon Footprint Calculator',
  description: 'สมัครสมาชิกเพื่อเริ่มต้นการคำนวณคาร์บอนฟุตพริ้นท์',
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            สมัครสมาชิก
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            สร้างบัญชีเพื่อเริ่มต้นการคำนวณคาร์บอนฟุตพริ้นท์
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}