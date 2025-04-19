'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Award, Calendar, Edit, User, Star, Leaf, BarChart2 } from 'lucide-react';

// Mock user data - in a real app this would come from your auth provider and database
const mockUser = {
  id: 'u1',
  name: 'Alex Johnson',
  role: 'Environmental Volunteer',
  bio: 'Passionate about conservation and sustainable living. Working to make my community greener one project at a time.',
  location: 'Portland, OR',
  joinedDate: 'January 2023',
  avatar: '/placeholder-user.jpg',
  impactPoints: 320,
  badges: [
    { name: 'Clean Water Champion', icon: '/placeholder.jpg' },
    { name: 'Waste Reducer', icon: '/placeholder.jpg' },
    { name: 'Community Leader', icon: '/placeholder.jpg' },
  ],
  skills: ['Water Conservation', 'Community Organizing', 'Waste Management', 'Public Speaking'],
  stats: {
    reportsSubmitted: 12,
    issuesSolved: 8,
    eventsAttended: 15,
    commentsPosted: 47
  }
};

// Mock reports data
const mockReports = [
  {
    id: 'r1',
    title: 'Unauthorized Waste Dumping at River Creek',
    status: 'IN_PROGRESS',
    urgency: 'HIGH',
    date: '2023-08-14',
    location: 'River Creek Park, North Side',
    likes: 24,
    comments: 12
  },
  {
    id: 'r2',
    title: 'Invasive Plant Species in Community Park',
    status: 'RESOLVED',
    urgency: 'MEDIUM',
    date: '2023-07-28',
    location: 'Greenfield Community Park',
    likes: 18,
    comments: 7
  },
  {
    id: 'r3',
    title: 'Water Contamination in Local Pond',
    status: 'VERIFIED',
    urgency: 'CRITICAL',
    date: '2023-09-02',
    location: 'Cedar Ridge Pond',
    likes: 42,
    comments: 28
  }
];

// Mock events data
const mockEvents = [
  {
    id: 'e1',
    title: 'River Cleanup Day',
    date: '2023-10-18',
    location: 'Riverside Park',
    role: 'Volunteer',
    attendees: 34
  },
  {
    id: 'e2',
    title: 'Tree Planting Initiative',
    date: '2023-09-24',
    location: 'Mountain View Trail',
    role: 'Organizer',
    attendees: 22
  },
  {
    id: 'e3',
    title: 'Environmental Awareness Workshop',
    date: '2023-11-05',
    location: 'Community Center',
    role: 'Speaker',
    attendees: 47
  }
];

// Helper function to render status badges
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
    default:
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  }
};

// Helper function to render urgency badges
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

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-8">
        {/* Profile header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 right-4 bg-white"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="px-6 py-4 sm:px-8 sm:py-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 -mt-16 sm:-mt-20">
                <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white overflow-hidden bg-white">
                  <Image
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{mockUser.name}</h1>
                    <p className="text-green-600 font-medium">{mockUser.role}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="bg-green-50 rounded-full px-4 py-2 flex items-center">
                      <Leaf className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <span className="font-bold text-green-800">{mockUser.impactPoints}</span>
                        <span className="text-sm text-green-600 ml-1">Impact Points</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {mockUser.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 px-3 py-1">
                      <Award className="h-3.5 w-3.5 text-green-600" />
                      {badge.name}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mockUser.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {mockUser.joinedDate}
                  </div>
                </div>
                
                <p className="mt-4 text-gray-700">{mockUser.bio}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar with stats and skills */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-green-600" />
                  Activity Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reports Submitted</span>
                  <span className="font-semibold">{mockUser.stats.reportsSubmitted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Issues Solved</span>
                  <span className="font-semibold">{mockUser.stats.issuesSolved}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Events Attended</span>
                  <span className="font-semibold">{mockUser.stats.eventsAttended}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Comments Posted</span>
                  <span className="font-semibold">{mockUser.stats.commentsPosted}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2 text-green-600" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockUser.skills.map((skill, index) => (
                    <Badge key={index} className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-600" />
                  Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-md border border-gray-200 hover:bg-gray-50">
                  <Link href="#" className="font-medium text-green-700 hover:text-green-800">
                    River Cleanup Crew
                  </Link>
                  <p className="text-sm text-gray-500">Member since 2023</p>
                </div>
                <div className="p-3 rounded-md border border-gray-200 hover:bg-gray-50">
                  <Link href="#" className="font-medium text-green-700 hover:text-green-800">
                    Urban Gardeners
                  </Link>
                  <p className="text-sm text-gray-500">Member since 2023</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-2">
            <Tabs defaultValue="reports" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="reports">My Reports</TabsTrigger>
                <TabsTrigger value="events">My Events</TabsTrigger>
                <TabsTrigger value="contributions">Contributions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reports" className="space-y-4">
                {mockReports.map(report => (
                  <Card key={report.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <Link href={`/reports/${report.id}`} className="text-lg font-medium text-green-700 hover:text-green-800">
                            {report.title}
                          </Link>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{report.location}</span>
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm">Reported on {report.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(report.status)}
                          {getUrgencyBadge(report.urgency)}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>{report.likes} likes</span>
                          <span>{report.comments} comments</span>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/reports/${report.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <Link href="/reports/new">
                      Submit New Report
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="space-y-4">
                {mockEvents.map(event => (
                  <Card key={event.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <Link href={`/events/${event.id}`} className="text-lg font-medium text-green-700 hover:text-green-800">
                            {event.title}
                          </Link>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Badge className="bg-purple-100 text-purple-800">{event.role}</Badge>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">{event.attendees} attendees</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/events/${event.id}`}>
                            View Event
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <Link href="/events">
                      Explore More Events
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="contributions" className="p-6 bg-white rounded-lg shadow-sm border">
                <div className="text-center py-8">
                  <BarChart2 className="h-16 w-16 mx-auto text-green-200 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Your Environmental Impact
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Track your contributions to environmental causes and see your impact grow over time.
                  </p>
                  
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">12</div>
                      <div className="text-sm text-gray-600">Reports Filed</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">8</div>
                      <div className="text-sm text-gray-600">Issues Resolved</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-700">15</div>
                      <div className="text-sm text-gray-600">Events Joined</div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-amber-700">320</div>
                      <div className="text-sm text-gray-600">Impact Points</div>
                    </div>
                  </div>
                  
                  <Button className="mt-8">
                    View Detailed Impact
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 