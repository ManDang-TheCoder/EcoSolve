'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Award,
  Mail,
  User,
  Star,
  ArrowUpRight,
  MessageSquare,
  Leaf,
  Globe,
  Share2,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for the selected user
const MOCK_USER = {
  id: 'u3',
  name: 'Sophia Rodriguez',
  username: 'sophiar',
  role: 'Expert',
  bio: 'Marine biologist studying the impact of climate change on coral reefs. PhD in Oceanography from the University of Miami. I have been working on coral reef conservation for over 7 years, with a focus on developing resilient reef ecosystems in the face of rising ocean temperatures.',
  location: 'Miami, FL',
  imageUrl: '/placeholder-user.jpg',
  expertise: ['Marine Biology', 'Climate Change', 'Coral Reef Conservation', 'Ocean Acidification'],
  projectsCount: 17,
  joinDate: '2021-11-05',
  issuesResolved: 14,
  education: [
    {
      degree: 'PhD in Oceanography',
      institution: 'University of Miami',
      year: '2020'
    },
    {
      degree: 'MSc in Marine Biology',
      institution: 'University of California, San Diego',
      year: '2017'
    },
    {
      degree: 'BSc in Environmental Science',
      institution: 'University of Florida',
      year: '2015'
    }
  ],
  contact: {
    email: 'sophia.r@example.com',
    website: 'www.sophiaresearch.com'
  },
  projects: [
    {
      id: 'p1',
      title: 'Coral Reef Restoration Initiative',
      description: 'Leading a team to restore damaged coral reefs using innovative transplantation techniques.',
      status: 'In Progress',
      date: '2023-05-10'
    },
    {
      id: 'p2',
      title: 'Ocean Acidification Monitoring Program',
      description: 'Establishing a network of pH monitoring stations along the Florida coastline.',
      status: 'Completed',
      date: '2022-12-15'
    },
    {
      id: 'p3',
      title: 'Climate Change Impact Assessment on Marine Ecosystems',
      description: 'Comprehensive study analyzing the effects of rising temperatures on various marine species.',
      status: 'In Progress',
      date: '2023-08-22'
    }
  ],
  activities: [
    {
      id: 'a1',
      type: 'Event',
      title: 'Beach Cleanup Initiative',
      description: 'Organized a community beach cleanup that removed over 500 pounds of plastic waste.',
      date: '2023-07-15'
    },
    {
      id: 'a2',
      type: 'Report',
      title: 'Water Quality Assessment Report',
      description: 'Published findings on water quality improvements following conservation efforts.',
      date: '2023-06-20'
    },
    {
      id: 'a3',
      type: 'Discussion',
      title: 'Participated in "Future of Marine Conservation" forum',
      description: 'Contributed expertise to a community discussion on sustainable fishing practices.',
      date: '2023-05-30'
    },
    {
      id: 'a4',
      type: 'Issue',
      title: 'Resolved issue: "Chemical discharge in Florida Bay"',
      description: 'Helped identify source of pollution and worked with authorities to address the problem.',
      date: '2023-04-12'
    }
  ],
  groups: [
    {
      id: 'g1',
      name: 'Ocean Guardians',
      role: 'Scientific Advisor',
      members: 42
    },
    {
      id: 'g2',
      name: 'Climate Change Action Network',
      role: 'Member',
      members: 156
    },
    {
      id: 'g3',
      name: 'Marine Conservation Alliance',
      role: 'Research Lead',
      members: 87
    }
  ]
};

