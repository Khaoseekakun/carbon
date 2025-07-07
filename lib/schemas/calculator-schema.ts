import { z } from 'zod';

export const calculatorFormSchema = z.object({
  // Home
  homePeople: z.number().min(1, { message: 'กรุณาระบุจำนวนสมาชิกอย่างน้อย 1 คน' }),
  homeSize: z.number().min(10, { message: 'กรุณาระบุขนาดบ้านที่ถูกต้อง' }),
  homeEnergySource: z.enum(['grid', 'renewable', 'mixed'], { 
    errorMap: () => ({ message: 'กรุณาเลือกแหล่งพลังงานหลัก' }) 
  }),
  homeHeatingType: z.enum(['gas', 'oil', 'electric', 'heatpump'], { 
    errorMap: () => ({ message: 'กรุณาเลือกแหล่งพลังงานสำหรับทำความร้อน' }) 
  }),
  renewablePercentage: z.number().min(0).max(100, { message: 'กรุณาระบุเปอร์เซ็นต์ระหว่าง 0-100' }).optional(),
  
  // Transportation
  transportationCar: z.enum(['yes', 'no'], { 
    errorMap: () => ({ message: 'กรุณาเลือกว่าคุณมีรถยนต์หรือไม่' }) 
  }),
  carType: z.enum(['petrol', 'diesel', 'hybrid', 'electric'], { 
    errorMap: () => ({ message: 'กรุณาเลือกประเภทรถยนต์' }) 
  }).optional(),
  carMileage: z.number().min(0, { message: 'กรุณาระบุระยะทางที่ถูกต้อง' }).optional(),
  publicTransportFrequency: z.enum(['never', 'occasionally', 'regularly', 'daily'], { 
    errorMap: () => ({ message: 'กรุณาเลือกความถี่การใช้ขนส่งสาธารณะ' }) 
  }),
  bikeWalkFrequency: z.enum(['never', 'occasionally', 'regularly', 'daily'], { 
    errorMap: () => ({ message: 'กรุณาเลือกความถี่การเดิน/ปั่นจักรยาน' }) 
  }),
  
  // Food
  dietType: z.enum(['vegan', 'vegetarian', 'pescatarian', 'flexitarian', 'omnivore'], { 
    errorMap: () => ({ message: 'กรุณาเลือกประเภทอาหาร' }) 
  }),
  localFoodPercentage: z.number().min(0).max(100, { message: 'กรุณาระบุเปอร์เซ็นต์ระหว่าง 0-100' }),
  foodWasteFrequency: z.enum(['never', 'sometimes', 'often', 'very_often'], { 
    errorMap: () => ({ message: 'กรุณาเลือกความถี่การทิ้งอาหาร' }) 
  }),
  
  // Lifestyle
  shoppingFrequency: z.enum(['minimal', 'moderate', 'frequent', 'extensive'], { 
    errorMap: () => ({ message: 'กรุณาเลือกความถี่การซื้อของ' }) 
  }),
  recyclingHabit: z.enum(['never', 'sometimes', 'often', 'always'], { 
    errorMap: () => ({ message: 'กรุณาเลือกความถี่การรีไซเคิล' }) 
  }),
  
  // Travel
  flightsShort: z.number().min(0, { message: 'กรุณาระบุจำนวนเที่ยวบินที่ถูกต้อง' }),
  flightsMedium: z.number().min(0, { message: 'กรุณาระบุจำนวนเที่ยวบินที่ถูกต้อง' }),
  flightsLong: z.number().min(0, { message: 'กรุณาระบุจำนวนเที่ยวบินที่ถูกต้อง' }),
});

export type CalculatorFormValues = z.infer<typeof calculatorFormSchema>;