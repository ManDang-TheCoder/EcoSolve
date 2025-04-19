'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Search, Filter, Clock, ArrowUpRight, MessageSquare, ThumbsUp, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Mock environmental issues data
const MOCK_ISSUES = [
  {
    id: '1',
    title: 'Industrial Waste Dumping in Cedar River',
    description: 'I\'ve observed multiple instances of what appears to be industrial waste being dumped into Cedar River near the manufacturing district. The water has an oily sheen and unnatural coloring in that area. This is affecting local wildlife and contaminating the water that feeds into our reservoir.',
    location: 'Cedar River, Downtown Industrial District',
    coordinates: { lat: 47.5678, lng: -122.3214 },
    category: 'water-pollution',
    urgency: 'HIGH',
    status: 'VERIFIED',
    reportedBy: {
      id: 'u1',
      name: 'Marcus Chen',
      image: '/placeholder-user.jpg'
    },
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    reportedAt: '2023-10-18T14:30:00Z',
    verifiedAt: '2023-10-19T10:15:00Z',
    upvotes: 48,
    comments: 17,
    isFollowing: true,
    upvoted: false
  },
  {
    id: '2',
    title: 'Illegal Tree Cutting in Heritage Forest',
    description: 'Several trees marked for preservation in Heritage Forest have been cut down over the past week. This appears to be unauthorized, as the cut trees have preservation markers. The area is supposed to be protected as a natural habitat.',
    location: 'Heritage Forest, North Section',
    coordinates: { lat: 47.6123, lng: -122.3456 },
    category: 'deforestation',
    urgency: 'HIGH',
    status: 'IN_PROGRESS',
    reportedBy: {
      id: 'u2',
      name: 'Sarah Wilson',
      image: '/placeholder-user.jpg'
    },
    images: ['/placeholder.jpg'],
    reportedAt: '2023-10-17T09:45:00Z',
    upvotes: 35,
    comments: 12,
    isFollowing: false,
    upvoted: false
  },
  {
    id: '3',
    title: 'Chemical Runoff from Construction Site',
    description: 'The new construction site on Maple Street appears to have inadequate runoff control. After yesterday\'s rain, chemical runoff was flowing directly into storm drains. The water had an unnatural color and odor, indicating potential contaminants.',
    location: 'Maple Street Construction Site',
    coordinates: { lat: 47.5891, lng: -122.3678 },
    category: 'chemical-pollution',
    urgency: 'CRITICAL',
    status: 'PENDING',
    reportedBy: {
      id: 'u3',
      name: 'David Johnson',
      image: '/placeholder-user.jpg'
    },
    images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
    reportedAt: '2023-10-16T16:10:00Z',
    upvotes: 23,
    comments: 8,
    isFollowing: false,
    upvoted: false
  },
  {
    id: '4',
    title: 'Excessive Air Pollution from Factory',
    description: 'The manufacturing plant on Industrial Way is releasing dark smoke outside of permitted hours. This has been happening consistently during nighttime when inspections are less likely. The air quality in the surrounding neighborhood has noticeably deteriorated.',
    location: 'Industrial Way Manufacturing Plant',
    coordinates: { lat: 47.5780, lng: -122.3390 },
    category: 'air-pollution',
    urgency: 'HIGH',
    status: 'VERIFIED',
    reportedBy: {
      id: 'u4',
      name: 'Emily Rodriguez',
      image: '/placeholder-user.jpg'
    },
    images: ['/placeholder.jpg'],
    reportedAt: '2023-10-15T20:30:00Z',
    upvotes: 56,
    comments: 21,
    isFollowing: true,
    upvoted: false
  },
  {
    id: '5',
    title: 'Improper Disposal of Batteries and E-Waste',
    description: 'I discovered a pile of discarded electronics, including batteries, computer parts, and old phones behind the shopping center. This e-waste contains hazardous materials that can leach into the ground and water supply if not properly disposed of.',
    location: 'Westside Shopping Center, Rear Area',
    coordinates: { lat: 47.5923, lng: -122.3567 },
    category: 'waste-management',
    urgency: 'MEDIUM',
    status: 'RESOLVED',
    reportedBy: {
      id: 'u5',
      name: 'Michael Taylor',
      image: '/placeholder-user.jpg'
    },
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    reportedAt: '2023-10-10T13:15:00Z',
    resolvedAt: '2023-10-14T15:40:00Z',
    upvotes: 29,
    comments: 15,
    isFollowing: false,
    upvoted: false
  }
];

// Categories for filtering
const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'water-pollution', label: 'Water Pollution' },
  { value: 'air-pollution', label: 'Air Pollution' },
  { value: 'waste-management', label: 'Waste Management' },
  { value: 'deforestation', label: 'Deforestation' },
  { value: 'chemical-pollution', label: 'Chemical Pollution' },
  { value: 'noise-pollution', label: 'Noise Pollution' },
  { value: 'wildlife', label: 'Wildlife Protection' },
];

// Urgency levels for filtering
const URGENCY_LEVELS = [
  { value: 'all', label: 'All Urgency Levels' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'CRITICAL', label: 'Critical' },
];

// Status options for filtering
const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'VERIFIED', label: 'Verified' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED', label: 'Resolved' },
  { value: 'REJECTED', label: 'Rejected' },
];

// Helper function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper function to get the appropriate badge for urgency levels
const getUrgencyBadge = (urgency: string) => {
  switch (urgency) {
    case 'LOW':
      return <Badge className="bg-green-100 text-green-800">Low</Badge>;
    case 'MEDIUM':
      return <Badge className="bg-blue-100 text-blue-800">Medium</Badge>;
    case 'HIGH':
      return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
    case 'CRITICAL':
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">{urgency}</Badge>;
  }
};

