'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Search, 
  Filter, 
  Globe,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Leaf,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Mock data for demonstration
const MOCK_GROUPS = [
  {
    id: 'g1',
    name: 'River Cleanup Crew',
    description: 'Dedicated to cleaning up local waterways and preventing pollution',
    imageUrl: '/placeholder.jpg',
    category: 'water-conservation',
    members: 32,
    location: 'Portland, OR'
  },
  {
    id: 'g2',
    name: 'Urban Gardeners',
    description: 'Transforming urban spaces into thriving gardens and green spaces',
    imageUrl: '/placeholder.jpg',
    category: 'urban-greening',
    members: 47,
    location: 'Seattle, WA'
  },
  {
    id: 'g3',
    name: 'Wildlife Protectors',
    description: 'Working to protect endangered species and restore natural habitats',
    imageUrl: '/placeholder.jpg',
    category: 'wildlife-conservation',
    members: 28,
    location: 'Denver, CO'
  },
  {
    id: 'g4',
    name: 'Sustainable Energy Advocates',
    description: 'Promoting renewable energy solutions and reducing carbon footprints',
    imageUrl: '/placeholder.jpg',
    category: 'renewable-energy',
    members: 54,
    location: 'Austin, TX'
  },
];

const MOCK_EVENTS = [
  {
    id: 'e1',
    title: 'Beach Cleanup Day',
    description: 'Join us for a community beach cleanup event to remove trash and plastics',
    date: '2023-08-20T10:00:00',
    location: 'Sunset Beach, CA',
    imageUrl: '/placeholder.jpg',
    organizer: 'Ocean Guardians',
    attendees: 42
  },
  {
    id: 'e2',
    title: 'Tree Planting Weekend',
    description: 'Help us plant 200 new trees in the city park to improve air quality',
    date: '2023-08-26T09:00:00',
    location: 'Central Park, NY',
    imageUrl: '/placeholder.jpg',
    organizer: 'Urban Foresters',
    attendees: 67
  },
  {
    id: 'e3',
    title: 'Environmental Policy Workshop',
    description: 'Learn about local environmental policies and how to advocate for change',
    date: '2023-09-05T18:00:00',
    location: 'Community Center, Chicago, IL',
    imageUrl: '/placeholder.jpg',
    organizer: 'Policy Changers',
    attendees: 23
  },
];

const MOCK_EXPERTS = [
  {
    id: 'ex1',
    name: 'Dr. Emily Chen',
    expertise: 'Marine Biology',
    imageUrl: '/placeholder-user.jpg',
    bio: 'Specializing in ocean ecosystems and the impact of climate change on marine life',
    answerCount: 87
  },
  {
    id: 'ex2',
    name: 'Prof. James Wilson',
    expertise: 'Renewable Energy',
    imageUrl: '/placeholder-user.jpg',
    bio: 'Expert in solar and wind energy implementation for residential and community projects',
    answerCount: 124
  },
  {
    id: 'ex3',
    name: 'Sarah Johnson, PhD',
    expertise: 'Conservation Biology',
    imageUrl: '/placeholder-user.jpg',
    bio: 'Focused on habitat restoration and endangered species protection strategies',
    answerCount: 56
  },
];

const MOCK_DISCUSSIONS = [
  {
    id: 'd1',
    title: 'What can we do about microplastics in our local river?',
    author: 'Michael T.',
    replies: 23,
    lastActive: '2 hours ago',
    tags: ['water-pollution', 'plastics', 'local-action']
  },
  {
    id: 'd2',
    title: 'Best practices for home composting in small spaces?',
    author: 'Amanda W.',
    replies: 45,
    lastActive: '1 day ago',
    tags: ['composting', 'waste-reduction', 'urban-living']
  },
  {
    id: 'd3',
    title: 'How effective are personal carbon offset programs?',
    author: 'David K.',
    replies: 34,
    lastActive: '3 days ago',
    tags: ['carbon-footprint', 'climate-action', 'offsets']
  },
];

