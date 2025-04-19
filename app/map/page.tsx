'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { 
  Layers, 
  Filter, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Loader2,
  X,
  Info
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

// Get Mapbox token from env
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Types for environmental issues
interface IssueMarker {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'PENDING' | 'VERIFIED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  latitude: number;
  longitude: number;
  location: string;
  createdAt: string;
  reportedBy: {
    name: string;
  };
}

// Mock data for demonstration
const MOCK_ISSUES: IssueMarker[] = [
  {
    id: '1',
    title: 'River Pollution Near Industrial Area',
    description: 'Chemical discharge from local factory causing water discoloration and fish mortality',
    category: 'water-pollution',
    status: 'VERIFIED',
    urgency: 'HIGH',
    latitude: 37.7749,
    longitude: -122.4194,
    location: 'San Francisco, CA',
    createdAt: '2023-07-15T10:30:00Z',
    reportedBy: {
      name: 'John Doe'
    }
  },
  {
    id: '2',
    title: 'Illegal Dumping in Forest Reserve',
    description: 'Construction waste being dumped in protected forest area, endangering local wildlife',
    category: 'waste-management',
    status: 'IN_PROGRESS',
    urgency: 'MEDIUM',
    latitude: 37.3382,
    longitude: -121.8863,
    location: 'San Jose, CA',
    createdAt: '2023-07-18T15:20:00Z',
    reportedBy: {
      name: 'Emily Chen'
    }
  },
  {
    id: '3',
    title: 'Air Quality Concerns from Factory Emissions',
    description: 'Nearby residents complaining of poor air quality and respiratory issues due to factory smoke',
    category: 'air-pollution',
    status: 'PENDING',
    urgency: 'CRITICAL',
    latitude: 37.8044,
    longitude: -122.2711,
    location: 'Oakland, CA',
    createdAt: '2023-07-20T09:15:00Z',
    reportedBy: {
      name: 'Michael Brown'
    }
  },
  {
    id: '4',
    title: 'Habitat Destruction for New Development',
    description: 'Land clearing for new commercial development threatening local endangered species',
    category: 'habitat-destruction',
    status: 'VERIFIED',
    urgency: 'HIGH',
    latitude: 37.4419,
    longitude: -122.1430,
    location: 'Palo Alto, CA',
    createdAt: '2023-07-22T14:45:00Z',
    reportedBy: {
      name: 'Sarah Johnson'
    }
  },
  {
    id: '5',
    title: 'Soil Contamination in Community Garden',
    description: 'Tests indicate high levels of lead and other heavy metals in soil used for growing vegetables',
    category: 'soil-contamination',
    status: 'IN_PROGRESS',
    urgency: 'MEDIUM',
    latitude: 37.6819,
    longitude: -122.4369,
    location: 'South San Francisco, CA',
    createdAt: '2023-07-25T11:10:00Z',
    reportedBy: {
      name: 'David Wilson'
    }
  }
];

// Color mapping for issue categories
const categoryColors: Record<string, string> = {
  'water-pollution': '#3b82f6', // blue
  'air-pollution': '#ef4444', // red
  'waste-management': '#f59e0b', // amber
  'deforestation': '#10b981', // emerald
  'habitat-destruction': '#8b5cf6', // violet
  'endangered-species': '#ec4899', // pink
  'climate-impacts': '#6366f1', // indigo
  'soil-contamination': '#854d0e', // amber-800
  'noise-pollution': '#9ca3af', // gray
  'default': '#6b7280', // gray-500
};

