import type { CalculatorFormValues } from '@/lib/schemas/calculator-schema';

export interface CarbonResults {
  homeEmissions: number;
  transportEmissions: number;
  foodEmissions: number;
  lifestyleEmissions: number;
  travelEmissions: number;
  totalEmissions: number;
  recommendations: Recommendation[];
}

interface Recommendation {
  title: string;
  description: string;
  potentialReduction: string;
}

// This is a simplified calculation model for demo purposes
// In a real application, these would be more scientifically accurate
export function calculateCarbonFootprint(data: CalculatorFormValues): CarbonResults {
  // Home emissions calculation
  let homeEmissions = calculateHomeEmissions(data);
  
  // Transportation emissions calculation
  let transportEmissions = calculateTransportEmissions(data);
  
  // Food emissions calculation
  let foodEmissions = calculateFoodEmissions(data);
  
  // Lifestyle emissions calculation
  let lifestyleEmissions = calculateLifestyleEmissions(data);
  
  // Travel emissions calculation
  let travelEmissions = calculateTravelEmissions(data);
  
  // Calculate total emissions
  const totalEmissions = homeEmissions + transportEmissions + foodEmissions + lifestyleEmissions + travelEmissions;
  
  // Generate recommendations based on the highest emissions categories
  const recommendations = generateRecommendations(data, {
    homeEmissions,
    transportEmissions,
    foodEmissions,
    lifestyleEmissions,
    travelEmissions,
    totalEmissions,
    recommendations: []
  });
  
  return {
    homeEmissions,
    transportEmissions,
    foodEmissions,
    lifestyleEmissions,
    travelEmissions,
    totalEmissions,
    recommendations
  };
}

function calculateHomeEmissions(data: CalculatorFormValues): number {
  const baseEmissions = data.homeSize * 20; // Base emissions per square meter per year
  
  // Adjust for number of people (more people = more efficient per person)
  const peopleAdjustment = 1 / Math.sqrt(data.homePeople);
  
  // Adjust for energy source
  let energySourceFactor = 1;
  if (data.homeEnergySource === 'renewable') {
    energySourceFactor = 0.2;
  } else if (data.homeEnergySource === 'mixed') {
    energySourceFactor = 0.6 - (data.renewablePercentage || 0) / 100 * 0.4;
  }
  
  // Adjust for heating type
  let heatingFactor = 1;
  switch (data.homeHeatingType) {
    case 'gas':
      heatingFactor = 1;
      break;
    case 'oil':
      heatingFactor = 1.2;
      break;
    case 'electric':
      heatingFactor = data.homeEnergySource === 'renewable' ? 0.4 : 0.9;
      break;
    case 'heatpump':
      heatingFactor = 0.3;
      break;
  }
  
  return baseEmissions * peopleAdjustment * energySourceFactor * heatingFactor;
}

function calculateTransportEmissions(data: CalculatorFormValues): number {
  let emissions = 0;
  
  // Car emissions
  if (data.transportationCar === 'yes' && data.carType && data.carMileage) {
    let emissionFactor = 0;
    switch (data.carType) {
      case 'petrol':
        emissionFactor = 0.2; // kg CO2e per km
        break;
      case 'diesel':
        emissionFactor = 0.18;
        break;
      case 'hybrid':
        emissionFactor = 0.1;
        break;
      case 'electric':
        emissionFactor = 0.05;
        break;
    }
    emissions += data.carMileage * emissionFactor;
  }
  
  // Public transport emissions
  let publicTransportEmissions = 0;
  switch (data.publicTransportFrequency) {
    case 'never':
      publicTransportEmissions = 0;
      break;
    case 'occasionally':
      publicTransportEmissions = 200;
      break;
    case 'regularly':
      publicTransportEmissions = 600;
      break;
    case 'daily':
      publicTransportEmissions = 1200;
      break;
  }
  
  // Adjust public transport emissions based on biking/walking frequency
  let bikeWalkFactor = 1;
  switch (data.bikeWalkFrequency) {
    case 'never':
      bikeWalkFactor = 1;
      break;
    case 'occasionally':
      bikeWalkFactor = 0.9;
      break;
    case 'regularly':
      bikeWalkFactor = 0.7;
      break;
    case 'daily':
      bikeWalkFactor = 0.4;
      break;
  }
  
  emissions += publicTransportEmissions * bikeWalkFactor;
  
  return emissions;
}

