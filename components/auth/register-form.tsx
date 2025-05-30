"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Organization } from '@/lib/generated/prisma';
import axios from "axios"
import { CustomAlertDialog } from '../ui/alert-dialog';
import { title } from 'node:process';
const registerSchema = z.object({
    // Step 0
    registrationType: z.enum(['person', 'organization']),

    // Person registration
    name: z.string().min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'),
    email: z.string().email('กรุณากรอกอีเมลให้ถูกต้อง'),
    password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
    confirmPassword: z.string(),
    phone: z.string().min(10, 'เบอร์โทรศัพท์ไม่ถูกต้อง'),
    address: z.string().min(1, 'กรุณากรอกที่อยู่'),
    city: z.string().min(1, 'กรุณากรอกเมือง'),
    state: z.string().min(1, 'กรุณากรอกจังหวัด'),
    zipCode: z.string().min(5, 'รหัสไปรษณีย์ไม่ถูกต้อง'),
    organizationId: z.string(),

    // Organization registration
    org_name: z.string().min(2, 'ชื่อองค์กรต้องมีอย่างน้อย 2 ตัวอักษร'),
    org_email: z.string().email('กรุณากรอกอีเมลให้ถูกต้อง'),
    org_phone: z.string().min(10, 'เบอร์โทรศัพท์ไม่ถูกต้อง'),
    org_address: z.string().min(1, 'กรุณากรอกที่อยู่'),
    org_city: z.string().min(1, 'กรุณากรอกเมือง'),
    org_state: z.string().min(1, 'กรุณากรอกจังหวัด'),
    org_zipCode: z.string().min(5, 'รหัสไปรษณีย์ไม่ถูกต้อง'),
    org_logo: z.any().optional(),
    org_admins: z.array(z.string()).optional(),
    org_members: z.array(z.string()).optional(),

    // Common fields
    termsAccepted: z.boolean().refine(val => val, {
        message: 'กรุณายอมรับข้อตกลงและเงื่อนไข'
    }),
    privacyAccepted: z.boolean().refine(val => val, {
        message: 'กรุณายอมรับนโยบายความเป็นส่วนตัว'
    }),
}).refine((data) => {
    if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword;
    }
    return true;
}, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
});