// Name formatting helper
const formatCategoryName = (category: string) => {
  return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Status badge color mapping
const statusColors: Record<string, string> = {
  'PENDING': 'bg-yellow-100 text-yellow-800',
  'VERIFIED': 'bg-blue-100 text-blue-800',
  'IN_PROGRESS': 'bg-purple-100 text-purple-800',
  'RESOLVED': 'bg-green-100 text-green-800',
  'REJECTED': 'bg-red-100 text-red-800',
};

// Urgency badge color mapping
const urgencyColors: Record<string, string> = {
  'LOW': 'bg-gray-100 text-gray-800',
  'MEDIUM': 'bg-blue-100 text-blue-800',
  'HIGH': 'bg-orange-100 text-orange-800',
  'CRITICAL': 'bg-red-100 text-red-800',
};

export default function MapPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Record<string, mapboxgl.Marker>>({});
  const popup = useRef<mapboxgl.Popup | null>(null);
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueMarker | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [filteredIssues, setFilteredIssues] = useState<IssueMarker[]>(MOCK_ISSUES);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
      
    if (!mapboxgl.supported()) {
      console.error('Mapbox GL is not supported by your browser');
        return;
      }
      
    // Create map
    map.current = new mapboxgl.Map({
          container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-122.4194, 37.7749], // San Francisco
          zoom: 9
        });
        
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());
    
    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
    
    // Create popup but don't add to map yet
    popup.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
    
    // Map load event
    map.current.on('load', () => {
          setMapLoaded(true);
          
      // Check URL parameters for issue selection
      const issueId = searchParams.get('issue');
      if (issueId) {
        const issue = MOCK_ISSUES.find(i => i.id === issueId);
        if (issue) {
          setSelectedIssue(issue);
          map.current?.flyTo({
            center: [issue.longitude, issue.latitude],
            zoom: 14,
            essential: true
          });
        }
      }
    });
    
    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [searchParams]);
  
  // Add markers when map is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};
    
    // Add filtered markers to map
    filteredIssues.forEach(issue => {
      // Create a marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '25px';
      el.style.height = '25px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = categoryColors[issue.category] || categoryColors.default;
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 0 2px rgba(0, 0, 0, 0.1)';
      el.style.cursor = 'pointer';
          
      // Add pulse effect for high urgency issues
      if (issue.urgency === 'HIGH' || issue.urgency === 'CRITICAL') {
        el.style.animation = 'pulse 2s infinite';
        const keyframes = `
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(${issue.urgency === 'CRITICAL' ? '239, 68, 68' : '249, 115, 22'}, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(${issue.urgency === 'CRITICAL' ? '239, 68, 68' : '249, 115, 22'}, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(${issue.urgency === 'CRITICAL' ? '239, 68, 68' : '249, 115, 22'}, 0);
            }
          }
        `;
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(keyframes));
        document.head.appendChild(style);
      }
      
      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([issue.longitude, issue.latitude])
        .addTo(map.current!);
          
      // Store marker reference
      markers.current[issue.id] = marker;
      
      // Add events to marker
      el.addEventListener('mouseenter', () => {
        if (popup.current && map.current) {
          popup.current
            .setLngLat([issue.longitude, issue.latitude])
            .setHTML(`
              <div style="font-family: system-ui, sans-serif; padding: 4px;">
                <div style="font-weight: 600; margin-bottom: 4px;">${issue.title}</div>
                <div style="font-size: 12px;">${formatCategoryName(issue.category)}</div>
              </div>
            `)
            .addTo(map.current);
        }
      });
      
      el.addEventListener('mouseleave', () => {
        if (popup.current) {
          popup.current.remove();
        }
      });
      
      el.addEventListener('click', () => {
        setSelectedIssue(issue);
          });
        });
  }, [filteredIssues, mapLoaded]);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...MOCK_ISSUES];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(term) || 
        issue.description.toLowerCase().includes(term) ||
        issue.location.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
      }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }
    
    // Apply urgency filter
    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(issue => issue.urgency === urgencyFilter);
    }
    
    setFilteredIssues(filtered);
  }, [searchTerm, categoryFilter, statusFilter, urgencyFilter]);
  
  // Center map on selected issue
  useEffect(() => {
    if (!map.current || !selectedIssue) return;
    
    map.current.flyTo({
      center: [selectedIssue.longitude, selectedIssue.latitude],
      zoom: 14,
      essential: true
    });
    
    // Update URL with selected issue ID
    const url = new URL(window.location.href);
    url.searchParams.set('issue', selectedIssue.id);
    window.history.pushState({}, '', url.toString());
  }, [selectedIssue]);
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setUrgencyFilter('all');
  };
  
  // Fly to overview
  const showAllIssues = () => {
    if (!map.current) return;
    
    setSelectedIssue(null);
    
    // Calculate bounds that include all filtered issues
    if (filteredIssues.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      filteredIssues.forEach(issue => {
        bounds.extend([issue.longitude, issue.latitude]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 13
      });
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-green-600 mb-4" />
            <p className="text-lg font-medium text-green-800">Loading map...</p>
          </div>
          </div>
        )}
        
      {/* Control panel */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <Card className="shadow-lg w-[350px]">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-lg flex items-center">
              Environmental Issues Map
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-2 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[220px] text-xs">
                      This map shows reported environmental issues in your community. 
                      Click on markers to view details and track progress.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
              {searchTerm && (
                <button 
                  className="absolute right-2 top-2.5"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">Category</p>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="water-pollution">Water Pollution</SelectItem>
                    <SelectItem value="air-pollution">Air Pollution</SelectItem>
                    <SelectItem value="waste-management">Waste Management</SelectItem>
                    <SelectItem value="habitat-destruction">Habitat Destruction</SelectItem>
                    <SelectItem value="soil-contamination">Soil Contamination</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="VERIFIED">Verified</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Urgency</p>
                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger className="h-8 text-xs w-[160px]">
                    <SelectValue placeholder="All Urgency Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgency Levels</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                disabled={categoryFilter === 'all' && statusFilter === 'all' && urgencyFilter === 'all' && !searchTerm}
                className="mt-auto"
              >
                Reset Filters
              </Button>
            </div>
          </CardContent>
          <CardFooter className="py-2 px-4 flex justify-between">
            <p className="text-sm text-gray-500">
              {filteredIssues.length} {filteredIssues.length === 1 ? 'issue' : 'issues'} found
            </p>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={showAllIssues}
                className="text-xs"
              >
                View All
              </Button>
              
              <Sheet open={isListOpen} onOpenChange={setIsListOpen}>
                <SheetTrigger asChild>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                    <List className="h-4 w-4 mr-1" /> List View
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[380px] sm:w-[540px] p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle>Environmental Issues</SheetTitle>
                    <SheetDescription>
                      List of reported environmental issues
                    </SheetDescription>
                  </SheetHeader>
                  
                  <ScrollArea className="h-[calc(100vh-150px)]">
                    <div className="p-4 space-y-4">
                      {filteredIssues.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No issues match your filters</p>
                          <Button 
                            variant="link" 
                            onClick={resetFilters}
                            className="mt-2"
                          >
                            Reset Filters
                          </Button>
                        </div>
                      ) : (
                        filteredIssues.map(issue => (
                          <Card 
                            key={issue.id} 
                            className={`hover:shadow-md transition-shadow ${selectedIssue?.id === issue.id ? 'border-green-300 shadow-green-100' : ''}`}
                          >
                            <CardHeader className="py-3 px-4">
                              <CardTitle className="text-base">{issue.title}</CardTitle>
                              <CardDescription className="flex items-center text-xs">
                                Reported on {formatDate(issue.createdAt)} by {issue.reportedBy.name}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="py-2 px-4">
                              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {issue.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge className={`bg-${categoryColors[issue.category].substring(1)} text-white`}>
                                  {formatCategoryName(issue.category)}
                                </Badge>
                                <Badge className={statusColors[issue.status]}>
                                  {issue.status.charAt(0) + issue.status.slice(1).toLowerCase().replace('_', ' ')}
                                </Badge>
                                <Badge className={urgencyColors[issue.urgency]}>
                                  {issue.urgency.charAt(0) + issue.urgency.slice(1).toLowerCase()} Urgency
                                </Badge>
          </div>
                              <p className="text-xs text-gray-500 flex items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {issue.location}
                              </p>
                            </CardContent>
                            <CardFooter className="py-2 px-4 flex justify-between">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedIssue(issue);
                                  setIsListOpen(false);
                                }}
                              >
                                View on Map
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => router.push(`/reports/${issue.id}`)}
                              >
                                View Details
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </CardFooter>
        </Card>
        
        <Button
          variant="outline"
          size="sm"
          className="bg-white shadow"
          onClick={() => router.push('/report-issue')}
        >
          Report New Issue
        </Button>
      </div>
      
      {/* Issue details panel */}
      {selectedIssue && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="w-[90vw] max-w-[500px] shadow-lg">
            <CardHeader className="py-3 px-4 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg">{selectedIssue.title}</CardTitle>
                <CardDescription className="mt-1">
                  Reported by {selectedIssue.reportedBy.name} on {formatDate(selectedIssue.createdAt)}
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedIssue(null)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-sm text-gray-600 mb-3">
                {selectedIssue.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={`bg-${categoryColors[selectedIssue.category].substring(1)} text-white`}>
                  {formatCategoryName(selectedIssue.category)}
                </Badge>
                <Badge className={statusColors[selectedIssue.status]}>
                  {selectedIssue.status.charAt(0) + selectedIssue.status.slice(1).toLowerCase().replace('_', ' ')}
                </Badge>
                <Badge className={urgencyColors[selectedIssue.urgency]}>
                  {selectedIssue.urgency.charAt(0) + selectedIssue.urgency.slice(1).toLowerCase()} Urgency
                </Badge>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {selectedIssue.location}
              </p>
            </CardContent>
            <CardFooter className="py-3 px-4 flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Find index in filtered issues
                  const currentIndex = filteredIssues.findIndex(i => i.id === selectedIssue.id);
                  if (currentIndex > 0) {
                    setSelectedIssue(filteredIssues[currentIndex - 1]);
                  }
                }}
                disabled={filteredIssues.findIndex(i => i.id === selectedIssue.id) <= 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => router.push(`/reports/${selectedIssue.id}`)}
              >
                View Full Details
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Find index in filtered issues
                  const currentIndex = filteredIssues.findIndex(i => i.id === selectedIssue.id);
                  if (currentIndex < filteredIssues.length - 1) {
                    setSelectedIssue(filteredIssues[currentIndex + 1]);
                  }
                }}
                disabled={filteredIssues.findIndex(i => i.id === selectedIssue.id) >= filteredIssues.length - 1}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-10">
        <Card className="shadow-lg">
          <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm">Map Legend</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs">Water Pollution</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs">Air Pollution</span>
              </div>
          <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-xs">Waste Management</span>
          </div>
          <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-violet-500 mr-2"></div>
                <span className="text-xs">Habitat Destruction</span>
          </div>
          <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-amber-800 mr-2"></div>
                <span className="text-xs">Soil Contamination</span>
              </div>
              <Separator className="my-1" />
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse mr-2"></div>
                <span className="text-xs">High/Critical Urgency</span>
          </div>
        </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 