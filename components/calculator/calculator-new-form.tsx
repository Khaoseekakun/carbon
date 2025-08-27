"use client";

import { useEffect, useState } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { Home, Car, Utensils, ShoppingBag, Plane, Bike, TramFront } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { calculatorFormSchema } from '@/lib/schemas/calculator-schema';
import CalculatorResults from '@/components/calculator/calculator-results';
import axios from 'axios';
import { AirBrands, AirModels, CarBrands, CarModels, MotorcycleBrands, MotorcycleModels, PublicTransportTypes } from '@/lib/generated/prisma';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formTabs = [
    { id: 'home', label: 'บ้าน', icon: <Home className="mr-2 h-4 w-4" /> },
    { id: 'car', label: 'การใช้รถยนต์', icon: <Car className="mr-2 h-4 w-4" /> },
    { id: 'motorbike', label: 'การใช้รถมอเตอร์ไซค์', icon: <Bike className="mr-2 h-4 w-4" /> },
    { id: 'public', label: 'การใช้รถสาธารณะ', icon: <TramFront className="mr-2 h-4 w-4" /> },
    { id: 'travel', label: 'ท่องเที่ยว', icon: <Plane className="mr-2 h-4 w-4" /> },
];

export default function CalculatorNewForm() {
    const [activeTab, setActiveTab] = useState('home');
    const [showResults, setShowResults] = useState(false);
    const [progressPercentage, setProgressPercentage] = useState(20);
    const [carBrandList, setCarBrandList] = useState<CarBrands[]>([])
    const [carModelList, setCarModelList] = useState<CarModels[]>([])
    const [motorcycleBrandList, setmotorcycleBrandList] = useState<MotorcycleBrands[]>([])
    const [motorcycleModelList, setmotorcycleModelList] = useState<MotorcycleModels[]>([])
    const [airBrandList, setAirBrandList] = useState<AirBrands[]>([])
    const [airModelList, setAirModelList] = useState<AirModels[]>([])
    const [publicTransportList, setPublicTransportList] = useState<PublicTransportTypes[]>([])

    // Initialize form with react-hook-form and zod validation
    const form = useForm<z.infer<typeof calculatorFormSchema>>({
        resolver: zodResolver(calculatorFormSchema),
        defaultValues: {
            home_power_type: undefined,
            home_electricity_units_used: undefined,
            home_wood_burning_frequency: undefined,
            home_garbage_is_thrown_away: undefined,

            use_car_to_day: "no",
            car_brand: '',
            car_model: '',
            car_used_km: 0,

            use_motorcycle_to_day: 'no',
            motorcycle_brand: '',
            motorcycle_model: '',
            motorcycle_used_km: 0,

            use_public_transport: 'no',
            public_transport_used_km: 0,

            use_traverl_air: 'no',
            travel_air_brand: '',
            travel_air_model: '',
            travel_distance: 0,
        }

    });

    useEffect(() => {
        loadCarBrand()
        loadAirBrand()
        loadPublicTransport()
        loadMotorcycleBrand()
    }, [])

    // Handle form submission
    function onSubmit(values: z.infer<typeof calculatorFormSchema>) {
        console.log("show value")
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

    const loadCarBrand = async () => {
        try {
            const fetch_car = await axios.get('/api/car/brand')
            if (fetch_car.status == 200) {
                setCarBrandList(fetch_car.data.data)
            } else {

            }
        } catch (error) {

        }
    }

    const loadCardModels = async (brand_id: string) => {
        try {
            const fetch_car = await axios.get(`/api/car/brand/${brand_id}`)
            if (fetch_car.status == 200) {
                setCarModelList(fetch_car.data.data)
            } else {

            }
        } catch (error) {

        }
    }

    const loadMotorcycleBrand = async () => {
        try {
            const fetch_motorcycle = await axios.get('/api/motorcycle/brand')
            if (fetch_motorcycle.status == 200) {
                setmotorcycleBrandList(fetch_motorcycle.data.data)
            } else {

            }
        } catch (error) {

        }
    }

    const loadMotorcycledModels = async (brand_id: string) => {
        try {
            const fetch_motorcycle = await axios.get(`/api/motorcycle/brand/${brand_id}`)
            if (fetch_motorcycle.status == 200) {
                setmotorcycleModelList(fetch_motorcycle.data.data)
            } else {

            }
        } catch (error) {

        }
    }

    const loadAirBrand = async () => {
        try {
            const fetch_air = await axios.get('/api/air/brand')
            if (fetch_air.status == 200) {
                setAirBrandList(fetch_air.data.data)
            } else {

            }
        } catch (error) {

        }
    }

    const loadAirModels = async (brand_id: string) => {
        try {
            const fetch_air = await axios.get(`/api/air/brand/${brand_id}`)
            if (fetch_air.status == 200) {
                setAirModelList(fetch_air.data.data)
            } else {

            }
        } catch (error) {

        }
    }


    const loadPublicTransport = async () => {
        try {
            const fetch_car = await axios.get('/api/public-transport')
            if (fetch_car.status == 200) {
                setPublicTransportList(fetch_car.data.data)
            } else {

            }
        } catch (error) {

        }
    }

    // Handle "Next" button click with validation
    const handleNext = async () => {
        const currentIndex = formTabs.findIndex(tab => tab.id === activeTab);
        if (currentIndex < formTabs.length - 1) {
            const nextTab = formTabs[currentIndex + 1].id;
            handleTabChange(nextTab);
        } else {
            console.log("Submit")
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
        console.log("is show")
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
                                        name="home_power_type"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel>หลังงานหลักที่ใช้ในบ้านของคุณ?</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                            clearFieldError('home_power_type');
                                                        }}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="grid" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">พลังไฟฟ้า</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="renewable" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">พลังหมุนเวียน</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="mixed" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">พลังานแบบผสม</FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="home_electricity_units_used"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>หน่วยการใช้ไฟฟ้าของคุณวันนี้ (กิโลวัตต์)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(Number(e.target.value));
                                                            clearFieldError('home_electricity_units_used');
                                                        }}
                                                        onFocus={() => clearFieldError('home_electricity_units_used')}
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
                                    name="home_garbage_is_thrown_away"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ปริมาณการทิ้งขยะวันนี้ (กิโลกรัม)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(Number(e.target.value));
                                                        clearFieldError('home_garbage_is_thrown_away');
                                                    }}
                                                    onFocus={() => clearFieldError('home_garbage_is_thrown_away')}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="home_wood_burning_frequency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ปริมาณการเผาไม้วันนี้ (กิโลกรัม)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(Number(e.target.value));
                                                        clearFieldError('home_wood_burning_frequency');
                                                    }}
                                                    onFocus={() => clearFieldError('home_wood_burning_frequency')}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>

                            <TabsContent value="car" className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="use_car_to_day"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>วันนี้คุณได้เดินทางด้วยรถยนต์หรือไม่?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('use_car_to_day');
                                                    }}
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

                                {form.watch('use_car_to_day') === "yes" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="car_brand"
                                            render={({ field }) => (


                                                <FormItem>
                                                    <FormLabel>เลือกแบรนด์รถยนต์</FormLabel>
                                                    <FormControl>
                                                        <Select value={field.value} onValueChange={(v) => {
                                                            field.onChange(v)
                                                            loadCardModels(v)
                                                        }}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="เลือกแบรนด์รถยนต์" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    carBrandList.map((car) => (
                                                                        <SelectItem value={`${car.id}`}>{car.name}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>

                                            )}
                                        />

                                        {form.watch('car_brand') && (
                                            <FormField
                                                control={form.control}
                                                name="car_model"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>รุ่นรถยนต์</FormLabel>
                                                        <FormControl>
                                                            <Select value={field.value} onValueChange={(v) => {
                                                                field.onChange(v)
                                                            }}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="เลือกรุ่นรถยนต์" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {
                                                                        carModelList.map((car) => (
                                                                            <SelectItem value={`${car.id}`}>{car.name} | {car.cubic_centimeter} CC.</SelectItem>
                                                                        ))
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        <FormField
                                            control={form.control}
                                            name="car_used_km"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ระยะทางที่คุณเดินทาง (กิโลเมตร)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(Number(e.target.value));
                                                                clearFieldError('car_used_km');
                                                            }}
                                                            onFocus={() => clearFieldError('car_used_km')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}


                            </TabsContent>

                            <TabsContent value="motorbike" className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="use_motorcycle_to_day"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>วันนี้คุณได้เดินทางด้วยรถจักรยานยนต์หรือไม่?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('use_motorcycle_to_day');
                                                    }}
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

                                {form.watch('use_motorcycle_to_day') === "yes" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="motorcycle_brand"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>แบรนด์รถจักรยานยนต์</FormLabel>
                                                    <FormControl>
                                                        <Select value={field.value} onValueChange={(v) => {
                                                            field.onChange(v)
                                                            loadMotorcycledModels(v)
                                                        }}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="เลือกแบรนด์รถจักรยานยนต์" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    motorcycleBrandList.map((car) => (
                                                                        <SelectItem value={`${car.id}`}>{car.name}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>

                                            )}
                                        />

                                        {form.watch('motorcycle_brand') && (
                                            <FormField
                                                control={form.control}
                                                name="motorcycle_model"
                                                render={({ field }) => (

                                                    <FormItem>
                                                        <FormLabel>รุ่นรถจักรยานยนต์</FormLabel>
                                                        <FormControl>
                                                            <Select value={field.value} onValueChange={(v) => {
                                                                field.onChange(v)
                                                            }}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="เลือกรุ่นรถจักรยานยนต์" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {
                                                                        motorcycleModelList.map((car) => (
                                                                            <SelectItem value={`${car.id}`}>{car.name}</SelectItem>
                                                                        ))
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        <FormField
                                            control={form.control}
                                            name="motorcycle_used_km"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ระยะทางที่คุณเดินทาง (กิโลเมตร)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(Number(e.target.value));
                                                                clearFieldError('motorcycle_used_km');
                                                            }}
                                                            onFocus={() => clearFieldError('motorcycle_used_km')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}


                            </TabsContent>

                            <TabsContent value="travel" className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="use_traverl_air"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>วันนี้คุณได้เดินทางด้วยเครื่องบินหรือไม่?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('use_traverl_air');
                                                    }}
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

                                {form.watch('use_traverl_air') === "yes" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="travel_air_brand"
                                            render={({ field }) => (
                                                <Select value={field.value} onValueChange={(v) => {
                                                    field.onChange(v)
                                                    loadAirModels(v)
                                                }}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="เลือกสายการบิน" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            airBrandList.map((air) => (
                                                                <SelectItem value={`${air.id}`}>{air.name}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />

                                        {form.watch('travel_air_brand') && (
                                            <FormField
                                                control={form.control}
                                                name="travel_air_model"
                                                render={({ field }) => (
                                                    <Select value={field.value} onValueChange={(v) => {
                                                        field.onChange(v)
                                                    }}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="เลือกรุ่นของเครื่องบิน" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                airModelList.map((air) => (
                                                                    <SelectItem value={`${air.id}`}>{air.name}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        )}

                                        <FormField
                                            control={form.control}
                                            name="travel_distance"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ระยะทางที่คุณเดินทาง (กิโลเมตร)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(Number(e.target.value));
                                                                clearFieldError('travel_distance');
                                                            }}
                                                            onFocus={() => clearFieldError('travel_distance')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}


                            </TabsContent>
                            
                            <TabsContent value="public" className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="use_public_transport"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>วันนี้คุณได้เดินทางด้วยรถประจำทางหรือไม่?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        clearFieldError('use_car_to_day');
                                                    }}
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

                                {form.watch('use_public_transport') === "yes" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="public_transport_used_km"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ระยะทางที่คุณเดินทาง (กิโลเมตร)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(Number(e.target.value));
                                                                clearFieldError('car_used_km');
                                                            }}
                                                            onFocus={() => clearFieldError('car_used_km')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}


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