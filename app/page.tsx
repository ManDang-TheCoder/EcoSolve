'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Recycle, Users, HelpingHand, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IssueMap } from "@/components/issue-map"
import { ImpactCounter } from "@/components/impact-counter"
import { SuccessStories } from "@/components/success-stories"
import { FeaturedExperts } from "@/components/featured-experts"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-green-900">
            {/* Placeholder for background image */}
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Local Solutions for a Sustainable Future
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl">
              Join our community of changemakers creating real environmental impact through local action, collaboration, and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/solutions" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition"
              >
                Explore Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/map" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-green-600 transition"
              >
                View Community Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-2">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">120+</p>
              <p className="text-sm text-gray-500">Local Projects</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">2,500+</p>
              <p className="text-sm text-gray-500">Community Members</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-2">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">45%</p>
              <p className="text-sm text-gray-500">Waste Reduction</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-2">
                <HelpingHand className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">75+</p>
              <p className="text-sm text-gray-500">Partner Organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Solutions */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how local communities are addressing environmental challenges with innovative approaches
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Community Gardens',
                description: 'Create shared green spaces for growing food and fostering community connections.',
                icon: <Leaf className="h-6 w-6 text-green-600" />,
              },
              {
                title: 'Energy Conservation',
                description: 'Implement energy-saving initiatives to reduce carbon footprint and utility costs.',
                icon: <Recycle className="h-6 w-6 text-green-600" />,
              },
              {
                title: 'Waste Reduction',
                description: 'Develop waste management strategies to minimize landfill impact through recycling and composting.',
                icon: <Recycle className="h-6 w-6 text-green-600" />,
              },
            ].map((solution, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-green-100 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-green-200 flex items-center justify-center">
                    {solution.icon}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    {solution.icon}
                    <h3 className="ml-2 text-xl font-semibold text-gray-900">{solution.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <Link 
                    href="/solutions" 
                    className="inline-flex items-center text-green-600 hover:text-green-800"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/solutions" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              View All Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Join our community events to connect, learn, and make a difference
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link 
                href="/events" 
                className="inline-flex items-center text-green-600 hover:text-green-800"
              >
                View all events
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Community Garden Planting Day',
                date: 'May 15, 2025',
                time: '9:00 AM - 1:00 PM',
                location: 'Central Community Garden',
                description: 'Join us for a day of planting and community building. Bring your gardening tools!',
              },
              {
                title: 'Eco-Friendly Home Workshop',
                date: 'June 5, 2025',
                time: '2:00 PM - 4:00 PM',
                location: 'City Library Conference Room',
                description: 'Learn practical ways to make your home more energy efficient and environmentally friendly.',
              },
            ].map((event, index) => (
              <div key={index} className="flex flex-col sm:flex-row bg-gray-50 rounded-lg overflow-hidden">
                <div className="sm:w-1/3 bg-green-100 flex items-center justify-center p-4">
                  <div className="h-16 w-16 rounded-full bg-green-200 flex items-center justify-center">
                    <Leaf className="h-8 w-8 text-green-600" />
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
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-green-600 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join our community today and be part of the solution. Together, we can create a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/auth/signin" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
            >
              Join the Community
            </Link>
            <Link 
              href="/report-issue" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-green-600"
            >
              Report an Issue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
