import { z } from 'zod';

export const calculatorFormSchema = z.object({
  // Home
  home_power_type: z.number().min(1, { message: 'กรุณาระบุระบบไฟฟ้าของบ้าน' }),
  home_electricity_units_used: z.number().min(10, { message: 'กรุณาระบุบจำนวนหน่วยการใช้ไฟฟ้าของบ้าน' }),
  home_gaebage_is_thrown_away: z.number().min(10, { message: 'กรุณาระบุบปริมาณการทิ้งขยะ' }),
  home_wood_burning_frequency: z.enum(['never', 'occasionally', 'regularly', 'daily'], {
    errorMap: () => ({ message: 'กรุณาเลือกความถี่การเผาไม้' })
  }),

  // Public Transport
  car_power_type: z.enum(['electric', 'oil', 'hybrid'], {
    errorMap: () => ({ message: 'ระบุประเภทพลังงานของพาหนะ' })
  }),

  car_oil_type: z.enum(['Diesel 91', 'Diesel 95', 'ALPHA-X', 'Gasohol E20', 'Gasohol E85', 'Bensin'], {
    errorMap: () => ({ message: 'ระบุประเภทน้ำมันของรถยนต์' })
  }).optional(),
  car_brand: z.string().min(1, { message: 'กรุณาระบุยี่ห้อรถยนต์' }).optional(),
  car_model: z.string().min(1, { message: 'กรุณาระบุรุ่นรถยนต์' }).optional(),

  motorcyle_brand: z.string().min(1, { message: 'กรุณาระบุยี่ห้อรถมอเตอร์ไซค์' }).optional(),
  motorcycle_model: z.string().min(1, { message: 'กรุณาระบุรุ่นรถมอเตอร์ไซค์' }).optional(),
  motorcycle_power_type: z.enum(['electric', 'oil', 'hybrid'], {
    errorMap: () => ({ message: 'ระบุประเภทพลังงานของรถมอเตอร์ไซค์' })
  }),

  motorcycle_oil_type: z.enum(['Bensin 91', 'Bensin 95', 'Gasohol 95', 'Gasohol 91', 'Gasohol 97', 'Gasohol E20', 'Gasohol E85'], {
    errorMap: () => ({ message: 'ระบุประเภทน้ำมันของรถมอเตอร์ไซค์' })
  }).optional(),
  motorcycle_used_km: z.number().min(1, { message: 'กรุณาระบุระยะทางการใช้รถมอเตอร์ไซค์' }).optional(),

  // flight
  use_traverl_air: z.number().min(1, { message: 'ระบุจำนวนการเดินทางของคุณวันนี้' }),
  travel_air_brand: z.string().optional(),
  travel_air_model: z.string().optional(),
  travel_distance: z.number().min(1, { message: 'กรุณาระบุระยะทางการเดินทาง' }),
  travel_transport_oil_type: z.enum(['SAF', 'AVGAS', 'Jet Fuel'], {
    errorMap: () => ({ message: 'ระบุประเภทน้ำมันของเครื่องบิน' })
  }),
});

export type CalculatorFormValues = z.infer<typeof calculatorFormSchema>;