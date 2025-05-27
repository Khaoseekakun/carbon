import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-full">
      <CardContent className="p-6 flex flex-col items-center text-center h-full">
        <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;