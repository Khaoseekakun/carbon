"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { CustomAlertDialog } from '../ui/alert-dialog';
import { useSession } from '../providers/SessionProvider';

const loginSchema = z.object({
  email: z.string().email('กรุณากรอกอีเมลให้ถูกต้อง'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selected, setSelected] = useState('person');
  const { toast } = useToast();

  const { session, logout } = useSession();
  const [loading, setLoading] = useState(true)
  const [loginSuccess, setLoginSuccess] = useState(false);
  useEffect(() => {
    if (session) {
      window.location.href = "/"
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [session])

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    type?: "success" | "info" | "warning" | "error"
    title?: string;
    description?: string;
    actionLabel?: string
  }>({})


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit() {
    try {
      const login_res = await axios.post(`/api/oauth/login`, {
        loginType: selected,
        email: email,
        password: password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (login_res.data) {
        if (login_res.data.status == true) {
          const userData = login_res.data.data;

          localStorage.setItem('token', userData.token);

          localStorage.setItem('user', JSON.stringify({
            id: userData.id,
            email: userData.email,
            org_id: userData.org_id ?? null,
            phone: userData.phone,
            picture: userData.picture,
            type: userData.type
          }));

          setModalData({
            actionLabel: "ตกลง",
            description: login_res.data.message,
            type: 'success',
            title: "สำเร็จ",
          });
          setModalOpen(true);
          setLoginSuccess(true)
        } else {
          setModalData({
            actionLabel: "ตกลง",
            description: login_res.data.message,
            type: 'error',
            title: "ผิดพลาด",
          });
          setModalOpen(true);
          setLoginSuccess(false)
        }
      }

    } catch (error) {
      console.log(error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    }
  }

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-10 w-10 text-green-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span className="text-lg text-green-700 font-medium">กำลังตรวจสอบข้อมูล...</span>
      </div>
    </div>
  )

  return (
    <>
      <CustomAlertDialog
        type={modalData.type}
        title={modalData.title ?? "Alert"}
        description={modalData.description}
        open={modalOpen}
        actionLabel={modalData.actionLabel}
        showCancel={false}
        onAction={(() => {
          setModalOpen(false)
          if (loginSuccess) {
            window.location.href = "/profile"
          }
        })}
      />
      <Form {...form}>

        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกประเภทการเข้าสู่ระบบ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="person">บุคคล</SelectItem>
            <SelectItem value="org">องค์กร</SelectItem>
          </SelectContent>
        </Select>

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="กรอกอีเมลของคุณ"
                  {...field}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รหัสผ่าน</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="กรอกรหัสผ่านของคุณ"
                    {...field}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
          >
            ลืมรหัสผ่าน?
          </Link>
        </div>

        <div onClick={() => { onSubmit() }}>
          <Button
            type="button"
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            เข้าสู่ระบบ
          </Button>
        </div>


        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
          ยังไม่มีบัญชี?{" "}
          <Link
            href="/auth/register"
            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
          >
            สมัครสมาชิก
          </Link>
        </div>
      </Form>
    </>
  );
}