export default function UserProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  // In a real app, we would fetch the user data based on the userId
  const user = MOCK_USER;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/community/users" className="flex items-center text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Community Members
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - User profile */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader className="text-center pb-2">
                <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-green-100">
                  <AvatarImage src={user.imageUrl} alt={user.name} />
                  <AvatarFallback className="text-3xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-bold text-green-800">{user.name}</CardTitle>
                <CardDescription className="text-gray-500">@{user.username}</CardDescription>
                <Badge className="mt-2 bg-green-100 text-green-700 border-none">
                  {user.role}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-700">{user.projectsCount}</p>
                    <p className="text-xs text-gray-500">Projects</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-700">{user.issuesResolved}</p>
                    <p className="text-xs text-gray-500">Issues Resolved</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">BIO</h3>
                  <p className="text-gray-700">{user.bio}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">EXPERTISE</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.expertise.map(exp => (
                      <Badge key={exp} variant="secondary" className="bg-blue-50 text-blue-700">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    {user.location}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-green-600" />
                    Joined {formatDate(user.joinDate)}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2 text-green-600" />
                    {user.contact.email}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Globe className="h-4 w-4 mr-2 text-green-600" />
                    {user.contact.website}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex-1 mr-2 border-green-200 text-green-700 hover:bg-green-50">
                  <Mail className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <User className="mr-2 h-4 w-4" />
                  Follow
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-gray-500">{edu.institution}, {edu.year}</p>
                    {index < user.education.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.groups.map((group, index) => (
                  <div key={group.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-gray-500">{group.role}</p>
                    </div>
                    <Badge variant="outline">{group.members} members</Badge>
                    {index < user.groups.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="w-full text-green-700">
                  <Link href="/groups">
                    View All Groups
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Right column - Activities, projects */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Tabs defaultValue="activity">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="activity" className="flex items-center">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center">
                  <Leaf className="mr-2 h-4 w-4" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="contributions" className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  Contributions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="space-y-4">
                <h2 className="text-xl font-bold text-green-800 mb-4">Recent Activity</h2>
                
                {user.activities.map(activity => (
                  <Card key={activity.id} className="mb-4 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {activity.type === 'Event' && (
                            <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                          )}
                          {activity.type === 'Report' && (
                            <FileText className="h-5 w-5 mr-3 text-blue-600" />
                          )}
                          {activity.type === 'Discussion' && (
                            <MessageSquare className="h-5 w-5 mr-3 text-amber-600" />
                          )}
                          {activity.type === 'Issue' && (
                            <ArrowUpRight className="h-5 w-5 mr-3 text-red-600" />
                          )}
                          <CardTitle className="text-lg font-medium">{activity.title}</CardTitle>
                        </div>
                        <Badge variant="outline">{activity.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-gray-600">{activity.description}</p>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between text-sm text-gray-500">
                      <div>{formatDate(activity.date)}</div>
                      <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 p-0">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="projects" className="space-y-6">
                <h2 className="text-xl font-bold text-green-800 mb-4">Projects</h2>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.projects.map(project => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          <div>
                            {project.title}
                            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            project.status === "Completed" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-amber-100 text-amber-700"
                          }>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(project.date)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-50">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="text-center">
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/projects">
                      View All Projects
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="contributions" className="space-y-6">
                <h2 className="text-xl font-bold text-green-800 mb-4">Contributions & Impact</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-green-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-3xl font-bold text-green-700 text-center">{user.issuesResolved}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-gray-700">
                      Environmental Issues Resolved
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-3xl font-bold text-blue-700 text-center">152</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-gray-700">
                      Community Questions Answered
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-3xl font-bold text-purple-700 text-center">38</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-gray-700">
                      Events Participated In
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">Impact Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Marine Conservation</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Climate Action</span>
                          <span className="text-sm font-medium">70%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Education & Awareness</span>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Policy Advocacy</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">Awards & Recognition</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Award className="h-5 w-5 mr-3 text-amber-500 mt-1" />
                      <div>
                        <p className="font-medium">Community Champion</p>
                        <p className="text-sm text-gray-500">Awarded for exceptional contributions to marine conservation</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start">
                      <Award className="h-5 w-5 mr-3 text-amber-500 mt-1" />
                      <div>
                        <p className="font-medium">Top Knowledge Contributor</p>
                        <p className="text-sm text-gray-500">Recognized for providing valuable expertise to community members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 