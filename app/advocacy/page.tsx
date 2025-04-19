'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Users, Megaphone, Share2, Plus, ArrowRight, ThumbsUp } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for advocacy campaigns
const advocacyCampaigns = [
  {
    id: 1,
    title: 'Save Ocean Wildlife',
    description: 'Join our campaign to protect marine life from plastic pollution and overfishing.',
    image: '/placeholder.jpg',
    category: 'Wildlife Protection',
    supporters: 12543,
    progress: 75,
    goal: 15000,
    location: 'Global',
    organizer: 'Ocean Conservation Alliance',
    featured: true
  },
  {
    id: 2,
    title: 'Ban Single-Use Plastics',
    description: 'Help us advocate for legislation to eliminate single-use plastics in our community.',
    image: '/placeholder.jpg',
    category: 'Pollution',
    supporters: 8321,
    progress: 55,
    goal: 10000,
    location: 'United States',
    organizer: 'Clean Earth Initiative'
  },
  {
    id: 3,
    title: 'Protect Amazon Rainforest',
    description: 'Stand with indigenous communities to prevent deforestation in the Amazon.',
    image: '/placeholder.jpg',
    category: 'Deforestation',
    supporters: 25786,
    progress: 85,
    goal: 30000,
    location: 'Brazil',
    organizer: 'Rainforest Action Network'
  },
  {
    id: 4,
    title: 'Clean Energy Transition',
    description: 'Advocate for policies that accelerate the transition to renewable energy sources.',
    image: '/placeholder.jpg',
    category: 'Climate Action',
    supporters: 15432,
    progress: 60,
    goal: 20000,
    location: 'Global',
    organizer: 'Climate Solutions Coalition'
  },
  {
    id: 5,
    title: 'Protect Local Wetlands',
    description: 'Help preserve critical wetland ecosystems that support biodiversity and protect against flooding.',
    image: '/placeholder.jpg',
    category: 'Conservation',
    supporters: 3245,
    progress: 32,
    goal: 5000,
    location: 'Regional',
    organizer: 'Wetlands Preservation Society'
  },
  {
    id: 6,
    title: 'Clean Air Initiative',
    description: 'Advocate for stricter air quality standards and monitoring in urban areas.',
    image: '/placeholder.jpg',
    category: 'Air Quality',
    supporters: 7892,
    progress: 40,
    goal: 12000,
    location: 'Urban Areas',
    organizer: 'Breathe Clean Alliance'
  }
];

// Categories for filtering
const categories = [
  'All Campaigns',
  'Wildlife Protection',
  'Pollution',
  'Climate Action',
  'Conservation',
  'Deforestation',
  'Clean Water',
  'Air Quality',
  'Sustainable Agriculture'
];

