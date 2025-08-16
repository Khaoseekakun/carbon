import type { CalculatorFormValues } from '@/lib/schemas/calculator-schema';
import axios from 'axios';
import { AirModels, CarModels, MotorcycleModels } from './generated/prisma';

export interface CarbonResults {
  homeEmissions: number;
  carEmissions: number;
  motorcycleEmission: number;
  transportEmission: number;
  travelEmissions: number;
  totalEmissions: number;
}

// This is a simplified calculation model for demo purposes
// In a real application, these would be more scientifically accurate
// All emissions are calculated as daily values (kg CO₂e per day)
export async function calculateCarbonFootprint(data: CalculatorFormValues): Promise<CarbonResults> {

  let { total_per_day } = calculateHomeEmissions(data);
  let car = await calculateCarEmissions(data)
  let motorcycle = await calculateMotorEmissions(data)
  let public_transport = await calculatePublicEmissions(data)
  let travel = await calculateTravelEmissions(data)

  // Calculate total emissions
  const totalEmissions = total_per_day + car + motorcycle + public_transport + travel;

  // Generate recommendations based on the highest emissions categories

  return {
    homeEmissions: total_per_day,
    carEmissions: car,
    transportEmission: public_transport,
    travelEmissions: travel,
    totalEmissions,
    motorcycleEmission: motorcycle
  };
}

interface DataInterface {
  home_power_type: "grid" | "renewable" | "mixed"
  home_electricity_units_used: number
  home_wood_burning_frequency: number
  home_garbage_is_thrown_away: number
  use_car_to_day: "yes" | "no"
  car_brand: string
  car_model: string
  car_used_km: number
  use_motorcycle_to_day: "yes" | "no"
  motorcycle_brand: string
  motorcycle_model: string
  motorcycle_used_km: number
  use_public_transport: "yes" | "no"
  public_transport_used_km: number
  use_traverl_air: "yes" | "no"
  travel_air_brand: string
  travel_air_model: string
  travel_distance: number
}

function calculateHomeEmissions(data: CalculatorFormValues) {
  const emissionFactors = {
    grid: 0.514,
    renewable: 0.05,
    mixed: 0.3,
  };

  const woodEmissionFactor = 1.6; // kgCO₂e per kg wood burned
  const garbageEmissionFactor = 1.9; // kgCO₂e per kg garbage

  const daysInMonth = 30;

  // ⚡ คาร์บอนจากไฟฟ้า (เฉลี่ยต่อวัน)
  const dailyElectricityEmission =
    (data.home_electricity_units_used * emissionFactors[data.home_power_type]) /
    daysInMonth;

  // 🔥 คาร์บอนจากการเผาไม้ (เฉลี่ยต่อวัน)
  const dailyWoodEmission =
    (data.home_wood_burning_frequency * woodEmissionFactor) / daysInMonth;

  // 🗑️ คาร์บอนจากการทิ้งขยะ (เฉลี่ยต่อวัน)
  const dailyGarbageEmission =
    (data.home_garbage_is_thrown_away * garbageEmissionFactor) / daysInMonth;

  const totalDailyEmission =
    dailyElectricityEmission + dailyWoodEmission + dailyGarbageEmission;

  return {
    electricity_per_day: dailyElectricityEmission,
    wood_per_day: dailyWoodEmission,
    garbage_per_day: dailyGarbageEmission,
    total_per_day: totalDailyEmission,
  };
}


function estimateFuelEfficiency(cc: number | null): number {
  if (!cc || cc <= 0) return 40;

  const baseEfficiency = 60;     // best case (small motorcycle)
  const scalingFactor = 200;     // determines how fast efficiency drops

  let efficiency = baseEfficiency - cc / scalingFactor;

  // Enforce minimum efficiency
  if (efficiency < 2) efficiency = 2;

  return Number(efficiency.toFixed(2));
}

async function calculateCarEmissions(
  data: CalculatorFormValues
): Promise<number> {
  if (data.use_car_to_day !== 'yes') return 0;

  try {
    const res = await axios.get(`/api/car/brand/${data.car_brand}/${data.car_model}`);
    if (!res?.data?.success) return 0;

    const car = res.data.data as CarModels;
    const distancePerDay = data.car_used_km ?? 0;

    let emission = 0;

    if (car.power_type === 'oil' && car.oil_carbon_per_unit) {
      const fuelEfficiency = estimateFuelEfficiency(car.cubic_centimeter);
      const fuelUsed = distancePerDay / fuelEfficiency;
      emission = fuelUsed * car.oil_carbon_per_unit;

    } else if (car.power_type === 'electric' && car.electric_carbon_per_unit) {
      const electricEfficiency = 6; // km/kWh for average EV
      const kWhUsed = distancePerDay / electricEfficiency;
      emission = kWhUsed * car.electric_carbon_per_unit;
    }

    return Number(emission.toFixed(3)); // kgCO₂e
  } catch (error) {
    console.error('Car emission calculation failed:', error);
    return 0;
  }
}

export async function calculateMotorEmissions(data: CalculatorFormValues): Promise<number> {
  if (data.use_motorcycle_to_day !== 'yes') return 0;

  try {
    const res = await axios.get(`/api/motorcycle/brand/${data.motorcycle_brand}/${data.motorcycle_model}`);
    if (!res?.data?.success) return 0;

    const motor = res.data.data as MotorcycleModels;
    const distancePerDay = data.motorcycle_used_km ?? 0; // กำหนดระยะทางขับขี่ต่อวันเป็น 20 กม. (หรือรับจากฟอร์มก็ได้)
    if (!motor.oil_carbon_per_unit) return 0;

    const emission = distancePerDay * motor.oil_carbon_per_unit;
    return Number(emission.toFixed(3));
  } catch (err) {
    console.error('Motorcycle emission calculation failed:', err);
    return 0;
  }
}

// ✅ ขนส่งสาธารณะ
export async function calculatePublicEmissions(data: CalculatorFormValues): Promise<number> {
  if (data.use_public_transport !== 'yes') return 0;

  const carbonFactorPerKm = 0.105; // kgCO₂e/km สำหรับรถเมล์ / BTS โดยเฉลี่ย
  const distance = data.public_transport_used_km ?? 0;
  const emission = distance * carbonFactorPerKm;

  return Number(emission.toFixed(3));
}

// ✅ การเดินทางโดยเครื่องบิน
export async function calculateTravelEmissions(data: CalculatorFormValues): Promise<number> {
  if (data.use_traverl_air !== 'yes') return 0;

  try {
    const res = await axios.get(`/api/air/brand/${data.motorcycle_brand}/${data.motorcycle_model}`);
    if (!res?.data?.success) return 0;

    const flight = res.data.data as AirModels;
    const distance = data.travel_distance ?? 0;
    if (!flight.oil_carbon_per_unit) return 0;

    const emission = distance * flight.oil_carbon_per_unit;
    return Number(emission.toFixed(3));
  } catch (err) {
    console.error('Air travel emission calculation failed:', err);
    return 0;
  }
}