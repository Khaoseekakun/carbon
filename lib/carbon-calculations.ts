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
// All emissions are calculated as daily values (kg CO₂e per day)
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
  
  const annualEmissions = baseEmissions * peopleAdjustment * energySourceFactor * heatingFactor;
  return annualEmissions / 365; // Convert to daily emissions
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
    const dailyCarEmissions = (data.carMileage * emissionFactor) / 365; // Convert annual to daily
    emissions += dailyCarEmissions;
  }
  
  // Public transport emissions
  let publicTransportEmissions = 0;
  switch (data.publicTransportFrequency) {
    case 'never':
      publicTransportEmissions = 0;
      break;
    case 'occasionally':
      publicTransportEmissions = 200 / 365; // Convert annual to daily
      break;
    case 'regularly':
      publicTransportEmissions = 600 / 365; // Convert annual to daily
      break;
    case 'daily':
      publicTransportEmissions = 1200 / 365; // Convert annual to daily
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
  // Base emissions by diet type (annual values)
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
  
  const annualEmissions = baseEmissions * localFoodFactor * wasteFactor;
  return annualEmissions / 365; // Convert to daily emissions
}

function calculateLifestyleEmissions(data: CalculatorFormValues): number {
  // Base emissions by shopping frequency (annual values)
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
  
  const annualEmissions = baseEmissions * recyclingFactor;
  return annualEmissions / 365; // Convert to daily emissions
}

function calculateTravelEmissions(data: CalculatorFormValues): number {
  // Flight emissions (convert annual flights to daily average)
  const shortFlightEmissions = (data.flightsShort * 500) / 365; // kg CO2e per day
  const mediumFlightEmissions = (data.flightsMedium * 1200) / 365; // kg CO2e per day
  const longFlightEmissions = (data.flightsLong * 2500) / 365; // kg CO2e per day
  
  return shortFlightEmissions + mediumFlightEmissions + longFlightEmissions;
}

