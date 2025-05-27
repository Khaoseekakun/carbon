"use client";

import React from 'react';
import { motion } from '@/lib/framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { value: '30+', label: 'Million Tonnes CO₂ Calculated' },
  { value: '500K+', label: 'Users Worldwide' },
  { value: '15%', label: 'Average Reduction Achieved' },
  { value: '120+', label: 'Countries Represented' },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Making a Global Impact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our global community of eco-conscious individuals and organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;