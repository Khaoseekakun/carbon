"use client";
import { isSameDay } from 'date-fns';
import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Search, Edit, Trash2, Users } from 'lucide-react';
import { CustomerFormat, useLoadMemberOrganization } from './manage-profile';
import { useSession } from '../providers/SessionProvider';


export default function OrganizationMembers() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<CustomerFormat | null>(null);

    const { session } = useSession();
    const [statusFilter, setStatusFilter] = useState<'all' | 'updated' | 'notUpdated'>('all');
    const [sortOption, setSortOption] = useState<'lastUpdatedAsc' | 'lastUpdatedDesc' | 'inactiveDaysDesc'>('lastUpdatedDesc');
    const { loading: loadMember, data: memberData = [] } = useLoadMemberOrganization(session?.org_id!);

    const hasUpdatedToday = (member: CustomerFormat) => {
        const latestUpdate = member.HistoryCalculator[0]?.createdAt;
        return latestUpdate && isSameDay(new Date(latestUpdate), new Date());
    };

    const getLastUpdate = (member: CustomerFormat): Date | null => {
        return member.HistoryCalculator[0]?.createdAt
            ? new Date(member.HistoryCalculator[0].createdAt)
            : null;
    };

    const filteredMembers = memberData
        .filter((member) =>
            member.username.includes(searchQuery.toLowerCase())
        )
        .filter((member) => {
            const latestUpdate = getLastUpdate(member);

            if (statusFilter === 'updated') {
                return latestUpdate && isSameDay(latestUpdate, new Date());
            }

            if (statusFilter === 'notUpdated') {
                return !latestUpdate || !isSameDay(latestUpdate, new Date());
            }

            return true; // all
        })
        .sort((a, b) => {
            const dateA = getLastUpdate(a)?.getTime() ?? 0;
            const dateB = getLastUpdate(b)?.getTime() ?? 0;

            if (sortOption === 'lastUpdatedAsc') return dateA - dateB;
            if (sortOption === 'lastUpdatedDesc') return dateB - dateA;
            if (sortOption === 'inactiveDaysDesc') return dateA - dateB;

            return 0;
        });

    const formatDate = (date: Date | null) => {
        if (!date) return 'ไม่มีข้อมูลอัปเดต';
        return format(date, "d MMM yyyy, HH:mm 'น.'", { locale: th });
    };

    const handleDelete = (member: CustomerFormat) => {
        setMemberToDelete(member);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        console.log('Deleting member:', memberToDelete?.username);
        setIsDeleteDialogOpen(false);
        setMemberToDelete(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    <h2 className="text-2xl font-bold">สมาชิกในองค์กร</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        (สมาชิกทั้งหมด {memberData.length} คน)
                    </span>
                </div>
                <div className="flex relative flex-row gap-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        placeholder="ค้นหาสมาชิก..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />

                    <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val as any)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="กรองตามสถานะ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ทั้งหมด</SelectItem>
                            <SelectItem value="updated">อัปเดตแล้ววันนี้</SelectItem>
                            <SelectItem value="notUpdated">ยังไม่ได้อัปเดต</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortOption} onValueChange={(val) => setSortOption(val as any)}>
                        <SelectTrigger className="w-56">
                            <SelectValue placeholder="เรียงตาม..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="lastUpdatedDesc">อัปเดตล่าสุด (ใหม่ → เก่า)</SelectItem>
                            <SelectItem value="lastUpdatedAsc">อัปเดตล่าสุด (เก่า → ใหม่)</SelectItem>
                            <SelectItem value="inactiveDaysDesc">ไม่ได้ใช้งานนานที่สุด</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMembers.map((member) => (
                    <Card
                        key={member.id}
                        className="transition-all duration-200 hover:shadow-md border-green-100 dark:border-green-900/30"
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <div className="relative w-12 h-12">
                                    <Image
                                        src={member.profilePicture || '/images/user_unknown.jpg'}
                                        alt={member.username}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">{member.username}</h3>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <span className={hasUpdatedToday(member) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                            {hasUpdatedToday(member) ? '✅ อัปเดตแล้ววันนี้' : '⛔ ยังไม่ได้อัปเดต'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        อัปเดตล่าสุด {formatDate(getLastUpdate(member))}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(member)}
                                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle>
                        <AlertDialogDescription>
                            คุณต้องการลบ {memberToDelete?.username} ออกจากองค์กรจริงหรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                        >
                            ยืนยันการลบ
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}