function calculateFoodEmissions(data: CalculatorFormValues): number {
  // Base emissions by diet type
  let baseEmissions = 0;
  switch (data.dietType) {
    case 'vegan':
      baseEmissions = 700;
      break;
    case 'vegetarian':
      baseEmissions = 1200;
      break;
    case 'pescatarian':
      baseEmissions = 1500;
      break;
    case 'flexitarian':
      baseEmissions = 1800;
      break;
    case 'omnivore':
      baseEmissions = 2500;
      break;
  }
  
  // Adjust for local food percentage (local food reduces emissions)
  const localFoodFactor = 1 - ((data.localFoodPercentage - 50) / 100) * 0.2;
  
  // Adjust for food waste
  let wasteFactors: Record<string, number> = {
    'never': 0.8,
    'sometimes': 1,
    'often': 1.2,
    'very_often': 1.4
  };
  
  const wasteFactor = wasteFactors[data.foodWasteFrequency];
  
  return baseEmissions * localFoodFactor * wasteFactor;
}

function calculateLifestyleEmissions(data: CalculatorFormValues): number {
  // Base emissions by shopping frequency
  let baseEmissions = 0;
  switch (data.shoppingFrequency) {
    case 'minimal':
      baseEmissions = 500;
      break;
    case 'moderate':
      baseEmissions = 1000;
      break;
    case 'frequent':
      baseEmissions = 1500;
      break;
    case 'extensive':
      baseEmissions = 2200;
      break;
  }
  
  // Adjust for recycling habits
  let recyclingFactors: Record<string, number> = {
    'never': 1.3,
    'sometimes': 1.1,
    'often': 0.9,
    'always': 0.7
  };
  
  const recyclingFactor = recyclingFactors[data.recyclingHabit];
  
  return baseEmissions * recyclingFactor;
}

function calculateTravelEmissions(data: CalculatorFormValues): number {
  // Flight emissions
  const shortFlightEmissions = data.flightsShort * 500; // kg CO2e per short flight
  const mediumFlightEmissions = data.flightsMedium * 1200; // kg CO2e per medium flight
  const longFlightEmissions = data.flightsLong * 2500; // kg CO2e per long flight
  
  return shortFlightEmissions + mediumFlightEmissions + longFlightEmissions;
}