export default function CommunityPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('groups');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center text-green-800 mb-4">Join the Environmental Community</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Connect with like-minded individuals, join groups, participate in events, and work together to create positive environmental change in your community.
          </p>
        </motion.div>
        </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search communities, events, or discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="water">Water Conservation</SelectItem>
                <SelectItem value="wildlife">Wildlife Protection</SelectItem>
                <SelectItem value="climate">Climate Action</SelectItem>
                <SelectItem value="waste">Waste Reduction</SelectItem>
                <SelectItem value="energy">Renewable Energy</SelectItem>
                <SelectItem value="agriculture">Sustainable Agriculture</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="groups" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="groups" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Groups</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="experts" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Experts</span>
              </TabsTrigger>
              <TabsTrigger value="discussions" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Discussions</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center" onClick={() => router.push('/community/users')}>
                <User className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="groups" className="space-y-6">
              {MOCK_GROUPS.map(group => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image
                          src={group.imageUrl}
                          alt={group.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <CardHeader className="p-0 pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl font-bold text-green-800">{group.name}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {group.location}
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {group.members} members
                            </Badge>
                          </div>
                </CardHeader>
                        <CardContent className="p-0 py-4">
                          <p className="text-gray-600">{group.description}</p>
                </CardContent>
                        <CardFooter className="p-0 pt-2 flex items-center justify-between">
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                            {group.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Badge>
                          <Button asChild variant="default" className="bg-green-600 hover:bg-green-700">
                            <Link href={`/groups/${group.id}`}>
                              View Group
                  </Link>
                          </Button>
                </CardFooter>
                      </div>
                    </div>
              </Card>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-8">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/groups">
                    View All Groups <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-6">
              {MOCK_EVENTS.map(event => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {formatDate(event.date)}
                    </div>
                  </div>
                      <div className="flex-1 p-6">
                        <CardHeader className="p-0 pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl font-bold text-green-800">{event.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatTime(event.date)}
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              {event.attendees} attending
                            </Badge>
                    </div>
                        </CardHeader>
                        <CardContent className="p-0 py-4">
                          <p className="text-gray-600 mb-2">{event.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                    </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Organized by: {event.organizer}
                  </div>
                </CardContent>
                        <CardFooter className="p-0 pt-2 flex justify-end">
                          <Button asChild variant="default" className="bg-green-600 hover:bg-green-700">
                            <Link href={`/events/${event.id}`}>
                              View Event
                    </Link>
                  </Button>
                </CardFooter>
                      </div>
                    </div>
              </Card>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-8">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/events">
                    View All Events <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                    </div>
            </TabsContent>
            
            <TabsContent value="experts" className="space-y-6">
              {MOCK_EXPERTS.map(expert => (
                <motion.div
                  key={expert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center">
                        <Avatar className="h-16 w-16 mr-4 border-2 border-green-100">
                          <AvatarImage src={expert.imageUrl} alt={expert.name} />
                          <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                        <div>
                          <CardTitle className="text-xl font-bold text-green-800">{expert.name}</CardTitle>
                          <Badge className="mt-1 bg-teal-100 text-teal-700 hover:bg-teal-200 border-none">
                            {expert.expertise}
                          </Badge>
                    </div>
                  </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-gray-600">{expert.bio}</p>
                      <div className="mt-3 text-sm text-gray-500">
                        <span className="font-medium text-green-700">{expert.answerCount}</span> questions answered
                  </div>
                </CardContent>
                    <CardFooter className="pt-0 flex justify-end">
                      <Button asChild variant="default" className="bg-green-600 hover:bg-green-700">
                        <Link href={`/experts/${expert.id}`}>
                          View Profile
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-8">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/experts">
                    View All Experts <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
          </TabsContent>
          
            <TabsContent value="discussions" className="space-y-4">
              {MOCK_DISCUSSIONS.map(discussion => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-green-800">
                        <Link href={`/community/discussions/${discussion.id}`} className="hover:text-green-600">
                          {discussion.title}
                        </Link>
                      </CardTitle>
                </CardHeader>
                    <CardContent className="py-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {discussion.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                </CardContent>
                    <CardFooter className="flex justify-between pt-3 border-t">
                      <div className="text-sm text-gray-500">
                        Posted by <span className="font-medium">{discussion.author}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">{discussion.lastActive}</span>
                        <Badge variant="outline">
                          {discussion.replies} replies
                        </Badge>
                      </div>
                </CardFooter>
              </Card>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-8">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/community/discussions">
                    View All Discussions <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-green-800 flex items-center">
                <Leaf className="mr-2 h-5 w-5" />
                Get Involved
              </CardTitle>
                </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/report-issue">
                  Report an Environmental Issue
                    </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-100">
                <Link href="/groups/create">
                  Create a New Group
                    </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-100">
                <Link href="/events/create">
                  Organize an Event
                    </Link>
              </Button>
                </CardContent>
              </Card>
              
              <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-green-800 flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Environmental Impact
              </CardTitle>
                </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Issues Reported</span>
                <span className="font-semibold text-green-700">1,248</span>
            </div>
              <Separator />
                <div className="flex justify-between items-center">
                <span className="text-gray-600">Issues Resolved</span>
                <span className="font-semibold text-green-700">912</span>
                  </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Volunteers</span>
                <span className="font-semibold text-green-700">3,582</span>
                </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Community Groups</span>
                <span className="font-semibold text-green-700">127</span>
                </div>
              </CardContent>
            </Card>
          
            <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-green-800">Popular Categories</CardTitle>
              </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                Water Conservation
              </Badge>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">
                Wildlife Protection
              </Badge>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">
                Climate Action
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">
                Renewable Energy
              </Badge>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">
                Pollution Control
              </Badge>
              <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200 border-none">
                Sustainable Living
              </Badge>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
} 