export default function AdvocacyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Campaigns');
  const [visibleCampaigns, setVisibleCampaigns] = useState(3);

  // Filter campaigns based on search term and selected category
  const filteredCampaigns = advocacyCampaigns.filter(campaign => {
    const matchesSearch = 
      searchTerm === '' || 
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All Campaigns' || 
      campaign.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already happening in real-time through the filteredCampaigns
  };

  // Load more campaigns
  const handleLoadMore = () => {
    setVisibleCampaigns(prev => prev + 3);
  };

  // Share campaign
  const handleShare = (campaign: typeof advocacyCampaigns[0]) => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: `Check out this campaign: ${campaign.title}`,
        url: `/advocacy/${campaign.id}`,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert(`Share this link: ${window.location.origin}/advocacy/${campaign.id}`);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-green-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative h-full w-full">
            <Image
              src="/placeholder.jpg"
              alt="Environmental advocacy"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
              className="absolute inset-0"
            />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Your Voice Matters
          </h1>
          <p className="text-xl text-center max-w-3xl mb-10">
            Join thousands of advocates working together to create a sustainable future for our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/advocacy/create" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors">
              <Plus className="mr-2 h-5 w-5" />
              Start a Campaign
            </Link>
            <button 
              onClick={() => document.getElementById('campaigns-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-gray-100 text-green-800 font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors"
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Campaigns
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">250+</div>
              <p className="text-lg">Active Campaigns</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <p className="text-lg">Engaged Advocates</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">75+</div>
              <p className="text-lg">Policy Changes Achieved</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div id="campaigns-section" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <form onSubmit={handleSearch} className="relative flex-grow max-w-3xl">
            <input 
              type="text" 
              placeholder="Search campaigns by keyword, location, or organizer" 
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-green-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </form>
          <button 
            onClick={() => document.getElementById('categories-filter')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2 text-gray-500" />
            Filter Results
          </button>
        </div>
        
        {/* Categories */}
        <div id="categories-filter" className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map((category, index) => (
              <button 
                key={index}
                onClick={() => handleCategorySelect(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  category === selectedCategory 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured Campaign */}
        {filteredCampaigns.filter(campaign => campaign.featured).map(campaign => (
          <div key={campaign.id} className="relative rounded-xl overflow-hidden bg-white shadow-lg mb-12">
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured Campaign
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/placeholder.jpg"
                  alt={campaign.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="text-sm text-green-600 font-medium mb-2">{campaign.category}</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{campaign.title}</h2>
                  <p className="text-gray-600 mb-6">{campaign.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">{campaign.supporters.toLocaleString()} supporters</span>
                      <span className="text-gray-700 font-medium">{campaign.progress}% of {campaign.goal.toLocaleString()} goal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Organized by {campaign.organizer}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link 
                    href={`/advocacy/${campaign.id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center"
                  >
                    <Megaphone className="mr-2 h-4 w-4" />
                    Join Campaign
                  </Link>
                  <button 
                    onClick={() => handleShare(campaign)}
                    className="flex items-center justify-center p-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Grid of Campaigns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns
            .filter(campaign => !campaign.featured)
            .slice(0, visibleCampaigns)
            .map(campaign => (
              <div key={campaign.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.jpg"
                    alt={campaign.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-green-700 px-2 py-1 rounded text-xs font-medium">
                    {campaign.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700">{campaign.supporters.toLocaleString()} supporters</span>
                      <span className="text-gray-700">{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{campaign.organizer}</span>
                    </div>
                    <Link href={`/advocacy/${campaign.id}`} className="text-green-600 hover:text-green-800 text-sm font-medium inline-flex items-center">
                      View Details
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        {/* More Campaigns Button */}
        {filteredCampaigns.filter(campaign => !campaign.featured).length > visibleCampaigns && (
          <div className="text-center mt-10">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md hover:bg-gray-50"
            >
              Load More Campaigns
            </button>
          </div>
        )}
      </div>
      
      {/* How It Works Section */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Environmental Advocacy Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <Megaphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Start or Join a Campaign</h3>
              <p className="text-gray-600">
                Create a new advocacy initiative or join an existing campaign that aligns with your environmental values.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobilize Support</h3>
              <p className="text-gray-600">
                Share your campaign with others, gather signatures, and build a community of supporters advocating for change.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create Impact</h3>
              <p className="text-gray-600">
                Work with decision-makers to implement real environmental policy changes and sustainable practices.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/advocacy/resources" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
              Advocacy Resources
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Success Stories */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn how environmental advocates like you have made a real difference in communities around the world.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-56">
              <Image
                src="/placeholder.jpg"
                alt="Success story"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Local Plastic Ban Enacted</h3>
              <p className="text-gray-600 mb-4">
                After gathering 8,000 signatures and organizing community events, advocates successfully pushed for a ban on single-use plastics in their coastal city.
              </p>
              <Link href="/advocacy/success/plastic-ban" className="text-green-600 font-medium hover:text-green-800 inline-flex items-center">
                Read the full story
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-56">
              <Image
                src="/placeholder.jpg"
                alt="Success story"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Urban Forest Protection</h3>
              <p className="text-gray-600 mb-4">
                A grassroots campaign saved 200 acres of urban forest from development, preserving valuable green space and wildlife habitat within city limits.
              </p>
              <Link href="/advocacy/success/urban-forest" className="text-green-600 font-medium hover:text-green-800 inline-flex items-center">
                Read the full story
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of environmental advocates and help create lasting change for our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/advocacy/create" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center transition-colors">
              <Plus className="mr-2 h-5 w-5" />
              Start a Campaign
            </Link>
            <Link href="/signup" className="bg-green-600 hover:bg-green-800 border border-white text-white font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center transition-colors">
              Sign Up to Join Campaigns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 