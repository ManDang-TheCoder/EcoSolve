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
  Wind,
  CheckCircle2,
  ChevronRight,
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
      <section className="relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-eco opacity-90"></div>
          <div className="absolute inset-0 opacity-5 mix-blend-overlay">
            <Image 
              src="/noise.svg" 
              alt="" 
              fill={true}
              className="object-cover"
              aria-hidden="true"
            />
          </div>
          
          {/* Animated background elements */}
          <motion.div 
            className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-primary-300 bg-opacity-20 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute bottom-[20%] right-[10%] w-40 h-40 rounded-full bg-secondary-300 bg-opacity-20 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div 
            className="absolute top-[50%] left-[40%] w-24 h-24 rounded-full bg-accent-teal bg-opacity-10 blur-3xl"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <div className="max-w-3xl">
            <motion.span 
              className="inline-block px-4 py-1 mb-6 text-sm font-medium bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white shadow-sm"
              variants={itemVariants}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Join 10,000+ eco-conscious individuals
              </span>
            </motion.span>
            
            <motion.h1 
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              Local Solutions for a <span className="italic">Sustainable</span> Future
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white text-opacity-90 mb-8 max-w-2xl"
              variants={itemVariants}
            >
              Join our community of changemakers creating real environmental impact through local action, collaboration, and innovative solutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-primary-700 hover:bg-primary-50 hover:text-primary-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform font-medium"
              >
                <Link href="/solutions">
                  Explore Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white bg-transparent hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Link href="/map">
                  View Community Map
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Floating dashboard preview - optional */}
          <motion.div
            className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 w-[650px] h-[400px] rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full h-full bg-white rounded-xl overflow-hidden border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-white/50 backdrop-blur-sm">
                {/* This would be a mockup of the eco dashboard */}
                <div className="flex h-full items-center justify-center">
                  <Image 
                    src="/placeholder-dashboard.svg" 
                    alt="EcoSolve Dashboard Preview" 
                    width={600} 
                    height={350}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto fill-white">
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,53.3C672,43,768,21,864,21.3C960,21,1056,43,1152,53.3C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <AnimatedSection animation="slide" className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Through community collaboration and grassroots action, we're making measurable progress in environmental conservation.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[
              { 
                icon: <Leaf className="h-10 w-10 text-primary-600" />,
                value: "120+",
                label: "Local Projects",
                delay: 0
              },
              { 
                icon: <Users className="h-10 w-10 text-primary-600" />,
                value: "2,500+",
                label: "Community Members",
                delay: 1
              },
              { 
                icon: <Recycle className="h-10 w-10 text-primary-600" />,
                value: "45%",
                label: "Waste Reduction",
                delay: 2
              },
              { 
                icon: <HelpingHand className="h-10 w-10 text-primary-600" />,
                value: "75+",
                label: "Partner Organizations",
                delay: 3
              }
            ].map((stat, index) => (
              <AnimatedItem 
                key={index} 
                animation="fade" 
                delay={stat.delay * 0.1}
                className="bg-white rounded-xl p-6 text-center shadow-soft hover-lift"
              >
                <div className="flex justify-center mb-3 text-primary">
                  {stat.icon}
                </div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 font-heading">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Solutions */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade" className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-3 text-sm font-medium bg-primary-100 text-primary-800 rounded-full">Our Solutions</span>
            <h2 className="text-3xl font-heading font-semibold text-gray-900 mb-4">Innovative Environmental Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how local communities are addressing environmental challenges with innovative approaches
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Community Gardens',
                description: 'Create shared green spaces for growing food and fostering community connections.',
                icon: <TreePine className="h-8 w-8 text-primary-600" />,
                color: 'primary',
                delay: 0,
                benefits: ['Improved food security', 'Enhanced biodiversity', 'Community building']
              },
              {
                title: 'Energy Conservation',
                description: 'Implement energy-saving initiatives to reduce carbon footprint and utility costs.',
                icon: <Wind className="h-8 w-8 text-secondary-600" />,
                color: 'secondary',
                delay: 1,
                benefits: ['Reduced emissions', 'Lower utility bills', 'Resource efficiency']
              },
              {
                title: 'Waste Reduction',
                description: 'Develop waste management strategies to minimize landfill impact through recycling and composting.',
                icon: <Recycle className="h-8 w-8 text-accent-amber" />,
                color: 'amber',
                delay: 2,
                benefits: ['Less landfill waste', 'Resource recovery', 'Circular economy']
              },
            ].map((solution, index) => (
              <AnimatedCard
                key={index}
                delay={solution.delay}
                className="border border-gray-100"
              >
                <div className={`bg-${solution.color === 'primary' ? 'primary-50' : solution.color === 'secondary' ? 'secondary-50' : 'amber-50'} rounded-t-lg p-6`}>
                  <div 
                    className={`h-14 w-14 rounded-full flex items-center justify-center bg-${solution.color === 'primary' ? 'primary-100' : solution.color === 'secondary' ? 'secondary-100' : 'amber-100'} mb-4`}
                  >
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                  <p className="text-gray-700">{solution.description}</p>
                </div>
                
                <div className="p-6">
                  <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3">Key Benefits</h4>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary-50"
                    >
                      <Link href="/solutions">
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          
          <AnimatedSection animation="fade" delay={0.4} className="text-center mt-16">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-600 transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/solutions">
                View All Solutions
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-16">
            <AnimatedSection animation="slide" className="max-w-2xl">
              <span className="inline-block px-3 py-1 mb-3 text-sm font-medium bg-secondary-100 text-secondary-800 rounded-full">Join Us</span>
              <h2 className="text-3xl font-heading font-semibold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-lg text-gray-600">
                Join our community events to connect, learn, and make a difference
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade" delay={0.2} className="mt-6 md:mt-0">
              <Link 
                href="/events" 
                className="inline-flex items-center text-secondary-600 hover:text-secondary-800 transition-all duration-300 hover:translate-x-1 font-medium"
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
                icon: <TreePine className="h-8 w-8 text-primary-600" />,
                delay: 0
              },
              {
                title: 'Eco-Friendly Home Workshop',
                date: 'June 5, 2025',
                time: '2:00 PM - 4:00 PM',
                location: 'City Library Conference Room',
                description: 'Learn practical ways to make your home more energy efficient and environmentally friendly.',
                icon: <Leaf className="h-8 w-8 text-primary-600" />,
                delay: 1
              },
            ].map((event, index) => (
              <AnimatedCard
                key={index}
                delay={event.delay}
                hover={true}
                className="overflow-hidden border border-gray-100 shadow-soft"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 bg-primary-50 flex items-center justify-center p-6">
                    <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                      {event.icon}
                    </div>
                  </div>
                  <div className="p-6 sm:w-2/3">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">{event.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{event.date}, {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 mb-6">{event.description}</p>
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary-600"
                    >
                      <Link href={`/events/register/${index + 1}`}>
                        Register
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <AnimatedSection animation="slide" className="bg-gradient-eco py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white shadow-sm mx-auto">
              Make a difference today
            </span>
            <h2 className="text-3xl font-bold text-white mb-6 font-heading">Ready to Create Positive Change?</h2>
            <p className="text-xl text-white mb-8">
              Join our community today and be part of the solution. Together, we can create a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary-700 hover:bg-primary-50 hover:text-primary-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform font-medium"
              >
                <Link href="/auth/signin">
                  Join the Community
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white bg-transparent hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Link href="/report-issue">
                  Report an Issue
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
