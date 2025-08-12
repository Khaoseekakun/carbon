"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Home, Car, Utensils, ShoppingBag, Plane } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { calculatorFormSchema } from '@/lib/schemas/calculator-schema';
import CalculatorResults from '@/components/calculator/calculator-results';

const formTabs = [
    { id: 'home', label: 'บ้าน', icon: <Home className="mr-2 h-4 w-4" /> },
    { id: 'car', label: 'การใช้รถยนต์', icon: <Car className="mr-2 h-4 w-4" /> },
    { id: 'motorbike', label: 'การใช้รถมอเตอร์ไซค์', icon: <Utensils className="mr-2 h-4 w-4" /> },
    { id: 'piblic_transport', label: 'การใช้รถสาธารณะ', icon: <ShoppingBag className="mr-2 h-4 w-4" /> },
    { id: 'travel', label: 'ท่องเที่ยว', icon: <Plane className="mr-2 h-4 w-4" /> },
];

export default function CalculatorNewForm() {
    const [activeTab, setActiveTab] = useState('home');
    const [showResults, setShowResults] = useState(false);
    const [progressPercentage, setProgressPercentage] = useState(20);

    // Initialize form with react-hook-form and zod validation
    const form = useForm<z.infer<typeof calculatorFormSchema>>({
        resolver: zodResolver(calculatorFormSchema),
        defaultValues: {
            // Home
            home_power_type: undefined,
            home_electricity_units_used: undefined,
            home_wood_burning_frequency: undefined,
            home_garbage_is_thrown_away: undefined,

            // Transportation
            use_car_to_day: 0,
            car_brand: undefined,
            car_model: undefined,
            car_used_km: undefined,
            car_power_type: undefined,
            car_oil_type: undefined,

            // Moterbile
            use_motorcycle_to_day: 0,
            motorcycle_brand: undefined,
            motorcycle_model: undefined,
            motorcycle_used_km: undefined,
            motorcycle_power_type: undefined,
            motorcycle_oil_type: undefined,

            // Piblic Transport
            use_public_transport: 0,
            public_transport_type: undefined,
            public_transport_used_km: undefined,
            public_transport_frequency: undefined,
            public_transport_power_type: undefined,
            public_transport_oil_type: undefined,

            // Travel
            use_traverl_air: 0,
            travel_air_brand: undefined,
            travel_air_model: undefined,
            travel_distance: undefined,
        },
    });

    // Handle form submission
    function onSubmit(values: z.infer<typeof calculatorFormSchema>) {
        console.log(values);
        setShowResults(true);
    }

    // Handle tab change
    const handleTabChange = (value: string) => {
        setActiveTab(value);

        // Update progress based on active tab
        const tabIndex = formTabs.findIndex(tab => tab.id === value);
        const newProgress = ((tabIndex + 1) / formTabs.length) * 100;
        setProgressPercentage(newProgress);
    };

    // Define required fields for each tab
    const getRequiredFieldsForTab = (tabId: string): string[] => {
        switch (tabId) {
            case 'home':
                return ['home_power_type', 'home_electricity_units_used', 'home_wood_burning_frequency', 'home_garbage_is_thrown_away'];
            case 'car':
                return ['use_car_to_day', 'car_brand', 'car_model', 'car_used_km', 'car_power_type', 'car_oil_type'];
            case 'motorbike':
                return ['use_motorcycle_to_day', 'motorcycle_brand', 'motorcycle_model', 'motorcycle_used_km', 'motorcycle_power_type', 'motorcycle_oil_type'];
            case 'piblic_transport':
                return ['use_public_transport', 'public_transport_type', 'public_transport_used_km', 'public_transport_frequency', 'public_transport_power_type', 'public_transport_oil_type'];
            case 'travel':
                return ['travel_frequency', 'travel_type', 'travel_distance', 'travel_power_type', 'travel_oil_type'];
            default:
                return [];
        }
    };

    // Handle "Next" button click with validation
    const handleNext = async () => {
        const currentIndex = formTabs.findIndex(tab => tab.id === activeTab);
        const requiredFields = getRequiredFieldsForTab(activeTab) as (keyof z.infer<typeof calculatorFormSchema>)[];

        // Validate current tab's required fields
        const isValid = await form.trigger(requiredFields);

        if (!isValid) {
            // If validation fails, don't proceed to next tab
            return;
        }

        // Additional validation for conditional fields
        if (activeTab === 'home') {
            const homeEnergySource = form.getValues('');
            if (homeEnergySource === 'mixed') {
                const renewableValid = await form.trigger(['renewablePercentage']);
                if (!renewableValid) return;
            }
        }

        if (activeTab === 'transportation') {
            const transportationCar = form.getValues('transportationCar');
            if (transportationCar === 'yes') {
                const carFieldsValid = await form.trigger(['carType', 'carMileage']);
                if (!carFieldsValid) return;
            }
        }

        // If all validations pass, proceed to next tab or submit
        if (currentIndex < formTabs.length - 1) {
            const nextTab = formTabs[currentIndex + 1].id;
            handleTabChange(nextTab);
        } else {
            form.handleSubmit(onSubmit)();
        }
    };

    // Clear field error when user starts interacting
    const clearFieldError = (fieldName: keyof z.infer<typeof calculatorFormSchema>) => {
        form.clearErrors(fieldName);
    };

    // Handle "Back" button click
    const handleBack = () => {
        const currentIndex = formTabs.findIndex(tab => tab.id === activeTab);
        if (currentIndex > 0) {
            const prevTab = formTabs[currentIndex - 1].id;
            handleTabChange(prevTab);
        }
    };

    if (showResults) {
        return <CalculatorResults data={form.getValues()} onReset={() => setShowResults(false)} />;
    }

    return (
        <Card className="border-green-100 dark:border-green-900/30 shadow-md">
            <CardContent className="p-6">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            ขั้นตอน {formTabs.findIndex(tab => tab.id === activeTab) + 1} จาก {formTabs.length}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            สำเร็จ {Math.round(progressPercentage)}%
                        </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2 bg-gray-100 dark:bg-gray-800" />
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                            <TabsList className="w-full mb-6 grid grid-cols-5 bg-gray-100 dark:bg-gray-800">
                                {formTabs.map((tab) => (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.id}
                                        className="flex items-center justify-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                                    >
                                        {tab.icon}
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <TabsContent value="home" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="homePeople"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>จำนวนสมาชิก</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(Number(e.target.value));
                                                            clearFieldError('homePeople');
                                                        }}
                                                        onFocus={() => clearFieldError('homePeople')}
                                                    />
                                                </FormControl>
                                                <FormDescription>จำนวนคนทั้งหมดที่อยู่ในบ้านของคุณ</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="homeSize"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ขนาดบ้าน (ตร.ม.)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={10}
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(Number(e.target.value));
                                                            clearFieldError('homeSize');
                                                        }}
                                                        onFocus={() => clearFieldError('homeSize')}
                                                    />
                                                </FormControl>
                                                <FormDescription>ขนาดบ้านของคุณโดยประมาณเป็นตารางเมตร</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="homeEnergySource"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>แหล่งพลังงานหลัก</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('homeEnergySource');
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="grid" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ไฟฟ้าจากโครงข่ายมาตรฐาน</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="renewable" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">แผนพลังงานสีเขียว/พลังงานหมุนเวียน</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="mixed" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">แบบผสม (มาตรฐานร่วมกับพลังงานหมุนเวียนบางส่วน)</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="homeHeatingType"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>แหล่งพลังงานหลักสำหรับทำความร้อน</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('homeHeatingType');
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="gas" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ก๊าซธรรมชาติ</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="oil" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">น้ำมัน</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="electric" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ไฟฟ้า</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="heatpump" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ปั๊มความร้อน</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {(form.watch('homeEnergySource') === 'mixed') && (
                                    <FormField
                                        control={form.control}
                                        name="renewablePercentage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>เปอร์เซ็นต์ของพลังงานหมุนเวียน: {field.value}%</FormLabel>
                                                <FormControl>
                                                    <Slider
                                                        min={0}
                                                        max={100}
                                                        step={1}
                                                        defaultValue={[field.value ?? 0]}
                                                        onValueChange={(vals) => {
                                                            field.onChange(vals[0]);
                                                            clearFieldError('renewablePercentage');
                                                        }}
                                                        className="w-full"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    ประมาณเปอร์เซ็นต์ของพลังงานที่คุณใช้จากแหล่งพลังงานหมุนเวียน
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </TabsContent>

                            <TabsContent value="transportation" className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="transportationCar"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>คุณมีหรือใช้รถยนต์เป็นประจำหรือไม่?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('transportationCar');
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="yes" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ใช่</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="no" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ไม่</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.watch('transportationCar') === 'yes' && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="carType"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel>คุณใช้รถยนต์ประเภทใด?</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                                clearFieldError('carType');
                                                            }}
                                                            defaultValue={field.value}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="petrol" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">เบนซิน/แก๊สโซลีน</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="diesel" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">ดีเซล</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="hybrid" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">ไฮบริด</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="electric" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">ไฟฟ้า</FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="carMileage"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ระยะทางที่ขับรถต่อปี (กิโลเมตร)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(Number(e.target.value));
                                                                clearFieldError('carMileage');
                                                            }}
                                                            onFocus={() => clearFieldError('carMileage')}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        ระยะทางโดยประมาณที่คุณขับรถในแต่ละปี
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                                <FormField
                                    control={form.control}
                                    name="publicTransportFrequency"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>คุณใช้ระบบขนส่งสาธารณะบ่อยแค่ไหน?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('publicTransportFrequency');
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="never" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ไม่เคยหรือแทบไม่เคย</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="occasionally" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">บางครั้ง (1-3 วันต่อเดือน)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="regularly" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">เป็นประจำ (1-3 วันต่อสัปดาห์)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="daily" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ทุกวันหรือเกือบทุกวัน</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bikeWalkFrequency"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>คุณเดินหรือปั่นจักรยานแทนการใช้ยานพาหนะบ่อยแค่ไหน?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('bikeWalkFrequency');
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="never" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ไม่เคยหรือแทบไม่เคย</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="occasionally" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">บางครั้ง (1-3 วันต่อเดือน)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="regularly" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">เป็นประจำ (1-3 วันต่อสัปดาห์)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="daily" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ทุกวันหรือเกือบทุกวัน</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>

                            <TabsContent value="food" className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="dietType"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>อาหารของคุณเป็นแบบใด?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('dietType');
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="vegan" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">วีแกน (ไม่มีผลิตภัณฑ์จากสัตว์)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="vegetarian" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">มังสวิรัติ (ไม่มีเนื้อสัตว์ แต่รวมถึงนม/ไข่)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="pescatarian" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">เพสคาทาเรียน (มังสวิรัติรวมถึงปลา)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="flexitarian" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">เฟล็กซิทาเรียน (ส่วนใหญ่เป็นพืช แต่มีเนื้อสัตว์บางครั้ง)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="omnivore" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ออมนิวอร์ (บริโภคเนื้อสัตว์เป็นประจำ)</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="localFoodPercentage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>เปอร์เซ็นต์ของอาหารที่มาจากท้องถิ่น: {field.value}%</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    min={0}
                                                    max={100}
                                                    step={1}
                                                    defaultValue={[field.value]}
                                                    onValueChange={(vals) => {
                                                        field.onChange(vals[0]);
                                                        clearFieldError('localFoodPercentage');
                                                    }}
                                                    className="w-full"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                ประมาณเปอร์เซ็นต์ของอาหารที่คุณบริโภคซึ่งมาจากท้องถิ่น (ภายใน 100 กม.)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="foodWasteFrequency"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>คุณทิ้งอาหารที่ไม่ได้กินบ่อยแค่ไหน?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('foodWasteFrequency');
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="never" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ไม่เคยหรือแทบไม่เคย</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="sometimes" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">บางครั้ง</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="often" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">บ่อยครั้ง</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="very_often" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">บ่อยมาก</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>

                            <TabsContent value="lifestyle" className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="shoppingFrequency"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>คุณมีพฤติกรรมการซื้อของที่ไม่ใช่อาหารอย่างไร?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('shoppingFrequency');
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="minimal" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">น้อยที่สุด (ซื้อเฉพาะสิ่งที่จำเป็น)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="moderate" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ปานกลาง (ซื้อของเป็นครั้งคราว)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="frequent" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">บ่อยครั้ง (ซื้อของเป็นประจำ)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="extensive" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">มากมาย (การช้อปปิ้งเป็นงานอดิเรก)</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="recyclingHabit"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>คุณรีไซเคิลบ่อยแค่ไหน?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('recyclingHabit');
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="never" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">ไม่เคยหรือแทบไม่เคย</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="sometimes" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">บางครั้ง</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="often" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">บ่อยครั้ง</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="always" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">เสมอหรือเกือบเสมอ</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>

                            <TabsContent value="travel" className="space-y-6">
                                <div className="space-y-1 mb-4">
                                    <h3 className="text-lg font-medium">เที่ยวบินประจำปี</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        ป้อนจำนวนเที่ยวบินโดยประมาณที่คุณเดินทางในแต่ละปี
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="flightsShort"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>เที่ยวบินระยะสั้น (ต่ำกว่า 3 ชั่วโมง)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(Number(e.target.value));
                                                            clearFieldError('flightsShort');
                                                        }}
                                                        onFocus={() => clearFieldError('flightsShort')}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="flightsMedium"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>เที่ยวบินระยะกลาง (3-6 ชั่วโมง)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(Number(e.target.value));
                                                            clearFieldError('flightsMedium');
                                                        }}
                                                        onFocus={() => clearFieldError('flightsMedium')}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="flightsLong"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>เที่ยวบินระยะไกล (มากกว่า 6 ชั่วโมง)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(Number(e.target.value));
                                                            clearFieldError('flightsLong');
                                                        }}
                                                        onFocus={() => clearFieldError('flightsLong')}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <Separator className="my-6" />

                        <div className="flex justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                disabled={activeTab === formTabs[0].id}
                            >
                                กลับ
                            </Button>
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                            >
                                {activeTab === formTabs[formTabs.length - 1].id ? 'คำนวณ' : 'ถัดไป'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}