function generateRecommendations(data: CalculatorFormValues, results: CarbonResults): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  const categories = [
    { name: 'home', emissions: results.homeEmissions },
    { name: 'transport', emissions: results.transportEmissions },
    { name: 'food', emissions: results.foodEmissions },
    { name: 'lifestyle', emissions: results.lifestyleEmissions },
    { name: 'travel', emissions: results.travelEmissions }
  ].sort((a, b) => b.emissions - a.emissions);
  
  for (let i = 0; i < Math.min(3, categories.length); i++) {
    const category = categories[i];
    
    switch (category.name) {
      case 'home':
        if (data.homeEnergySource === 'grid') {
          recommendations.push({
            title: 'เปลี่ยนไปใช้พลังงานหมุนเวียน',
            description: 'ลองเปลี่ยนไปใช้ผู้ให้บริการไฟฟ้าพลังงานหมุนเวียนสำหรับบ้านของคุณ',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากบ้านได้สูงสุด 60% ต่อวัน'
          });
        }
        
        if (data.homeHeatingType === 'oil' || data.homeHeatingType === 'gas') {
          recommendations.push({
            title: 'อัปเกรดระบบทำความร้อนในบ้าน',
            description: 'ลองเปลี่ยนไปใช้ปั๊มความร้อนหรือระบบทำความร้อนที่มีประสิทธิภาพมากขึ้น',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากการทำความร้อนได้สูงสุด 70% ต่อวัน'
          });
        }
        
        recommendations.push({
          title: 'ปรับปรุงฉนวนกันความร้อนในบ้าน',
          description: 'ฉนวนกันความร้อนที่ดีขึ้นช่วยลดพลังงานที่ใช้ในการทำความร้อนและความเย็นในบ้านได้มาก',
          potentialReduction: 'ลดการใช้พลังงานในบ้านได้ 20-30% ต่อวัน'
        });
        break;
        
      case 'transport':
        if (data.transportationCar === 'yes' && (data.carType === 'petrol' || data.carType === 'diesel')) {
          recommendations.push({
            title: 'พิจารณาใช้รถยนต์ไฟฟ้าหรือไฮบริด',
            description: 'เมื่อเปลี่ยนรถคันใหม่ ลองเลือกใช้รถยนต์ไฟฟ้าหรือไฮบริดเพื่อลดการปล่อยคาร์บอน',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากรถยนต์ได้สูงสุด 70% ต่อวัน'
          });
        }
        
        if (data.bikeWalkFrequency === 'never' || data.bikeWalkFrequency === 'occasionally') {
          recommendations.push({
            title: 'เดินหรือปั่นจักรยานสำหรับการเดินทางระยะสั้น',
            description: 'เปลี่ยนการเดินทางระยะสั้นจากการขับรถเป็นการเดินหรือปั่นจักรยานเมื่อเป็นไปได้',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากการเดินทางได้ 10-20% ต่อวัน'
          });
        }
        
        if (data.publicTransportFrequency === 'never' || data.publicTransportFrequency === 'occasionally') {
          recommendations.push({
            title: 'ใช้ขนส่งสาธารณะบ่อยขึ้น',
            description: 'การใช้รถโดยสาร รถไฟ หรือขนส่งสาธารณะอื่น ๆ ช่วยลดคาร์บอนฟุตพริ้นท์เมื่อเทียบกับการขับรถคนเดียว',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากการเดินทางประจำวันได้ 30-40%'
          });
        }
        break;
        
      case 'food':
        if (data.dietType === 'omnivore') {
          recommendations.push({
            title: 'ลดการบริโภคเนื้อสัตว์',
            description: 'ลองมีวันปลอดเนื้อสัตว์สัปดาห์ละหนึ่งวันหรือมากกว่าเพื่อลดการปล่อยคาร์บอนจากอาหาร',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากอาหารได้ 20-30% ต่อวัน'
          });
        }
        
        if (data.localFoodPercentage < 70) {
          recommendations.push({
            title: 'เลือกซื้ออาหารท้องถิ่นและตามฤดูกาลมากขึ้น',
            description: 'อาหารที่เดินทางมาสั้นกว่ามีคาร์บอนฟุตพริ้นท์ต่ำกว่า ลองซื้อที่ตลาดเกษตรกรหรือเข้าร่วมโครงการ CSA',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากอาหารได้ 10-15% ต่อวัน'
          });
        }
        
        if (data.foodWasteFrequency === 'often' || data.foodWasteFrequency === 'very_often') {
          recommendations.push({
            title: 'ลดขยะอาหาร',
            description: 'วางแผนมื้ออาหาร เก็บอาหารอย่างเหมาะสม และใช้ของเหลือเพื่อลดขยะอาหาร',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากอาหารได้สูงสุด 25% ต่อวัน'
          });
        }
        break;
        
      case 'lifestyle':
        if (data.shoppingFrequency === 'frequent' || data.shoppingFrequency === 'extensive') {
          recommendations.push({
            title: 'บริโภคอย่างมีสติ',
            description: 'ก่อนซื้อของใหม่ ลองพิจารณาว่าจำเป็นจริงหรือไม่ และมีตัวเลือกมือสองหรือไม่',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากการบริโภคได้ 20-40% ต่อวัน'
          });
        }
        
        if (data.recyclingHabit === 'never' || data.recyclingHabit === 'sometimes') {
          recommendations.push({
            title: 'ปรับปรุงนิสัยการรีไซเคิล',
            description: 'จัดระบบรีไซเคิลที่บ้านให้สะดวก และศึกษาว่าสิ่งใดรีไซเคิลได้ในพื้นที่ของคุณ',
            potentialReduction: 'ลดการปล่อยคาร์บอนจากขยะได้สูงสุด 30% ต่อวัน'
          });
        }
        break;
        
      case 'travel':
        if (data.flightsLong > 0 || data.flightsMedium > 1) {
          recommendations.push({
            title: 'ลดการเดินทางด้วยเครื่องบิน',
            description: 'ลองหาทางเลือกอื่นแทนการบิน หรือรวมทริปเพื่อให้บินน้อยลง',
            potentialReduction: 'หลีกเลี่ยงเที่ยวบินระยะไกล 1 เที่ยว ช่วยลดคาร์บอนได้ ~6.8 กก. CO₂e ต่อวัน'
          });
        }
        
        recommendations.push({
          title: 'ชดเชยคาร์บอนจากเที่ยวบินที่จำเป็น',
          description: 'สำหรับเที่ยวบินที่หลีกเลี่ยงไม่ได้ ลองซื้อคาร์บอนเครดิตคุณภาพสูงเพื่อชดเชย',
          potentialReduction: 'ชดเชยคาร์บอนจากการบินได้สูงสุด 100% ต่อวัน'
        });
        break;
    }
  }
  
  // เพิ่มคำแนะนำทั่วไปหากยังมีไม่เพียงพอ
  if (recommendations.length < 4) {
    recommendations.push({
      title: 'เปลี่ยนไปใช้อุปกรณ์ไฟฟ้าประหยัดพลังงาน',
      description: 'เมื่อเปลี่ยนอุปกรณ์ไฟฟ้าใหม่ ควรเลือกที่มีฉลากประหยัดพลังงาน',
      potentialReduction: 'ลดการใช้พลังงานจากเครื่องใช้ไฟฟ้าได้ 10-40% ต่อวัน'
    });
    
    recommendations.push({
      title: 'ติดตั้งเทคโนโลยีสมาร์ทโฮม',
      description: 'เทอร์โมสตัทอัจฉริยะและอุปกรณ์ตรวจสอบพลังงานช่วยให้ใช้พลังงานอย่างมีประสิทธิภาพ',
      potentialReduction: 'ลดการใช้พลังงานในบ้านได้ 10-15% ต่อวัน'
    });
  }
  // Limit to 6 recommendations
  return recommendations.slice(0, 6);
}