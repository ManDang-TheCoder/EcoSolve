'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import { 
  Layers, 
  Filter, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Loader2,
  X,
  Info,
  MessageCircle,
  Users,
  Send
} from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Dynamic import for Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Add Leaflet CSS
import 'leaflet/dist/leaflet.css';

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
    id: string;
    image?: string;
  };
  participants: {
    id: string;
    name: string;
    role: string;
    image?: string;
  }[];
  messages: {
    id: string;
    userId: string;
    userName: string;
    userImage?: string;
    text: string;
    timestamp: string;
  }[];
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
      id: 'user1',
      name: 'John Doe',
      image: '/placeholder-user.jpg'
    },
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        role: 'Reporter',
        image: '/placeholder-user.jpg'
      },
      {
        id: 'user2',
        name: 'Alice Smith',
        role: 'Environmental Scientist',
        image: '/placeholder-user.jpg'
      },
      {
        id: 'user3',
        name: 'Robert Johnson',
        role: 'Local Resident',
        image: '/placeholder-user.jpg'
      }
    ],
    messages: [
      {
        id: 'msg1',
        userId: 'user1',
        userName: 'John Doe',
        userImage: '/placeholder-user.jpg',
        text: 'I noticed the water has a strange color and there are dead fish floating near the shore.',
        timestamp: '2023-07-15T10:35:00Z'
      },
      {
        id: 'msg2',
        userId: 'user2',
        userName: 'Alice Smith',
        userImage: '/placeholder-user.jpg',
        text: "I\'ll come take samples tomorrow. Could you share more photos of the affected area?",
        timestamp: '2023-07-15T11:20:00Z'
      }
    ]
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
      id: 'user4',
      name: 'Emily Chen',
      image: '/placeholder-user.jpg'
    },
    participants: [
      {
        id: 'user4',
        name: 'Emily Chen',
        role: 'Reporter',
        image: '/placeholder-user.jpg'
      },
      {
        id: 'user5',
        name: 'Mark Wilson',
        role: 'Park Ranger',
        image: '/placeholder-user.jpg'
      }
    ],
    messages: [
      {
        id: 'msg3',
        userId: 'user4',
        userName: 'Emily Chen',
        userImage: '/placeholder-user.jpg',
        text: 'I found large piles of construction materials dumped in the forest while hiking today.',
        timestamp: '2023-07-18T15:25:00Z'
      },
      {
        id: 'msg4',
        userId: 'user5',
        userName: 'Mark Wilson',
        userImage: '/placeholder-user.jpg',
        text: 'Thanks for reporting. I\'ve informed enforcement. Can you share the exact coordinates?',
        timestamp: '2023-07-18T16:10:00Z'
      }
    ]
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
      id: 'user6',
      name: 'Michael Brown',
      image: '/placeholder-user.jpg'
    },
    participants: [
      {
        id: 'user6',
        name: 'Michael Brown',
        role: 'Reporter',
        image: '/placeholder-user.jpg'
      },
      {
        id: 'user7',
        name: 'Dr. Sarah Lee',
        role: 'Public Health Official',
        image: '/placeholder-user.jpg'
      }
    ],
    messages: [
      {
        id: 'msg5',
        userId: 'user6',
        userName: 'Michael Brown',
        userImage: '/placeholder-user.jpg',
        text: 'The emissions from the factory have been particularly bad this week. Several neighbors have reported breathing difficulties.',
        timestamp: '2023-07-20T09:20:00Z'
      }
    ]
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
      id: 'user8',
      name: 'Sarah Johnson',
      image: '/placeholder-user.jpg'
    },
    participants: [
      {
        id: 'user8',
        name: 'Sarah Johnson',
        role: 'Reporter',
        image: '/placeholder-user.jpg'
      },
      {
        id: 'user9',
        name: 'James Rodriguez',
        role: 'Wildlife Conservationist',
        image: '/placeholder-user.jpg'
      }
    ],
    messages: [
      {
        id: 'msg6',
        userId: 'user8',
        userName: 'Sarah Johnson',
        userImage: '/placeholder-user.jpg',
        text: 'They started clearing the area yesterday and I spotted several endangered species nests that will be destroyed.',
        timestamp: '2023-07-22T14:50:00Z'
      }
    ]
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
      id: 'user10',
      name: 'David Wilson',
      image: '/placeholder-user.jpg'
    },
    participants: [
      {
        id: 'user10',
        name: 'David Wilson',
        role: 'Reporter',
        image: '/placeholder-user.jpg'
      },
      {
        id: 'user11',
        name: 'Lisa Chen',
        role: 'Environmental Engineer',
        image: '/placeholder-user.jpg'
      },
      {
        id: 'user12',
        name: 'Carlos Gomez',
        role: 'Community Garden Manager',
        image: '/placeholder-user.jpg'
      }
    ],
    messages: [
      {
        id: 'msg7',
        userId: 'user10',
        userName: 'David Wilson',
        userImage: '/placeholder-user.jpg',
        text: 'I had our soil tested and the results show concerning levels of lead. We need to stop using this garden immediately.',
        timestamp: '2023-07-25T11:15:00Z'
      },
      {
        id: 'msg8',
        userId: 'user12',
        userName: 'Carlos Gomez',
        userImage: '/placeholder-user.jpg',
        text: 'I\'ve notified all garden members to stop harvesting. Can you share the full test results?',
        timestamp: '2023-07-25T12:30:00Z'
      }
    ]
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

// Fix for Leaflet marker icons in Next.js
useEffect(() => {
  // Only run on client side
  if (typeof window !== "undefined") {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    
    // @ts-ignore
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }
}, []);

