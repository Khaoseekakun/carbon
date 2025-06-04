import { Metadata } from 'next';
import ProfilePage from '@/components/profile/profile';

export const metadata: Metadata = {
  title: 'โปรไฟล์ | Carbon Footprint Calculator',
  description: 'จัดการโปรไฟล์และติดตามความคืบหน้าในการลดคาร์บอนฟุตพริ้นท์ของคุณ',
};

export default function Profile() {
    return (
        <ProfilePage></ProfilePage>
    )
}
// Mock data for charts
