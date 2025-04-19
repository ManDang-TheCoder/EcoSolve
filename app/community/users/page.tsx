'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  ChevronRight,
  Mail,
  MapPin,
  Award,
  Calendar,
  ArrowUpRight,
  UserPlus
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for community users
const MOCK_USERS = [
  {
    id: 'u1',
    name: 'Emma Johnson',
    username: 'emmaj',
    role: 'Community Leader',
    bio: 'Environmental engineer passionate about water conservation and sustainable urban planning.',
    location: 'Portland, OR',
    imageUrl: '/placeholder-user.jpg',
    expertise: ['Water Conservation', 'Urban Planning'],
    projectsCount: 12,
    joinDate: '2022-03-15',
    issuesResolved: 8
  },
  {
    id: 'u2',
    name: 'Marcus Chen',
    username: 'marcusc',
    role: 'Volunteer',
    bio: 'Wildlife photographer documenting endangered species in North America. Advocate for habitat preservation.',
    location: 'Vancouver, BC',
    imageUrl: '/placeholder-user.jpg',
    expertise: ['Wildlife Photography', 'Conservation'],
    projectsCount: 5,
    joinDate: '2022-06-22',
    issuesResolved: 3
  },
  {
    id: 'u3',
    name: 'Sophia Rodriguez',
    username: 'sophiar',
    role: 'Expert',
    bio: 'Marine biologist studying the impact of climate change on coral reefs. PhD in Oceanography.',
    location: 'Miami, FL',
    imageUrl: '/placeholder-user.jpg',
    expertise: ['Marine Biology', 'Climate Change'],
    projectsCount: 17,
    joinDate: '2021-11-05',
    issuesResolved: 14
  },
  {
    id: 'u4',
    name: 'Jamal Washington',
    username: 'jamalw',
    role: 'Volunteer',
    bio: 'Urban gardener transforming vacant lots into community gardens. Specialist in permaculture design.',
    location: 'Detroit, MI',
    imageUrl: '/placeholder-user.jpg',
    expertise: ['Urban Gardening', 'Permaculture'],
    projectsCount: 8,
    joinDate: '2022-09-10',
    issuesResolved: 5
  },
  {
    id: 'u5',
    name: 'Aisha Patel',
    username: 'aishah',
    role: 'Group Leader',
    bio: 'Environmental lawyer focusing on policy advocacy and corporate accountability for pollution.',
    location: 'Chicago, IL',
    imageUrl: '/placeholder-user.jpg',
    expertise: ['Environmental Law', 'Policy Advocacy'],
    projectsCount: 10,
    joinDate: '2022-01-18',
    issuesResolved: 7
  },
  {
    id: 'u6',
    name: 'Thomas Wilson',
    username: 'thomasw',
    role: 'Expert',
    bio: 'Renewable energy consultant specializing in solar power solutions for residential and community projects.',
    location: 'Austin, TX',
    imageUrl: '/placeholder-user.jpg',
    expertise: ['Renewable Energy', 'Solar Power'],
    projectsCount: 15,
    joinDate: '2021-08-30',
    issuesResolved: 11
  },
];

export default function CommunityUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Filter users based on search term and role filter
  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
    
    return matchesSearch && matchesRole;
  });
  
  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center text-green-800 mb-4">Community Members</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Connect with environmental advocates, experts, and volunteers who are making a difference in their communities.
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
                placeholder="Search by name, expertise or bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by role" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="expert">Experts</SelectItem>
                <SelectItem value="volunteer">Volunteers</SelectItem>
                <SelectItem value="community leader">Community Leaders</SelectItem>
                <SelectItem value="group leader">Group Leaders</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-6 mb-8">
            {currentUsers.length > 0 ? (
              currentUsers.map(user => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-6 md:border-r border-gray-100 md:w-1/4 flex flex-col items-center justify-center">
                        <Avatar className="h-24 w-24 mb-4 border-2 border-green-100">
                          <AvatarImage src={user.imageUrl} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg text-center text-green-800">{user.name}</h3>
                        <p className="text-gray-500 text-sm text-center">@{user.username}</p>
                        <Badge className="mt-2 bg-green-100 text-green-700 border-none">
                          {user.role}
                        </Badge>
                      </div>
                      <div className="flex-1 p-6">
                        <CardContent className="p-0 py-2">
                          <p className="text-gray-600 mb-4">{user.bio}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-2 text-green-600" />
                              {user.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-2 text-green-600" />
                              Joined {formatDate(user.joinDate)}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Award className="h-4 w-4 mr-2 text-green-600" />
                              {user.projectsCount} projects
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <ArrowUpRight className="h-4 w-4 mr-2 text-green-600" />
                              {user.issuesResolved} issues resolved
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {user.expertise.map(exp => (
                              <Badge key={exp} variant="secondary" className="bg-blue-50 text-blue-700">
                                {exp}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="p-0 pt-4 flex justify-between items-center">
                          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                            <Mail className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button asChild variant="default" className="bg-green-600 hover:bg-green-700">
                            <Link href={`/community/users/${user.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No members found matching your search criteria.</p>
              </div>
            )}
          </div>
          
          {filteredUsers.length > usersPerPage && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-green-800 flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Connect with Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Our community members are working on various environmental initiatives and projects.
                Connect with them to collaborate, learn, and make a difference together.
              </p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/profile/edit">
                  Complete Your Profile
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-100">
                <Link href="/community/experts">
                  Find Environmental Experts
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-green-800">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_USERS.slice(0, 3).map(user => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.imageUrl} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-none">
                    {user.issuesResolved}
                  </Badge>
                </div>
              ))}
              <Button asChild variant="link" className="w-full text-green-700 pl-0">
                <Link href="/community/users?sort=contributions">
                  View All Contributors <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-green-800">Popular Expertise</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                Water Conservation
              </Badge>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">
                Wildlife Protection
              </Badge>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">
                Urban Planning
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">
                Renewable Energy
              </Badge>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">
                Marine Biology
              </Badge>
              <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200 border-none">
                Environmental Law
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 