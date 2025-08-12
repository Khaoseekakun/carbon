import { z } from 'zod';

export const calculatorFormSchema = z.object({
  // Home
  home_power_type: z.enum(['grid', 'renewable', 'mixed'], {
    errorMap: () => ({ message: 'โปรดเลือกพลังานหลักที่ใช้ในบ้านของคุณ' })
  }),
  home_electricity_units_used: z.number().min(0, { message: 'กรุณาระบุบจำนวนหน่วยการใช้ไฟฟ้าของบ้าน' }),
  home_garbage_is_thrown_away: z.number().min(0, { message: 'กรุณาระบุปริมาณการทิ้งขยะ' }),
  home_wood_burning_frequency: z.number().min(0, { message: 'กรุณาระบุปริมาณการทิ้งขยะ' }),

  use_car_to_day : z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'โปรดระบุข้อมูลนี้' })
  }),

  car_used_km: z.number().default(0).optional(),
  car_brand: z.string().optional(),
  car_model: z.string().optional(),

  use_motorcycle_to_day : z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'โปรดระบุข้อมูลนี้' })
  }),
  motorcycle_brand: z.string().optional(),
  motorcycle_model: z.string().optional(),
  motorcycle_used_km: z.number().optional(),
  // Public Transport
  use_public_transport : z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'โปรดระบุข้อมูลนี้' })
  }),
  public_transport_used_km: z.number().default(0).optional(),

  // flight
  use_traverl_air: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'โปรดระบุข้อมูลนี้' })
  }),
  travel_air_brand: z.string().optional(),
  travel_air_model: z.string().optional(),
  travel_distance: z.number().default(0).optional(),

});

export type CalculatorFormValues = z.infer<typeof calculatorFormSchema>;