function generateRecommendations(data: CalculatorFormValues, results: CarbonResults): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // Create an array of emission categories sorted by impact
  const categories = [
    { name: 'home', emissions: results.homeEmissions },
    { name: 'transport', emissions: results.transportEmissions },
    { name: 'food', emissions: results.foodEmissions },
    { name: 'lifestyle', emissions: results.lifestyleEmissions },
    { name: 'travel', emissions: results.travelEmissions }
  ].sort((a, b) => b.emissions - a.emissions);
  
  // Generate recommendations for the top 3 emission categories
  for (let i = 0; i < Math.min(3, categories.length); i++) {
    const category = categories[i];
    
    switch (category.name) {
      case 'home':
        if (data.homeEnergySource === 'grid') {
          recommendations.push({
            title: 'Switch to Renewable Energy',
            description: 'Consider switching to a renewable energy provider for your home electricity.',
            potentialReduction: 'Up to 60% reduction in home emissions'
          });
        }
        
        if (data.homeHeatingType === 'oil' || data.homeHeatingType === 'gas') {
          recommendations.push({
            title: 'Upgrade Your Heating System',
            description: 'Consider switching to a heat pump or more efficient heating system.',
            potentialReduction: 'Up to 70% reduction in heating emissions'
          });
        }
        
        recommendations.push({
          title: 'Improve Home Insulation',
          description: 'Better insulation can significantly reduce the energy needed to heat and cool your home.',
          potentialReduction: '20-30% reduction in home energy use'
        });
        break;
        
      case 'transport':
        if (data.transportationCar === 'yes' && (data.carType === 'petrol' || data.carType === 'diesel')) {
          recommendations.push({
            title: 'Consider an Electric or Hybrid Vehicle',
            description: 'When you next change your car, an electric or hybrid model will significantly reduce your emissions.',
            potentialReduction: 'Up to 70% reduction in vehicle emissions'
          });
        }
        
        if (data.bikeWalkFrequency === 'never' || data.bikeWalkFrequency === 'occasionally') {
          recommendations.push({
            title: 'Walk or Cycle for Short Trips',
            description: 'Replace short car journeys with walking or cycling when possible.',
            potentialReduction: '10-20% reduction in transport emissions'
          });
        }
        
        if (data.publicTransportFrequency === 'never' || data.publicTransportFrequency === 'occasionally') {
          recommendations.push({
            title: 'Use Public Transportation More Often',
            description: 'Using buses, trains or other public transport reduces your carbon footprint compared to driving alone.',
            potentialReduction: '30-40% reduction in commuting emissions'
          });
        }
        break;
        
      case 'food':
        if (data.dietType === 'omnivore') {
          recommendations.push({
            title: 'Reduce Meat Consumption',
            description: 'Try having one or more meat-free days each week to reduce your food emissions.',
            potentialReduction: '20-30% reduction in food emissions'
          });
        }
        
        if (data.localFoodPercentage < 70) {
          recommendations.push({
            title: 'Buy More Local and Seasonal Food',
            description: "Food that doesn't travel far has a lower carbon footprint. Shop at farmers markets or join a CSA.",
            potentialReduction: '10-15% reduction in food emissions'
          });
        }
        
        if (data.foodWasteFrequency === 'often' || data.foodWasteFrequency === 'very_often') {
          recommendations.push({
            title: 'Reduce Food Waste',
            description: 'Plan meals, store food properly, and use leftovers to reduce the amount of food you throw away.',
            potentialReduction: 'Up to 25% reduction in food emissions'
          });
        }
        break;
        
      case 'lifestyle':
        if (data.shoppingFrequency === 'frequent' || data.shoppingFrequency === 'extensive') {
          recommendations.push({
            title: 'Practice Mindful Consumption',
            description: 'Before buying something new, consider if you really need it and if there are second-hand options.',
            potentialReduction: '20-40% reduction in consumption emissions'
          });
        }
        
        if (data.recyclingHabit === 'never' || data.recyclingHabit === 'sometimes') {
          recommendations.push({
            title: 'Improve Recycling Habits',
            description: 'Set up a convenient recycling system at home and learn what can be recycled in your area.',
            potentialReduction: 'Up to 30% reduction in waste emissions'
          });
        }
        break;
        
      case 'travel':
        if (data.flightsLong > 0 || data.flightsMedium > 1) {
          recommendations.push({
            title: 'Reduce Air Travel',
            description: 'Consider alternatives to flying or combine trips to reduce the number of flights you take.',
            potentialReduction: 'Each long-haul flight avoided saves ~2500kg CO₂e'
          });
        }
        
        recommendations.push({
          title: 'Offset Your Essential Flights',
          description: "For flights you can't avoid, consider purchasing high-quality carbon offsets.",
          potentialReduction: 'Up to 100% offset of flight emissions'
        });
        break;
    }
  }
  
  // Add general recommendations if we don't have enough specific ones
  if (recommendations.length < 4) {
    recommendations.push({
      title: 'Switch to Energy-Efficient Appliances',
      description: 'When replacing appliances, choose those with high energy efficiency ratings.',
      potentialReduction: '10-40% reduction in appliance energy use'
    });
    
    recommendations.push({
      title: 'Install Smart Home Technology',
      description: 'Smart thermostats and energy monitors can help optimize your energy use.',
      potentialReduction: '10-15% reduction in home energy use'
    });
  }
  
  // Limit to 6 recommendations
  return recommendations.slice(0, 6);
}