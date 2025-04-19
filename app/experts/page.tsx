'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Filter, Star, Award, Mail, Calendar } from 'lucide-react';

// Mock data - in production this would come from database
const experts = [
  {
    id: '1',
    name: 'Dr. Emma Johnson',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    expertise: ['Water Conservation', 'Marine Biology', 'Pollution Control'],
    rating: 4.9,
    reviewCount: 27,
    verified: true,
    location: 'San Francisco, CA',
    bio: 'Marine biologist with 12 years of experience working on water pollution and sustainable fishing practices. PhD from Stanford University.'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    expertise: ['Renewable Energy', 'Climate Science', 'Policy Development'],
    rating: 4.7,
    reviewCount: 19,
    verified: true,
    location: 'Boston, MA',
    bio: 'Environmental policy expert focused on renewable energy implementation. Former advisor to state government on climate legislation.'
  },
  {
    id: '3',
    name: 'Sarah Patel',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    expertise: ['Sustainable Agriculture', 'Urban Farming', 'Food Systems'],
    rating: 4.8,
    reviewCount: 32,
    verified: true,
    location: 'Portland, OR',
    bio: 'Agricultural scientist specializing in sustainable farming methods and urban food systems. Founded three community garden initiatives.'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    expertise: ['Waste Management', 'Circular Economy', 'Industrial Ecology'],
    rating: 4.6,
    reviewCount: 15,
    verified: true,
    location: 'Chicago, IL',
    bio: 'Environmental engineer with expertise in waste reduction and circular economy principles. Consults with businesses on sustainable practices.'
  },
  {
    id: '5',
    name: 'Lisa Rodriguez',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    expertise: ['Conservation', 'Biodiversity', 'Environmental Education'],
    rating: 4.9,
    reviewCount: 41,
    verified: true,
    location: 'Austin, TX',
    bio: 'Wildlife conservationist focused on habitat preservation and educational outreach. Previously worked with National Park Service.'
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    image: 'https://randomuser.me/api/portraits/men/92.jpg',
    expertise: ['Air Quality', 'Pollution Monitoring', 'Environmental Health'],
    rating: 4.7,
    reviewCount: 23,
    verified: true,
    location: 'Los Angeles, CA',
    bio: 'Environmental health scientist specializing in air quality monitoring and pollution reduction strategies in urban environments.'
  }
];

// Categories for filtering
const categories = [
  'Water Conservation',
  'Marine Biology',
  'Renewable Energy',
  'Climate Science',
  'Sustainable Agriculture',
  'Waste Management',
  'Conservation',
  'Air Quality',
  'Environmental Policy',
  'Green Building',
];

export default function ExpertsPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Environmental Experts</h1>
          <p className="mt-2 text-lg text-gray-700">
            Connect with verified experts in various environmental fields for advice and guidance
          </p>
        </div>

        {/* Search and filter */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                placeholder="Search experts by name, expertise, or location"
              />
            </div>
          </div>
          <div>
            <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <Filter className="h-4 w-4 mr-2" />
              Filter Results
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Popular Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Experts grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {experts.map((expert) => (
            <div key={expert.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <img 
                    src={expert.image}
                    alt={expert.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{expert.rating} ({expert.reviewCount} reviews)</span>
                    </div>
                  </div>
                  {expert.verified && (
                    <div className="ml-auto flex items-center text-green-600">
                      <Award className="h-5 w-5 mr-1" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{expert.bio}</p>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {expert.expertise.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-5">
                  <Link
                    href={`/experts/${expert.id}`}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    View Profile
                  </Link>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                      <Calendar className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
