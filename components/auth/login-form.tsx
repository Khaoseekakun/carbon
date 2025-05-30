"use client";

import { useState } from 'react';
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
      // TODO: Implement login logic
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
          setModalData({
            actionLabel: "ตกลง",
            description: login_res.data.message,
            type: 'success',
            title: "สำเร็จ",
          })
          setModalOpen(true)
        } else {

          setModalData({
            actionLabel: "ตกลง",
            description: login_res.data.message,
            type: 'error',
            title: "ผิดพลาด",
          })
          setModalOpen(true)
        }
      }

    } catch (error) {
      console.log(error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    }
  }



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
          window.location.reload()
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


        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
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