// Helper function to get status badges
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'VERIFIED':
      return <Badge className="bg-blue-100 text-blue-800">Verified</Badge>;
    case 'IN_PROGRESS':
      return <Badge className="bg-purple-100 text-purple-800">In Progress</Badge>;
    case 'RESOLVED':
      return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
    case 'REJECTED':
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  }
};

// Helper function to format category names
const formatCategoryName = (category: string) => {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function CommunityIssuesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [issuesData, setIssuesData] = useState(MOCK_ISSUES);
  
  // Filter issues based on search and filter selections
  const filteredIssues = issuesData.filter(issue => {
    // Search term filter
    const matchesSearch = searchTerm.trim() === '' || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    
    // Urgency filter
    const matchesUrgency = selectedUrgency === 'all' || issue.urgency === selectedUrgency;
    
    // Status filter
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesUrgency && matchesStatus;
  });
  
  // Toggle follow status for an issue
  const toggleFollow = (issueId: string) => {
    setIssuesData(prev => 
      prev.map(issue => 
        issue.id === issueId 
          ? { ...issue, isFollowing: !issue.isFollowing }
          : issue
      )
    );
  };
  
  // Toggle upvote for an issue
  const toggleUpvote = (issueId: string) => {
    setIssuesData(prev => 
      prev.map(issue => 
        issue.id === issueId 
          ? { 
              ...issue, 
              upvotes: issue.upvoted ? issue.upvotes - 1 : issue.upvotes + 1,
              upvoted: !issue.upvoted 
            }
          : issue
      )
    );
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Environmental Issues</h1>
        <p className="text-lg text-gray-600">
          Discover and engage with environmental issues reported by community members.
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search issues..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Urgency filter */}
          <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
            <SelectTrigger>
              <SelectValue placeholder="Select Urgency" />
            </SelectTrigger>
            <SelectContent>
              {URGENCY_LEVELS.map(urgency => (
                <SelectItem key={urgency.value} value={urgency.value}>
                  {urgency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Status filter */}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredIssues.length}</span> issues
          </p>
          <Button asChild>
            <Link href="/reports/new">
              Report New Issue
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Tabs for different views */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="all">All Issues</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="nearby">Nearby</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredIssues.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredIssues.map(issue => (
                <IssueCard 
                  key={issue.id} 
                  issue={issue} 
                  onToggleFollow={() => toggleFollow(issue.id)} 
                  onToggleUpvote={() => toggleUpvote(issue.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Issues Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                No environmental issues match your current filters. Try adjusting your search criteria or be the first to report an issue in this area.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/reports/new">
                  Report an Issue
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="following" className="mt-6">
          {filteredIssues.filter(issue => issue.isFollowing).length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredIssues
                .filter(issue => issue.isFollowing)
                .map(issue => (
                  <IssueCard 
                    key={issue.id} 
                    issue={issue} 
                    onToggleFollow={() => toggleFollow(issue.id)} 
                    onToggleUpvote={() => toggleUpvote(issue.id)}
                  />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-16">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Not Following Any Issues</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                You're not following any environmental issues yet. Browse through all issues and click "Follow" on the ones you want to stay updated about.
              </p>
              <Button className="mt-6" variant="outline">
                Browse All Issues
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="nearby" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Enable location services to see environmental issues near you.
            </p>
            <Button>
              Enable Location Services
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Issue card component
function IssueCard({ issue, onToggleFollow, onToggleUpvote }) {
  return (
    <Card className="overflow-hidden bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Link href={`/reports/${issue.id}`} className="inline-block">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-green-700 transition-colors">
                  {issue.title}
                </h3>
              </Link>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {issue.location}
                </Badge>
                {getStatusBadge(issue.status)}
                {getUrgencyBadge(issue.urgency)}
                <Badge className="bg-green-50 text-green-700">
                  {formatCategoryName(issue.category)}
                </Badge>
              </div>
              
              <p className="mt-3 text-gray-600 line-clamp-3">
                {issue.description}
              </p>
              
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Reported {formatDate(issue.reportedAt)}</span>
              </div>
            </div>
            
            {issue.images && issue.images.length > 0 && (
              <div className="hidden sm:block flex-shrink-0">
                <div className="w-48 h-32 relative rounded-lg overflow-hidden">
                  <Image 
                    src={issue.images[0]} 
                    alt={issue.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center text-sm">
              <div className="flex items-center mr-4">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 relative">
                  <Image 
                    src={issue.reportedBy.image} 
                    alt={issue.reportedBy.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-gray-700">{issue.reportedBy.name}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className={`flex items-center gap-1 text-sm ${issue.upvoted ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={(e) => {
                  e.preventDefault();
                  onToggleUpvote();
                }}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{issue.upvotes}</span>
              </button>
              
              <Link 
                href={`/reports/${issue.id}#comments`}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{issue.comments}</span>
              </Link>
              
              <Button 
                variant={issue.isFollowing ? "default" : "outline"} 
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFollow();
                }}
              >
                {issue.isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-3">
        <div className="w-full flex justify-between items-center">
          <Link 
            href={`/map?lat=${issue.coordinates.lat}&lng=${issue.coordinates.lng}&id=${issue.id}`}
            className="text-sm text-green-600 hover:text-green-800 flex items-center"
          >
            <MapPin className="h-4 w-4 mr-1" />
            View on Map
          </Link>
          
          <Link 
            href={`/reports/${issue.id}`}
            className="text-sm text-green-600 hover:text-green-800 flex items-center"
          >
            View Details
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
} 