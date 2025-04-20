'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Clock, 
  Eye, 
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  X,
  ChevronDown
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedSection } from '@/components/ui/animated-section';

// Types
interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'REPORTED' | 'UNDER_INVESTIGATION' | 'RESOLVED' | 'CLOSED';
  reportedBy: {
    id: string;
    name: string;
    image?: string;
  };
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: string;
  updatedAt: string;
  category: string;
  impactArea: string;
  images: string[];
  views: number;
  likes: number;
  commentCount: number;
}

// Mock data
const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Water Pollution in Green River',
    description: 'Severe contamination observed in Green River with visible oil slicks and debris. Fish mortality reported.',
    location: 'Green River, North District',
    status: 'UNDER_INVESTIGATION',
    reportedBy: {
      id: '101',
      name: 'Jane Cooper',
      image: '/assets/avatars/avatar-1.png',
    },
    urgency: 'HIGH',
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2023-09-17T14:20:00Z',
    category: 'water-pollution',
    impactArea: 'Aquatic Ecosystem',
    images: ['/assets/images/issues/river-pollution-1.jpg'],
    views: 128,
    likes: 42,
    commentCount: 18,
  },
  {
    id: '2',
    title: 'Illegal Waste Dumping in Forest Preserve',
    description: 'Construction waste and household garbage dumped in protected forest area. Affects local wildlife and hiking trails.',
    location: 'Oak Forest Preserve, East Section',
    status: 'REPORTED',
    reportedBy: {
      id: '102',
      name: 'Robert Fox',
      image: '/assets/avatars/avatar-2.png',
    },
    urgency: 'MEDIUM',
    createdAt: '2023-09-10T08:15:00Z',
    updatedAt: '2023-09-10T08:15:00Z',
    category: 'waste-management',
    impactArea: 'Forest Ecosystem',
    images: ['/assets/images/issues/waste-dumping-1.jpg', '/assets/images/issues/waste-dumping-2.jpg'],
    views: 89,
    likes: 36,
    commentCount: 12,
  },
  {
    id: '3',
    title: 'Air Pollution from Industrial Complex',
    description: 'Residents reporting strong chemical odors and smoke from the northern industrial complex. Causing respiratory issues.',
    location: 'North Industrial District',
    status: 'UNDER_INVESTIGATION',
    reportedBy: {
      id: '103',
      name: 'Esther Howard',
      image: '/assets/avatars/avatar-3.png',
    },
    urgency: 'CRITICAL',
    createdAt: '2023-09-05T15:45:00Z',
    updatedAt: '2023-09-16T11:30:00Z',
    category: 'air-pollution',
    impactArea: 'Urban Residential',
    images: ['/assets/images/issues/air-pollution-1.jpg'],
    views: 256,
    likes: 98,
    commentCount: 43,
  },
  {
    id: '4',
    title: 'Soil Contamination at Old Factory Site',
    description: 'Tests show heavy metal contamination in soil at the abandoned factory site. Potential groundwater contamination risk.',
    location: 'Former Industrial Park, West District',
    status: 'UNDER_INVESTIGATION',
    reportedBy: {
      id: '104',
      name: 'Cameron Williamson',
      image: '/assets/avatars/avatar-4.png',
    },
    urgency: 'MEDIUM',
    createdAt: '2023-08-28T09:20:00Z',
    updatedAt: '2023-09-12T16:40:00Z',
    category: 'soil-contamination',
    impactArea: 'Urban Development',
    images: ['/assets/images/issues/soil-contamination-1.jpg'],
    views: 76,
    likes: 28,
    commentCount: 15,
  },
  {
    id: '5',
    title: 'Excessive Noise from Highway Construction',
    description: 'Round-the-clock construction causing severe noise pollution affecting residential areas and wildlife sanctuary.',
    location: 'Highway 27, South Extension',
    status: 'RESOLVED',
    reportedBy: {
      id: '105',
      name: 'Brooklyn Simmons',
      image: '/assets/avatars/avatar-5.png',
    },
    urgency: 'LOW',
    createdAt: '2023-08-20T13:10:00Z',
    updatedAt: '2023-09-08T14:50:00Z',
    category: 'noise-pollution',
    impactArea: 'Residential & Wildlife',
    images: ['/assets/images/issues/noise-pollution-1.jpg'],
    views: 43,
    likes: 17,
    commentCount: 8,
  },
  {
    id: '6',
    title: 'Deforestation for New Housing Development',
    description: 'Massive clearing of protected forest area for unauthorized housing development. Habitat destruction observed.',
    location: 'Green Valley Forest, South District',
    status: 'REPORTED',
    reportedBy: {
      id: '106',
      name: 'Leslie Alexander',
      image: '/assets/avatars/avatar-6.png',
    },
    urgency: 'HIGH',
    createdAt: '2023-09-18T11:25:00Z',
    updatedAt: '2023-09-18T11:25:00Z',
    category: 'deforestation',
    impactArea: 'Forest Ecosystem',
    images: ['/assets/images/issues/deforestation-1.jpg', '/assets/images/issues/deforestation-2.jpg'],
    views: 112,
    likes: 67,
    commentCount: 29,
  },
  {
    id: '7',
    title: 'Plastic Waste Accumulation on Beach',
    description: 'Significant accumulation of plastic waste and microplastics on public beach. Affecting marine life and tourism.',
    location: 'Sunshine Beach, East Coast',
    status: 'UNDER_INVESTIGATION',
    reportedBy: {
      id: '107',
      name: 'Darlene Robertson',
      image: '/assets/avatars/avatar-7.png',
    },
    urgency: 'MEDIUM',
    createdAt: '2023-09-08T16:35:00Z',
    updatedAt: '2023-09-14T10:45:00Z',
    category: 'waste-management',
    impactArea: 'Coastal Ecosystem',
    images: ['/assets/images/issues/beach-waste-1.jpg'],
    views: 189,
    likes: 75,
    commentCount: 31,
  },
  {
    id: '8',
    title: 'Light Pollution Affecting Bird Migration',
    description: 'Excessive lighting from new commercial development disrupting night bird migration patterns and causing disorientation.',
    location: 'Downtown Commercial District',
    status: 'REPORTED',
    reportedBy: {
      id: '108',
      name: 'Jenny Wilson',
      image: '/assets/avatars/avatar-8.png',
    },
    urgency: 'LOW',
    createdAt: '2023-09-12T08:50:00Z',
    updatedAt: '2023-09-12T08:50:00Z',
    category: 'light-pollution',
    impactArea: 'Urban Wildlife',
    images: ['/assets/images/issues/light-pollution-1.jpg'],
    views: 67,
    likes: 29,
    commentCount: 14,
  },
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Status badge component
const StatusBadge = ({ status }: { status: Issue['status'] }) => {
  const statusConfig = {
    'REPORTED': { label: 'Reported', variant: 'outline', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    'UNDER_INVESTIGATION': { label: 'Under Investigation', variant: 'outline', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    'RESOLVED': { label: 'Resolved', variant: 'outline', className: 'bg-green-50 text-green-700 border-green-200' },
    'CLOSED': { label: 'Closed', variant: 'outline', className: 'bg-gray-50 text-gray-700 border-gray-200' },
  };
  
  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

// Category badge component
const CategoryBadge = ({ category }: { category: string }) => {
  const categoryConfig: Record<string, { label: string, icon?: React.ReactNode, className: string }> = {
    'water-pollution': { label: 'Water Pollution', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    'air-pollution': { label: 'Air Pollution', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    'waste-management': { label: 'Waste Management', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    'soil-contamination': { label: 'Soil Contamination', className: 'bg-brown-50 text-amber-900 border-amber-300' },
    'habitat-destruction': { label: 'Habitat Destruction', className: 'bg-red-50 text-red-700 border-red-200' },
    'noise-pollution': { label: 'Noise Pollution', className: 'bg-purple-50 text-purple-700 border-purple-200' },
    'light-pollution': { label: 'Light Pollution', className: 'bg-orange-50 text-orange-700 border-orange-200' },
    'deforestation': { label: 'Deforestation', className: 'bg-green-50 text-green-700 border-green-200' },
    'wildlife-concerns': { label: 'Wildlife Concerns', className: 'bg-teal-50 text-teal-700 border-teal-200' },
    'other': { label: 'Other', className: 'bg-gray-50 text-gray-700 border-gray-200' },
  };
  
  const config = categoryConfig[category] || categoryConfig.other;
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

// Urgency badge component
const UrgencyBadge = ({ urgency }: { urgency: Issue['urgency'] }) => {
  const urgencyConfig = {
    'LOW': { label: 'Low', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    'MEDIUM': { label: 'Medium', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    'HIGH': { label: 'High', className: 'bg-orange-50 text-orange-700 border-orange-200' },
    'CRITICAL': { label: 'Critical', className: 'bg-red-50 text-red-700 border-red-200' },
  };
  
  const config = urgencyConfig[urgency];
  
  return (
    <Badge variant="outline" className={config.className}>
      {urgency === 'CRITICAL' && <AlertTriangle className="mr-1 h-3 w-3" />}
      {config.label}
    </Badge>
  );
};

// Issue card component
const IssueCard = ({ issue }: { issue: Issue }) => {
  return (
    <AnimatedSection animation="slide-up" className="mb-4">
      <Link href={`/issues/${issue.id}`} className="block">
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-0">
            {/* Issue image */}
            {issue.images && issue.images.length > 0 && (
              <div className="relative w-full aspect-video">
                <div className="absolute inset-0 bg-black/5" />
                <div className="w-full h-full relative">
                  <Image 
                    src={issue.images[0]} 
                    alt={issue.title}
                    fill
                    className="object-cover rounded-t-md"
                  />
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <StatusBadge status={issue.status} />
                  <UrgencyBadge urgency={issue.urgency} />
                </div>
              </div>
            )}
            
            <div className="p-5">
              {/* Issue title and category */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h3>
                <CategoryBadge category={issue.category} />
              </div>
              
              {/* Issue description */}
              <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
              
              {/* Issue metadata */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center mr-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="truncate max-w-[150px]">{issue.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDate(issue.createdAt)}</span>
                </div>
              </div>
              
              {/* User who reported */}
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 relative">
                  <Image 
                    src={issue.reportedBy.image || '/assets/avatars/placeholder.png'} 
                    alt={issue.reportedBy.name}
                    height={32}
                    width={32}
                    className="rounded-full"
                  />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-700">{issue.reportedBy.name}</p>
                  <p className="text-xs text-gray-500">Reported by</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-md flex items-center justify-between">
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span className="text-xs">{issue.views}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span className="text-xs">{issue.likes}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="text-xs">{issue.commentCount}</span>
              </div>
            </div>
            <div>
              <Badge variant="secondary" className="text-xs px-2 py-1">
                {issue.impactArea}
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </AnimatedSection>
  );
};

// Skeleton loader for issue cards
const IssueCardSkeleton = () => {
  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        <Skeleton className="w-full aspect-video rounded-t-md" />
        <div className="p-5">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex items-center mb-4">
            <Skeleton className="h-4 w-32 mr-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="ml-2">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-5 w-24" />
      </CardFooter>
    </Card>
  );
};

// Main page component
export default function IssuesPage() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [activeFilters, setActiveFilters] = useState<{
    category?: string;
    status?: string;
    urgency?: string;
  }>({});
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredIssues(mockIssues);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter and sort issues whenever filters change
  useEffect(() => {
    if (isLoading) return;
    
    let filtered = [...mockIssues];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query) ||
        issue.location.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }
    
    // Apply urgency filter
    if (urgencyFilter) {
      filtered = filtered.filter(issue => issue.urgency === urgencyFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'most-liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'most-commented':
        filtered.sort((a, b) => b.commentCount - a.commentCount);
        break;
      default:
        break;
    }
    
    // Update filtered issues
    setFilteredIssues(filtered);
    
    // Update active filters for display
    const newActiveFilters: { category?: string; status?: string; urgency?: string; } = {};
    if (categoryFilter) newActiveFilters.category = categoryFilter;
    if (statusFilter) newActiveFilters.status = statusFilter;
    if (urgencyFilter) newActiveFilters.urgency = urgencyFilter;
    setActiveFilters(newActiveFilters);
    
  }, [searchQuery, categoryFilter, statusFilter, urgencyFilter, sortBy, isLoading]);
  
  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setStatusFilter('');
    setUrgencyFilter('');
    setSortBy('newest');
  };
  
  // Remove a specific filter
  const removeFilter = (filterType: 'category' | 'status' | 'urgency') => {
    switch (filterType) {
      case 'category':
        setCategoryFilter('');
        break;
      case 'status':
        setStatusFilter('');
        break;
      case 'urgency':
        setUrgencyFilter('');
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Environmental Issues</h1>
          <p className="text-gray-600 max-w-2xl">
            Explore and track environmental issues in your community. Help us identify problems, monitor progress, and collaborate on solutions.
          </p>
        </div>
        <Button asChild className="mt-4 sm:mt-0">
          <Link href="/issues/new" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Report Issue
          </Link>
        </Button>
      </div>
      
      {/* Search and filter bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search issues by title, description, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2 border-gray-300 focus:ring-primary focus:border-primary"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          {/* Category filter */}
          <div className="w-full md:w-48">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="water-pollution">Water Pollution</SelectItem>
                <SelectItem value="air-pollution">Air Pollution</SelectItem>
                <SelectItem value="waste-management">Waste Management</SelectItem>
                <SelectItem value="soil-contamination">Soil Contamination</SelectItem>
                <SelectItem value="habitat-destruction">Habitat Destruction</SelectItem>
                <SelectItem value="noise-pollution">Noise Pollution</SelectItem>
                <SelectItem value="light-pollution">Light Pollution</SelectItem>
                <SelectItem value="deforestation">Deforestation</SelectItem>
                <SelectItem value="wildlife-concerns">Wildlife Concerns</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Status filter */}
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="REPORTED">Reported</SelectItem>
                <SelectItem value="UNDER_INVESTIGATION">Under Investigation</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Urgency filter */}
          <div className="w-full md:w-48">
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Urgencies</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Sort dropdown */}
          <div className="w-full md:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="most-viewed">Most viewed</SelectItem>
                <SelectItem value="most-liked">Most liked</SelectItem>
                <SelectItem value="most-commented">Most commented</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Active filters */}
        {(Object.keys(activeFilters).length > 0 || searchQuery) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1 py-1">
                Search: {searchQuery.length > 20 ? `${searchQuery.substring(0, 20)}...` : searchQuery}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {activeFilters.category && (
              <Badge variant="secondary" className="flex items-center gap-1 py-1">
                Category: {activeFilters.category.charAt(0).toUpperCase() + activeFilters.category.slice(1).replace(/-/g, ' ')}
                <button 
                  onClick={() => removeFilter('category')}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {activeFilters.status && (
              <Badge variant="secondary" className="flex items-center gap-1 py-1">
                Status: {activeFilters.status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                <button 
                  onClick={() => removeFilter('status')}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {activeFilters.urgency && (
              <Badge variant="secondary" className="flex items-center gap-1 py-1">
                Urgency: {activeFilters.urgency.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                <button 
                  onClick={() => removeFilter('urgency')}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="ml-2 text-sm"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
      
      {/* Results section */}
      <div>
        {/* Results count and view options */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {isLoading 
              ? 'Loading issues...' 
              : `Showing ${filteredIssues.length} ${filteredIssues.length === 1 ? 'issue' : 'issues'}`
            }
          </p>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" className="px-3 bg-primary/5 text-primary text-xs" disabled>
              Map View
              <Badge variant="secondary" className="ml-2 text-[10px] px-1 py-0 h-4">Soon</Badge>
            </Button>
          </div>
        </div>
        
        {/* Issue cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton loaders
            Array.from({ length: 6 }).map((_, index) => (
              <IssueCardSkeleton key={index} />
            ))
          ) : filteredIssues.length > 0 ? (
            // Actual issue cards
            filteredIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))
          ) : (
            // No results
            <div className="col-span-3 py-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Filter className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No issues found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                No issues match your current filters. Try changing your search or filter criteria.
              </p>
              <Button onClick={clearAllFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 