import { z } from 'zod';

export const calculatorFormSchema = z.object({
  // Home
  homePeople: z.number().min(1, { message: 'At least 1 person required' }),
  homeSize: z.number().min(10, { message: 'Please enter a valid home size' }),
  homeEnergySource: z.enum(['grid', 'renewable', 'mixed']),
  homeHeatingType: z.enum(['gas', 'oil', 'electric', 'heatpump']),
  renewablePercentage: z.number().min(0).max(100).optional(),
  
  // Transportation
  transportationCar: z.enum(['yes', 'no']),
  carType: z.enum(['petrol', 'diesel', 'hybrid', 'electric']).optional(),
  carMileage: z.number().min(0).optional(),
  publicTransportFrequency: z.enum(['never', 'occasionally', 'regularly', 'daily']),
  bikeWalkFrequency: z.enum(['never', 'occasionally', 'regularly', 'daily']),
  
  // Food
  dietType: z.enum(['vegan', 'vegetarian', 'pescatarian', 'flexitarian', 'omnivore']),
  localFoodPercentage: z.number().min(0).max(100),
  foodWasteFrequency: z.enum(['never', 'sometimes', 'often', 'very_often']),
  
  // Lifestyle
  shoppingFrequency: z.enum(['minimal', 'moderate', 'frequent', 'extensive']),
  recyclingHabit: z.enum(['never', 'sometimes', 'often', 'always']),
  
  // Travel
  flightsShort: z.number().min(0),
  flightsMedium: z.number().min(0),
  flightsLong: z.number().min(0),
});

export type CalculatorFormValues = z.infer<typeof calculatorFormSchema>;