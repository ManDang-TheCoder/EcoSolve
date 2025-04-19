'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Leaf, 
  Recycle, 
  Users, 
  HelpingHand, 
  Clock, 
  MapPin, 
  ArrowUpRight,
  TreePine,
  Waves,
  Wind 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IssueMap } from "@/components/issue-map"
import { ImpactCounter } from "@/components/impact-counter"
import { SuccessStories } from "@/components/success-stories"
import { FeaturedExperts } from "@/components/featured-experts"
import { Button } from "@/components/ui/button"
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section"
import { AnimatedCard, SimpleAnimatedCard } from "@/components/ui/animated-card"

// Animation variants
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Animation */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-green-900 to-green-700">
            {/* Animated background elements */}
            <motion.div 
              className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-green-500 bg-opacity-20 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div 
              className="absolute bottom-[20%] right-[10%] w-32 h-32 rounded-full bg-blue-500 bg-opacity-20 blur-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
              variants={itemVariants}
            >
              Local Solutions for a Sustainable Future
            </motion.h1>
            <motion.p 
              className="text-xl text-white mb-8 max-w-2xl"
              variants={itemVariants}
            >
              Join our community of changemakers creating real environmental impact through local action, collaboration, and innovative solutions.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <Link 
                href="/solutions" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-green-500/30"
              >
                Explore Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/map" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-105"
              >
                View Community Map
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section with Animation */}
      <AnimatedSection animation="slide" className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
            {[
              { 
                icon: <Leaf className="h-8 w-8 text-green-600" />,
                value: "120+",
                label: "Local Projects",
                delay: 0
              },
              { 
                icon: <Users className="h-8 w-8 text-green-600" />,
                value: "2,500+",
                label: "Community Members",
                delay: 1
              },
              { 
                icon: <Recycle className="h-8 w-8 text-green-600" />,
                value: "45%",
                label: "Waste Reduction",
                delay: 2
              },
              { 
                icon: <HelpingHand className="h-8 w-8 text-green-600" />,
                value: "75+",
                label: "Partner Organizations",
                delay: 3
              }
            ].map((stat, index) => (
              <AnimatedItem 
                key={index} 
                animation="fade" 
                delay={stat.delay * 0.1}
                className="bg-green-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Solutions */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how local communities are addressing environmental challenges with innovative approaches
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Community Gardens',
                description: 'Create shared green spaces for growing food and fostering community connections.',
                icon: <TreePine className="h-6 w-6 text-green-600" />,
                color: 'green',
                delay: 0
              },
              {
                title: 'Energy Conservation',
                description: 'Implement energy-saving initiatives to reduce carbon footprint and utility costs.',
                icon: <Wind className="h-6 w-6 text-blue-600" />,
                color: 'blue',
                delay: 1
              },
              {
                title: 'Waste Reduction',
                description: 'Develop waste management strategies to minimize landfill impact through recycling and composting.',
                icon: <Recycle className="h-6 w-6 text-amber-600" />,
                color: 'amber',
                delay: 2
              },
            ].map((solution, index) => (
              <AnimatedCard
                key={index}
                delay={solution.delay}
                title={
                  <div className="flex items-center">
                    {solution.icon}
                    <h3 className="ml-2 text-xl font-semibold text-gray-900">{solution.title}</h3>
                  </div>
                }
                description={solution.description}
                footer={
                  <Link 
                    href="/solutions" 
                    className="inline-flex items-center text-green-600 hover:text-green-800"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                }
              >
                <div 
                  className="h-48 flex items-center justify-center rounded-lg mb-4"
                  style={{ 
                    backgroundColor: solution.color === 'green' 
                      ? '#ecfdf5' 
                      : solution.color === 'blue' 
                        ? '#eff6ff' 
                        : '#fef3c7' 
                  }}
                >
                  <div 
                    className="h-16 w-16 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: solution.color === 'green' 
                        ? '#a7f3d0' 
                        : solution.color === 'blue' 
                          ? '#bfdbfe' 
                          : '#fde68a' 
                    }}
                  >
                    {solution.icon}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          
          <AnimatedSection animation="fade" delay={0.4} className="text-center mt-12">
            <Link 
              href="/solutions" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-all duration-300 hover:shadow-lg"
            >
              View All Solutions
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-12">
            <AnimatedSection animation="slide" className="max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-lg text-gray-600">
                Join our community events to connect, learn, and make a difference
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade" delay={0.2} className="mt-6 md:mt-0">
              <Link 
                href="/events" 
                className="inline-flex items-center text-green-600 hover:text-green-800 transition-all duration-300 hover:translate-x-1"
              >
                View all events
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </AnimatedSection>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Community Garden Planting Day',
                date: 'May 15, 2025',
                time: '9:00 AM - 1:00 PM',
                location: 'Central Community Garden',
                description: 'Join us for a day of planting and community building. Bring your gardening tools!',
                icon: <TreePine className="h-8 w-8 text-green-600" />,
                delay: 0
              },
              {
                title: 'Eco-Friendly Home Workshop',
                date: 'June 5, 2025',
                time: '2:00 PM - 4:00 PM',
                location: 'City Library Conference Room',
                description: 'Learn practical ways to make your home more energy efficient and environmentally friendly.',
                icon: <Leaf className="h-8 w-8 text-green-600" />,
                delay: 1
              },
            ].map((event, index) => (
              <AnimatedCard
                key={index}
                delay={event.delay}
                hover={true}
                className="overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row bg-gray-50 rounded-lg overflow-hidden h-full">
                  <div className="sm:w-1/3 bg-green-100 flex items-center justify-center p-4">
                    <div className="h-16 w-16 rounded-full bg-green-200 flex items-center justify-center">
                      {event.icon}
                    </div>
                  </div>
                  <div className="p-6 sm:w-2/3">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.date}, {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <Link 
                      href={`/events/register/${index + 1}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-all duration-300 hover:shadow-md"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <AnimatedSection animation="slide" className="bg-gradient-to-r from-green-600 to-green-700 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-white mb-8">
              Join our community today and be part of the solution. Together, we can create a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/auth/signin" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                Join the Community
              </Link>
              <Link 
                href="/report-issue" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-105 transform"
              >
                Report an Issue
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
