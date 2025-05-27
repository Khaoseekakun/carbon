"use client";

import React from 'react';
import { motion } from '@/lib/framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "I've been tracking my carbon footprint for 6 months now, and the insights have completely changed how I make everyday decisions. I've reduced my footprint by 25%!",
    author: "Sarah Johnson",
    role: "Marketing Director",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    quote: "As a business owner, this tool helped me identify key areas where we could reduce our environmental impact while actually saving money on operational costs.",
    author: "Michael Chen",
    role: "Small Business Owner",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    quote: "The breakdown of my carbon footprint was eye-opening. It made the abstract concept of climate change so much more personal and actionable.",
    author: "Emma Rodriguez",
    role: "Teacher",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from people who have used our calculator to make a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-green-100 dark:border-green-900/30 shadow-sm">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-6">
                    <svg width="45" height="36" className="text-green-200 dark:text-green-800">
                      <path d="M13.415.43c-2.523 0-4.75.428-6.683 1.284-1.944.855-3.564 1.988-4.862 3.395C.56 6.526-.12 8.286-.12 10.36c0 3.218 1.063 5.659 3.19 7.322 2.125 1.663 4.603 2.495 7.433 2.495 2.663 0 4.945-.685 6.847-2.054 1.899-1.368 2.848-3.235 2.848-5.601 0-2.321-.948-4.171-2.847-5.552-1.898-1.372-4.184-2.058-6.857-2.058-1.537 0-2.84.338-3.913 1.016-.195-.738-.293-1.423-.293-2.054 0-1.663.556-3.078 1.67-4.245C9.193 1.452 10.453.82 11.86.82c.292 0 .877.044 1.754.132.877.088 1.491.132 1.841.132.784 0 1.423-.353 1.914-1.058-.224-.088-.435-.153-.631-.197-.208-.044-.472-.088-.784-.132-.32-.044-.676-.088-1.06-.132C14.509.453 13.98.43 13.414.43zm21.099 0c-2.534 0-4.75.428-6.651 1.284-1.899.855-3.532 1.988-4.894 3.395-1.363 1.417-2.043 3.177-2.043 5.25 0 3.218 1.064 5.659 3.191 7.322 2.126 1.663 4.603 2.495 7.433 2.495 2.664 0 4.946-.685 6.847-2.054 1.899-1.368 2.849-3.235 2.849-5.601 0-2.321-.95-4.171-2.849-5.552-1.901-1.372-4.183-2.058-6.847-2.058-1.538 0-2.849.338-3.933 1.016-.185-.738-.283-1.423-.283-2.054 0-1.663.557-3.078 1.67-4.245 1.113-1.158 2.373-1.79 3.78-1.79.293 0 .887.044 1.754.132.867.088 1.477.132 1.83.132.784 0 1.424-.353 1.915-1.058-.224-.088-.435-.153-.631-.197-.207-.044-.471-.088-.784-.132-.32-.044-.676-.088-1.069-.132-.382-.044-.911-.067-1.586-.067z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center mt-auto">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;