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
  { id: 'transportation', label: 'การเดินทาง', icon: <Car className="mr-2 h-4 w-4" /> },
  { id: 'food', label: 'อาหาร', icon: <Utensils className="mr-2 h-4 w-4" /> },
  { id: 'lifestyle', label: 'การใช้ชีวิต', icon: <ShoppingBag className="mr-2 h-4 w-4" /> },
  { id: 'travel', label: 'ท่องเที่ยว', icon: <Plane className="mr-2 h-4 w-4" /> },
];

export default function CalculatorForm() {
  const [activeTab, setActiveTab] = useState('home');
  const [showResults, setShowResults] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(20);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof calculatorFormSchema>>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      // Home
      homePeople: 1,
      homeSize: 100,
      homeEnergySource: 'grid',
      homeHeatingType: 'gas',
      renewablePercentage: 0,

      // Transportation
      transportationCar: 'no',
      carType: undefined,
      carMileage: 0,
      publicTransportFrequency: 'never',
      bikeWalkFrequency: 'never',

      // Food
      dietType: 'omnivore',
      localFoodPercentage: 50,
      foodWasteFrequency: 'sometimes',

      // Lifestyle
      shoppingFrequency: 'moderate',
      recyclingHabit: 'sometimes',

      // Travel
      flightsShort: 0,
      flightsMedium: 0,
      flightsLong: 0,
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

  // Handle "Next" button click
  const handleNext = () => {
    const currentIndex = formTabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < formTabs.length - 1) {
      const nextTab = formTabs[currentIndex + 1].id;
      handleTabChange(nextTab);
    } else {
      form.handleSubmit(onSubmit)();
    }
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
                          <Input type="number" min={1} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                          <Input type="number" min={10} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                          onValueChange={field.onChange}
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
                          onValueChange={field.onChange}
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
                            step={5}
                            defaultValue={[field.value ?? 0]}
                            onValueChange={(vals) => field.onChange(vals[0])}
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
                          onValueChange={field.onChange}
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
                              onValueChange={field.onChange}
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
                            <Input type="number" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                          onValueChange={field.onChange}
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
                          onValueChange={field.onChange}
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
                          onValueChange={field.onChange}
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
                          step={10}
                          defaultValue={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
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
                          onValueChange={field.onChange}
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
                          onValueChange={field.onChange}
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
                          onValueChange={field.onChange}
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
                          <Input type="number" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                          <Input type="number" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                          <Input type="number" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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