export default function MapPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueMarker | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [filteredIssues, setFilteredIssues] = useState<IssueMarker[]>(MOCK_ISSUES);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'chat' | 'participants'>('details');
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Format time for chat messages
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
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
  
  // Set map as loaded once component mounts
  useEffect(() => {
    setMapLoaded(true);
    
    // Check URL parameters for issue selection
    const issueId = searchParams.get('issue');
    if (issueId) {
      const issue = MOCK_ISSUES.find(i => i.id === issueId);
      if (issue) {
        setSelectedIssue(issue);
      }
    }
  }, [searchParams]);
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setUrgencyFilter('all');
  };
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!selectedIssue || !newMessage.trim()) return;
    
    // In a real app, you would send this to your backend
    const now = new Date().toISOString();
    const newMsg = {
      id: `msg${Date.now()}`,
      userId: 'currentUser', // This would be the current user's ID
      userName: 'You', // This would be the current user's name
      userImage: '/placeholder-user.jpg',
      text: newMessage.trim(),
      timestamp: now
    };
    
    // Update local state with the new message
    // In a real app, this would happen after successful API call
    selectedIssue.messages.push(newMsg);
    setNewMessage('');
    
    // Force a re-render
    setSelectedIssue({...selectedIssue});
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      {/* Map container */}
      <div className="absolute inset-0">
        {mapLoaded && (
          <MapContainer
            center={[37.7749, -122.4194]} // San Francisco
            zoom={9}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {filteredIssues.map(issue => (
              <Marker 
                key={issue.id} 
                position={[issue.latitude, issue.longitude]}
                eventHandlers={{
                  click: () => {
                    setSelectedIssue(issue);
                    setActiveTab('details');
                  }
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">{issue.title}</p>
                    <p className="text-xs">{formatCategoryName(issue.category)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
      
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
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
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
                      Click on markers to view details and join group discussions.
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
                      List of reported environmental issues with group discussions
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
                                <Badge className={`text-white`} style={{backgroundColor: categoryColors[issue.category]}}>
                                  {formatCategoryName(issue.category)}
                                </Badge>
                                <Badge className={statusColors[issue.status]}>
                                  {issue.status.charAt(0) + issue.status.slice(1).toLowerCase().replace('_', ' ')}
                                </Badge>
                                <Badge className={urgencyColors[issue.urgency]}>
                                  {issue.urgency.charAt(0) + issue.urgency.slice(1).toLowerCase()} Urgency
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-gray-500 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {issue.location}
                                </p>
                                <div className="flex -space-x-2">
                                  {issue.participants.slice(0, 3).map((participant, i) => (
                                    <Avatar key={i} className="h-6 w-6 border-2 border-white">
                                      <AvatarImage src={participant.image} alt={participant.name} />
                                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                  {issue.participants.length > 3 && (
                                    <div className="h-6 w-6 rounded-full bg-gray-200 text-xs flex items-center justify-center border-2 border-white">
                                      +{issue.participants.length - 3}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="py-2 px-4 flex justify-between">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedIssue(issue);
                                  setActiveTab('details');
                                  setIsListOpen(false);
                                }}
                              >
                                View on Map
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  setSelectedIssue(issue);
                                  setActiveTab('chat');
                                  setIsListOpen(false);
                                }}
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Join Discussion
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
      
      {/* Issue details panel with tabs */}
      {selectedIssue && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000]">
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
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'details' | 'chat' | 'participants')}>
              <TabsList className="grid grid-cols-3 mx-4 mb-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center">
                  Chat 
                  {selectedIssue.messages.length > 0 && (
                    <span className="ml-1 bg-green-100 text-green-800 text-xs rounded-full px-1.5 py-0.5">
                      {selectedIssue.messages.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="participants" className="flex items-center">
                  People
                  <span className="ml-1 bg-gray-100 text-gray-800 text-xs rounded-full px-1.5 py-0.5">
                    {selectedIssue.participants.length}
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="m-0">
                <CardContent className="py-2 px-4">
                  <p className="text-sm text-gray-600 mb-3">
                    {selectedIssue.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="text-white" style={{backgroundColor: categoryColors[selectedIssue.category]}}>
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
                    onClick={() => router.push(`/reports/${selectedIssue.id}`)}
                  >
                    View Full Details
                  </Button>
                  
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setActiveTab('chat')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Discussion
                  </Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="chat" className="m-0">
                <CardContent className="py-2 px-4">
                  <ScrollArea className="h-[200px] pr-4">
                    {selectedIssue.messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-8">
                        <MessageCircle className="h-8 w-8 text-gray-300 mb-2" />
                        <p className="text-gray-500">No messages yet</p>
                        <p className="text-xs text-gray-400">Be the first to start the discussion</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedIssue.messages.map((message) => (
                          <div key={message.id} className="flex items-start gap-2">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src={message.userImage} alt={message.userName} />
                              <AvatarFallback>{message.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-baseline">
                                <p className="font-medium text-sm">{message.userName}</p>
                                <p className="text-xs text-gray-400 ml-2">{formatTime(message.timestamp)}</p>
                              </div>
                              <p className="text-sm text-gray-600">{message.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  
                  <div className="mt-3 flex items-end gap-2">
                    <Textarea 
                      placeholder="Type your message..." 
                      className="min-h-[60px] resize-none"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      className="bg-green-600 hover:bg-green-700 flex-shrink-0"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="participants" className="m-0">
                <CardContent className="py-2 px-4">
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-3">
                      {selectedIssue.participants.map((participant) => (
                        <div key={participant.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={participant.image} alt={participant.name} />
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{participant.name}</p>
                            <p className="text-xs text-gray-500">{participant.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                
                <CardFooter className="py-3 px-4">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => setActiveTab('chat')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Join the Group
                  </Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-[1000]">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 