export default function RegisterForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { toast } = useToast();

    // register select
    const [registerType, setRegisterType] = useState<1 | 2 | null>(null)

    // Person 
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordC, setPasswordC] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [org_name, setOrg_name] = useState("")
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [loadOrg, setLoadOrg] = useState(false)
    const [loadOrgError, setLoadOrgError] = useState("")
    const [org_select, setOrg_select] = useState<Number | null>(null)
    const [privacy, setPrivacy] = useState(false)
    const [policy, setPolicy] = useState(false)
    const [regSuccess, setRegSuccess] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setLoadOrg(true)
                const orgs = await axios.get(`/api/organization/filter${org_name != "" ? `?org_name=${org_name}` : ""}`)
                if (orgs.data) {
                    setOrganizations(orgs.data.organizations)
                } else {
                    setOrganizations([])
                }
                setLoadOrgError("")
            } catch (error) {
                console.log(error)
                setLoadOrgError("ไม่สามารถโหลดข้อมูลองค์กรได้")
            } finally {
                setLoadOrg(false)
            }
        })()
    }, [org_name])

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            registrationType: 'person',
            termsAccepted: false,
            privacyAccepted: false,
        },
    });

    const registrationType = registerType == 1 ? "person" : "org"

    const totalSteps = registrationType === 'person' ? 5 : 5;
    const progress = ((currentStep + 1) / totalSteps) * 100;
    const [nextBtnMessage, setNextBtnMessage] = useState("")
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{
        type?: "success" | "info" | "warning" | "error"
        title?: string;
        description?: string;
        actionLabel?: string
    }>({})

    const handleNext = async () => {
        setNextBtnMessage("กำลังตรวจสอบ...")
        try {
            if (currentStep == 0 && !registerType) {

                toast({
                    title: "จำเป็น",
                    description: "โปรดเลือกรูปแบบการสมัคร",
                });
                return;
            }


            // const fields = getFieldsForCurrentStep();
            // const isValid = await form.trigger(
            //     fields as Parameters<typeof form.trigger>[0]
            // );

            if (currentStep == 1) {
                if (registerType == 1) {
                    if (!username || !password || !email || !passwordC) {
                        return toast({
                            title: "คำเตือน",
                            description: "โปรดกรอกข้อมูลให้ครบถ้วน",
                            color: "#ff5151"
                        });
                    }

                    if (password.length < 6) {
                        return toast({
                            title: "คำเตือน",
                            description: "รหัสผ่านต้องมีความยาว 6 ตัวอักษร"
                        })
                    }

                    if (password != passwordC) {

                        return toast({
                            title: "คำเตือน",
                            description: "รหัสผ่านไม่ตรงกัน",
                            color: "#ff5151"
                        });
                    }

                    const checkEmail = await axios.get(`/api/customers/email?email=${email}`, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                    if (checkEmail.data) {
                        if (checkEmail.data.customer != null) {
                            return toast({
                                title: "โปรดทราบ",
                                description: "Email นี้มีอยู่ในระบบแล้ว"
                            })
                        }
                    } else {
                        return toast({
                            title: "เกิดข้อผิดพลาด",
                            description: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"
                        })
                    }
                } else {

                }
            }
            if (currentStep == 2) {
                if (registerType == 1) {
                    if (!phone || !address || !province || !city || !zipCode) {
                        return toast({
                            title: "คำเตือน",
                            description: "โปรดกรอกข้อมูลให้ครบถ้วน",
                            color: "#ff5151"
                        });
                    }
                }
            }
            if (currentStep == 3) {
                if (registerType == 1) {
                    if (!org_select) {
                        return toast({
                            title: "คำเตือน",
                            description: "โปรดเลือกองค์กร",
                            color: "#ff5151"
                        });
                    }
                }
            }
            if (currentStep == 4) {
                if (registerType == 1) {
                    if (!privacy || !policy) {
                        return toast({
                            title: "โปรดทราบ",
                            description: "โปรดยอมรับเงื่อนไขการใช้งานและข้อกำหนดความเป็นส่วนตัวเพื่อสมัครบัญชี",
                            color: "#ff5151"
                        });
                    }



                    const registerData = await axios.post('/api/customers', {
                        username,
                        email,
                        password,
                        phone,
                        address,
                        province,
                        city,
                        zipCode,
                        org_select
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                    if(registerData.data) {
                        if(registerData.data.status  == false){
                            setModalData({
                                description : registerData.data.message,
                                title : "ผิดพลาด",
                                type : "error",
                                actionLabel: "ปิด"
                            })

                            setModalOpen(true)
                        }else{
                            setModalData({
                                description : registerData.data.message,
                                title : "สำเร็จ",
                                type : "success",
                                actionLabel: "ปิด"
                            })

                            setRegSuccess(true)
                            setModalOpen(true)
                        }
                    }
                }
            }
            setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
        } catch (error) {

        } finally {
            setNextBtnMessage("")
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };
    async function onSubmit(values: z.infer<typeof registerSchema>) {
        try {
            // TODO: Implement registration logic
            console.log(values);
            toast({
                title: "สมัครสมาชิกสำเร็จ",
                description: "กรุณายืนยันอีเมลของคุณ",
            });
        } catch (error) {
            toast({
                title: "เกิดข้อผิดพลาด",
                description: "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง",
                variant: "destructive",
            });
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <FormField
                        control={form.control}
                        name="registrationType"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>เลือกประเภทการสมัคร</FormLabel>
                                <FormControl>
                                    <div className='flex flex-row gap-3'>
                                        <div className='w-6/12'>
                                            <Card
                                                key={'person'}
                                                className={`${registerType == 1 ? "border-2 border-green-500" : "border border-green-100"} dark:border-green-900/30 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition`}
                                                onClick={() => {
                                                    if (registerType == 1) {
                                                        setRegisterType(null)
                                                    } else {
                                                        setRegisterType(1)
                                                    }
                                                }}
                                            >
                                                <CardContent className="p-4 flex items-center space-x-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                                            บุคคล
                                                        </h3>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div className='w-6/12'>
                                            <Card
                                                key={'org'}
                                                className={`${registerType == 2 ? "border-2 border-green-500" : "border border-green-100"} dark:border-green-900/30 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition`}
                                                onClick={() => {
                                                    if (registerType == 2) {
                                                        setRegisterType(null)
                                                    } else {
                                                        setRegisterType(2)
                                                    }
                                                }}
                                            >
                                                <CardContent className="p-4 flex items-center space-x-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                                            องค์กร
                                                        </h3>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            case 1:
                return registrationType === 'person' ? (
                    // Person Account Info
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ชื่อ</FormLabel>
                                    <FormControl>
                                        <Input placeholder="กรอกชื่อของคุณ" {...field} value={username} onChange={(e) => {
                                            setUsername(e.target.value)
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>อีเมล</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="กรอกอีเมลของคุณ" {...field} value={email} onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="กรอกรหัสผ่านอีกครั้ง"
                                                {...field}
                                                value={passwordC}
                                                onChange={(e) => {
                                                    setPasswordC(e.target.value)
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                            >
                                                {showConfirmPassword ? (
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
                    </div>
                ) : (
                    // Organization Info
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="org_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ชื่อองค์กร</FormLabel>
                                    <FormControl>
                                        <Input placeholder="กรอกชื่อองค์กร" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="org_email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>อีเมลองค์กร</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="กรอกอีเมลองค์กร" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="org_phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>เบอร์โทรศัพท์องค์กร</FormLabel>
                                    <FormControl>
                                        <Input placeholder="กรอกเบอร์โทรศัพท์องค์กร" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                );

            case 2:
                return registrationType === 'person' ? (
                    // Person Contact Info
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>เบอร์โทรศัพท์</FormLabel>
                                    <FormControl>
                                        <Input placeholder="กรอกเบอร์โทรศัพท์" {...field} value={phone} onChange={(e) => {
                                            setPhone(e.target.value)
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ที่อยู่</FormLabel>
                                    <FormControl>
                                        <Input placeholder="กรอกที่อยู่" {...field} value={address} onChange={(e) => {
                                            setAddress(e.target.value)
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>เมือง</FormLabel>
                                        <FormControl>
                                            <Input placeholder="กรอกเมือง" {...field} value={city} onChange={(e) => {
                                                setCity(e.target.value)
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>จังหวัด</FormLabel>
                                        <FormControl>
                                            <Input placeholder="กรอกจังหวัด" {...field} value={province} onChange={(e) => {
                                                setProvince(e.target.value)
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="zipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>รหัสไปรษณีย์</FormLabel>
                                        <FormControl>
                                            <Input placeholder="กรอกรหัสไปรษณีย์" {...field} value={zipCode} onChange={(e) => {
                                                setZipCode(e.target.value)
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                ) : (
                    // Organization Address
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="org_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ที่อยู่องค์กร</FormLabel>
                                    <FormControl>
                                        <Input placeholder="กรอกที่อยู่องค์กร" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="org_city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>เมือง</FormLabel>
                                        <FormControl>
                                            <Input placeholder="กรอกเมือง" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="org_state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>จังหวัด</FormLabel>
                                        <FormControl>
                                            <Input placeholder="กรอกจังหวัด" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="org_zipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>รหัสไปรษณีย์</FormLabel>
                                        <FormControl>
                                            <Input placeholder="กรอกรหัสไปรษณีย์" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );

            case 3:
                return registrationType === 'person' ? (
                    // Person Organization Link
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="organizationId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>เลือกองค์กร</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ค้นหาองค์กร" {...field} value={org_name} onChange={(e) => {
                                            setOrg_name(e.target.value)
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {(() => {
                            if (loadOrg === true) {
                                return (
                                    <h2 className="text-xl text-green-500 dark:text-white mb-6 text-center">
                                        กำลังโหลดข้อมูล
                                    </h2>
                                );
                            }

                            if (loadOrgError !== "") {
                                return (
                                    <h2 className="text-xl text-red-500 dark:text-white mb-6 text-center">
                                        ไม่สามารถโหลดข้อมูลองค์กรได้
                                    </h2>
                                );
                            }

                            if (organizations.length === 0) {
                                return (
                                    <h2 className="text-xl text-red-500 dark:text-white mb-6 text-center">
                                        ไม่พบชื่อองค์กร
                                    </h2>
                                );
                            }

                            return organizations.map((org) => (
                                <Card
                                    key={org.id}
                                    className={`${org_select == org.id ? "border-2 border-green-500" : "border border-green-100"} dark:border-green-900/30 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition`}
                                    onClick={() => {
                                        if (org.id == org_select) {
                                            setOrg_select(null)
                                        } else {
                                            setOrg_select(org.id)
                                        }
                                    }}
                                >
                                    <CardContent className="p-4 flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={org.org_logo ?? undefined}
                                                alt="LogoImage"
                                                width={50}
                                                height={50}
                                                className="w-12 h-12 rounded-full object-cover bg-gray-300"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                                {org.org_name}
                                            </h3>
                                        </div>
                                    </CardContent>
                                </Card>
                            ));
                        })()}
                    </div>
                ) : (
                    // Organization Admin Setup
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="org_admins"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>กำหนดผู้ดูแล</FormLabel>
                                    <FormControl>
                                        <Input placeholder="อีเมลผู้ดูแล" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="org_members"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>เชิญสมาชิก (ไม่บังคับ)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="อีเมลสมาชิก" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                );

            case 4:
                return (
                    // Confirmation
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="termsAccepted"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={policy}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setPolicy(true)
                                                } else {
                                                    setPolicy(false)
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className={`${policy ? "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300" : ""}`}>
                                            ยอมรับ{" "}
                                            <a
                                                href="/terms"
                                                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 underline"
                                            >
                                                ข้อตกลงและเงื่อนไข
                                            </a>
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="privacyAccepted"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={privacy}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setPrivacy(true)
                                                } else {
                                                    setPrivacy(false)
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className={`${privacy ? "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300" : ""}`}>
                                            ยอมรับ{" "}
                                            <a
                                                href="/privacy"
                                                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 underline"
                                            >
                                                นโยบายความเป็นส่วนตัว
                                            </a>
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

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
                    if(regSuccess){
                        window.location.href = "/auth/signin"
                    }
                    setModalOpen(false)
                })}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mb-8">
                        <div className="flex justify-between text-sm mb-2">
                            <span>ขั้นตอนที่ {currentStep + 1} จาก {totalSteps}</span>
                            <span>{Math.round(progress)}% เสร็จสิ้น</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    {renderStep()}

                    <div className={`flex ${currentStep == 0 ? "justify-end" : "justify-between"} mt-8`}>
                        {
                            currentStep != 0 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                >
                                    ย้อนกลับ
                                </Button>
                            )
                        }
                        {currentStep === totalSteps - 1 ? (
                            <Button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                onClick={handleNext}
                            >

                                {nextBtnMessage != "" ? nextBtnMessage : "ยืนยันการสมัคร"}
                            </Button>
                        ) :

                            (
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                >
                                    {nextBtnMessage != "" ? nextBtnMessage : "ถัดไป"}
                                </Button>
                            )}
                    </div>
                </form>
            </Form>
        </>
    );
}