'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Map,
  Clock,
  AlertTriangle,
  ThumbsUp,
  MessageSquare,
  Share2,
  User,
  Globe,
  Flag,
  Edit,
  FileText,
  Camera,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Clock3,
  XCircle,
  ChevronDown,
  ChevronUp,
  Send,
  CornerUpRight,
  Eye,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedSection } from '@/components/ui/animated-section';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for a single issue (you would fetch this from your API in production)
const MOCK_ISSUE = {
  id: '1',
  title: 'Water Pollution in Green River',
  description: 'Significant contamination observed in the Green River near industrial zone. Water has changed color and fish mortality has increased. Local residents have reported unusual odors and discoloration in the river over the past two weeks. Initial water samples indicate possible chemical contamination beyond acceptable levels.',
  detailedDescription: `<p>The Green River has been a vital water source for our community for generations. Recently, several concerning changes have been observed:</p>
  <ul>
    <li>Unusual greenish-brown discoloration extending approximately 3 miles downstream from the industrial zone</li>
    <li>Strong chemical odor reported by multiple residents, especially in the early morning hours</li>
    <li>Dead fish washing up along the riverbanks (estimated 200+ in the past week)</li>
    <li>Decreased water clarity (visibility reduced to less than 10cm in affected areas)</li>
    <li>Oily sheen visible on the water surface in several locations</li>
  </ul>
  <p>Local wildlife officials have confirmed abnormal fish mortality rates. Preliminary water testing shows elevated levels of several industrial chemicals, including phosphates and heavy metals.</p>
  <p>The contamination appears to coincide with a recent increase in activity at the Northern Chemical Processing Plant, which discharges treated wastewater into the river.</p>`,
  location: 'Green River, North District',
  exactLocation: '123 Riverside Road, North District, Green City',
  latitude: 37.7749,
  longitude: -122.4194,
  status: 'VERIFIED',
  images: [
    '/placeholder-river.jpg',
    '/placeholder-river-2.jpg',
    '/placeholder-river-3.jpg',
  ],
  reportedBy: [
    { name: 'Jordan Rivera', image: '/users/user1.jpg', timestamp: '2023-08-15T10:30:00Z', role: 'Community Member' },
    { name: 'Environmental Protection Agency', image: '/users/agency1.jpg', timestamp: '2023-08-16T14:15:00Z', role: 'Government Agency' }
  ],
  urgency: 'HIGH',
  createdAt: '2023-08-15T10:30:00Z',
  updatedAt: '2023-08-20T16:45:00Z',
  category: 'water-pollution',
  impactArea: 'Watershed',
  affectedSpecies: ['Fish', 'Waterfowl', 'Amphibians', 'Aquatic Plants'],
  possibleSources: ['Industrial Discharge', 'Chemical Spill', 'Illegal Dumping'],
  views: 1245,
  likes: 387,
  commentCount: 52,
  user: {
    name: 'Jordan Rivera',
    image: '/users/user1.jpg',
    title: 'Environmental Scientist',
    organization: 'Green City University',
  },
  responsibleAgencies: [
    { name: 'Environmental Protection Agency', status: 'Investigating' },
    { name: 'Water Quality Board', status: 'Notified' },
    { name: 'Department of Natural Resources', status: 'Monitoring' }
  ],
  timeline: [
    { date: '2023-08-13T08:00:00Z', event: 'First report of discoloration by local fishermen', status: 'Initial Report' },
    { date: '2023-08-15T10:30:00Z', event: 'Issue formally reported with photographic evidence', status: 'Reported' },
    { date: '2023-08-16T14:15:00Z', event: 'EPA confirms report and initiates investigation', status: 'Verified' },
    { date: '2023-08-18T09:45:00Z', event: 'Water samples collected for laboratory analysis', status: 'Investigating' },
    { date: '2023-08-20T16:45:00Z', event: 'Preliminary test results show elevated chemical levels', status: 'Updated' },
  ],
  comments: [
    {
      id: 'c1',
      user: { name: 'Sarah Johnson', image: '/users/user7.jpg', role: 'Resident' },
      date: '2023-08-16T11:20:00Z',
      content: 'I live nearby and have noticed a strong chemical smell for the past week, especially in the mornings. My kids used to fish in that river, but now I\'m worried about letting them anywhere near it.',
      likes: 24,
      replies: [
        {
          id: 'r1',
          user: { name: 'Environmental Health Department', image: '/users/agency2.jpg', role: 'Official' },
          date: '2023-08-16T15:45:00Z',
          content: 'Thank you for this information. We advise keeping children away from the affected area until further notice. We are posting warning signs along the riverbank today.',
          likes: 18,
        }
      ]
    },
    {
      id: 'c2',
      user: { name: 'Robert Chen', image: '/users/user8.jpg', role: 'Biologist' },
      date: '2023-08-17T09:30:00Z',
      content: 'I collected some water samples yesterday and observed significant alterations in pH levels and oxygen content. This type of sudden change is particularly harmful to native fish species and could have long-term impacts on the river ecosystem.',
      likes: 31,
      replies: []
    },
    {
      id: 'c3',
      user: { name: 'Northern Chemical Processing', image: '/users/company1.jpg', role: 'Company Representative' },
      date: '2023-08-18T14:10:00Z',
      content: 'Northern Chemical Processing takes these concerns very seriously. We are conducting our own internal investigation and cooperating fully with environmental authorities. Our preliminary review shows our discharge has remained within permitted limits, but we are continuing to monitor and evaluate.',
      likes: 5,
      replies: [
        {
          id: 'r2',
          user: { name: 'Jordan Rivera', image: '/users/user1.jpg', role: 'Original Reporter' },
          date: '2023-08-18T16:20:00Z',
          content: "The timing of the contamination correlates directly with your facility's increased production schedule last week. We would like to see the actual discharge monitoring records for the past month.",
          likes: 42,
        }
      ]
    }
  ],
  solutions: [
    {
      id: 's1',
      title: 'Immediate containment measures',
      description: 'Deploy containment booms to prevent further spread of contaminants downstream and protect sensitive habitats.',
      status: 'In Progress',
      proposedBy: { name: 'Water Quality Board', image: '/users/agency3.jpg' },
      votes: 156,
    },
    {
      id: 's2',
      title: 'Comprehensive water testing program',
      description: 'Implement daily water quality monitoring at multiple points along the river to track contamination levels and spread.',
      status: 'Implemented',
      proposedBy: { name: 'Environmental Protection Agency', image: '/users/agency1.jpg' },
      votes: 203,
    },
    {
      id: 's3',
      title: 'Review of industrial discharge permits',
      description: 'Conduct thorough audit of all discharge permits for facilities along the river and update requirements as needed.',
      status: 'Proposed',
      proposedBy: { name: 'Green River Watershed Alliance', image: '/users/org1.jpg' },
      votes: 178,
    }
  ],
};

// Helper function for formatting dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

// Relative time formatter
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let color = '';
  let icon = null;

  switch (status) {
    case 'PENDING':
      color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      icon = <Clock3 className="h-3.5 w-3.5 mr-1" />;
      break;
    case 'VERIFIED':
      color = 'bg-blue-100 text-blue-800 border-blue-200';
      icon = <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      break;
    case 'IN_PROGRESS':
      color = 'bg-purple-100 text-purple-800 border-purple-200';
      icon = <AlertCircle className="h-3.5 w-3.5 mr-1" />;
      break;
    case 'RESOLVED':
      color = 'bg-green-100 text-green-800 border-green-200';
      icon = <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      break;
    case 'REJECTED':
      color = 'bg-red-100 text-red-800 border-red-200';
      icon = <XCircle className="h-3.5 w-3.5 mr-1" />;
      break;
    default:
      color = 'bg-gray-100 text-gray-800 border-gray-200';
  }

  return (
    <Badge className={`py-1 px-2 font-medium border ${color} flex items-center`} variant="outline">
      {icon}
      {status.replace('_', ' ')}
    </Badge>
  );
}

// Category badge component
function CategoryBadge({ category }: { category: string }) {
  const categories: Record<string, { color: string, label: string }> = {
    'water-pollution': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Water Pollution' },
    'air-pollution': { color: 'bg-red-100 text-red-800 border-red-200', label: 'Air Pollution' },
    'waste-management': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Waste Management' },
    'soil-contamination': { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Soil Contamination' },
    'habitat-destruction': { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Habitat Destruction' },
    'noise-pollution': { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Noise Pollution' },
  };

  const { color, label } = categories[category] || { color: 'bg-gray-100 text-gray-800 border-gray-200', label: category };

  return (
    <Badge className={`py-1 px-2 font-medium border ${color}`} variant="outline">
      {label}
    </Badge>
  );
}

// Urgency badge component
function UrgencyBadge({ level }: { level: string }) {
  let color = '';
  
  switch (level) {
    case 'LOW':
      color = 'bg-green-100 text-green-800 border-green-200';
      break;
    case 'MEDIUM':
      color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      break;
    case 'HIGH':
      color = 'bg-orange-100 text-orange-800 border-orange-200';
      break;
    case 'CRITICAL':
      color = 'bg-red-100 text-red-800 border-red-200';
      break;
    default:
      color = 'bg-gray-100 text-gray-800 border-gray-200';
  }

  return (
    <Badge className={`py-1 px-2 font-medium border ${color}`} variant="outline">
      {level}
    </Badge>
  );
}

// Image gallery component
function ImageGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <div>
      <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-100 aspect-video">
        <img 
          src={images[selectedImage] || '/placeholder-issue.jpg'}
          alt="Issue documentation"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <Badge className="bg-black/70 text-white border-none">
            {selectedImage + 1} of {images.length}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`cursor-pointer rounded-md overflow-hidden aspect-video ${selectedImage === index ? 'ring-2 ring-primary' : 'opacity-80'}`}
            onClick={() => setSelectedImage(index)}
          >
            <img 
              src={image} 
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Timeline component
function Timeline({ items }: { items: Array<{ date: string, event: string, status: string }> }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div className={`w-3 h-3 rounded-full bg-primary ${index !== items.length - 1 ? 'mb-1' : ''}`}></div>
            {index !== items.length - 1 && <div className="w-0.5 bg-gray-200 flex-grow"></div>}
          </div>
          <div className={`bg-white rounded-lg border border-gray-100 shadow-sm p-3 flex-grow ${index === items.length - 1 ? 'border-primary/20 bg-primary/5' : ''}`}>
            <p className="text-sm text-gray-500 mb-1">{formatDateTime(item.date)}</p>
            <p className="font-medium text-gray-800">{item.event}</p>
            <Badge variant="outline" className="mt-2 bg-gray-50 text-gray-700">{item.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

// Comment component
function Comment({ comment, isReply = false }: { comment: any, isReply?: boolean }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <div className={`${isReply ? 'ml-12 mt-3' : 'mb-6'}`}>
      <div className="flex items-start">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={comment.user.image} />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-grow">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-medium text-gray-900">{comment.user.name}</span>
                {comment.user.role && (
                  <Badge variant="outline" className="ml-2 text-xs py-0 px-1.5">
                    {comment.user.role}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-gray-500">{timeAgo(comment.date)}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
          
          <div className="flex items-center mt-2 text-sm">
            <button 
              className={`flex items-center mr-4 ${liked ? 'text-primary-600' : 'text-gray-500'}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
              <span>{likeCount}</span>
            </button>
            
            {!isReply && (
              <button 
                className="flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <CornerUpRight className="h-3.5 w-3.5 mr-1" />
                <span>Reply</span>
              </button>
            )}
          </div>
          
          {showReplyForm && (
            <div className="mt-3">
              <div className="flex">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/users/current-user.jpg" />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="min-h-[80px] text-sm"
                  />
                  <div className="flex justify-end mt-2 space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowReplyForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      disabled={!replyText.trim()}
                      onClick={() => {
                        // In a real app, you would save the reply here
                        setReplyText('');
                        setShowReplyForm(false);
                      }}
                    >
                      Post Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.map((reply: any) => (
        <Comment key={reply.id} comment={reply} isReply={true} />
      ))}
    </div>
  );
}

// Solution card component
function SolutionCard({ solution }: { solution: any }) {
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(solution.votes);
  
  const handleVote = () => {
    if (voted) {
      setVoteCount(voteCount - 1);
    } else {
      setVoteCount(voteCount + 1);
    }
    setVoted(!voted);
  };
  
  let statusColor = '';
  switch (solution.status) {
    case 'Implemented':
      statusColor = 'bg-green-100 text-green-800 border-green-200';
      break;
    case 'In Progress':
      statusColor = 'bg-blue-100 text-blue-800 border-blue-200';
      break;
    case 'Proposed':
      statusColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      break;
    default:
      statusColor = 'bg-gray-100 text-gray-800 border-gray-200';
  }
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{solution.title}</CardTitle>
          <Badge className={`${statusColor}`} variant="outline">{solution.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-700">{solution.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={solution.proposedBy.image} />
            <AvatarFallback>{solution.proposedBy.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">
            Proposed by <span className="font-medium">{solution.proposedBy.name}</span>
          </span>
        </div>
        <button 
          className={`flex items-center space-x-1 py-1 px-3 rounded-full text-sm ${voted ? 'bg-primary-50 text-primary-600' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
          onClick={handleVote}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          <span>{voteCount}</span>
        </button>
      </CardFooter>
    </Card>
  );
}

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [newSolution, setNewSolution] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(MOCK_ISSUE.likes);
  
  const issue = MOCK_ISSUE; // In a real app, you would fetch the issue by ID
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Button asChild variant="outline" size="sm" className="mb-4">
        <Link href="/issues" className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Issues
        </Link>
      </Button>
      
      {/* Issue Header */}
      <AnimatedSection animation="fade" className="mb-8">
        <div className="flex items-center mb-2 flex-wrap gap-2">
          <StatusBadge status={issue.status} />
          <CategoryBadge category={issue.category} />
          <UrgencyBadge level={issue.urgency} />
          <Badge variant="outline" className="bg-gray-50">
            <Globe className="h-3.5 w-3.5 mr-1" />
            {issue.impactArea}
          </Badge>
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-3">{issue.title}</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex items-center mb-3 sm:mb-0">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={issue.user.image} />
              <AvatarFallback>{issue.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-900">{issue.user.name}</div>
              <div className="text-sm text-gray-500">{issue.user.title}, {issue.user.organization}</div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Reported on {formatDate(issue.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center ${liked ? 'bg-primary-50 text-primary-600 border-primary-200' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Support ({likeCount})
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Flag className="h-4 w-4 mr-2" />
            Report Concern
          </Button>
          
          <Button asChild className="ml-auto">
            <Link href={`/issues/${params.id}/edit`} className="flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Update Issue
            </Link>
          </Button>
        </div>
      </AnimatedSection>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="solutions">Solutions</TabsTrigger>
            </TabsList>
            
            {/* Details Tab */}
            <TabsContent value="details" className="mt-6">
              <AnimatedSection animation="fade" className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Issue Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: issue.detailedDescription }} />
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="fade" delay={0.1} className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      Visual Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageGallery images={issue.images} />
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="fade" delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <Map className="h-5 w-5 mr-2" />
                        Location Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-100 rounded-lg aspect-video mb-4 flex items-center justify-center">
                        <div className="text-center p-4">
                          <Map className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-500">Interactive map would be displayed here</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="mb-2"><strong>Address:</strong> {issue.exactLocation}</p>
                        <p className="mb-2"><strong>Coordinates:</strong> {issue.latitude}, {issue.longitude}</p>
                        <p><strong>Area:</strong> {issue.impactArea}</p>
                        <Button variant="outline" size="sm" className="mt-4 w-full">View Fullscreen Map</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Impact Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <div className="mb-4">
                          <p className="font-medium mb-1">Affected Species:</p>
                          <div className="flex flex-wrap gap-1">
                            {issue.affectedSpecies.map((species, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50">
                                {species}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="font-medium mb-1">Possible Sources:</p>
                          <div className="flex flex-wrap gap-1">
                            {issue.possibleSources.map((source, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-1">Responsible Agencies:</p>
                          <div className="space-y-2">
                            {issue.responsibleAgencies.map((agency, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                                <span>{agency.name}</span>
                                <Badge variant="outline">{agency.status}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>
            </TabsContent>
            
            {/* Updates Tab */}
            <TabsContent value="updates" className="mt-6">
              <AnimatedSection animation="fade">
                <Card>
                  <CardHeader>
                    <CardTitle>Issue Timeline</CardTitle>
                    <CardDescription>
                      Tracking the progress and key developments of this environmental issue
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Timeline items={issue.timeline} />
                  </CardContent>
                </Card>
              </AnimatedSection>
            </TabsContent>
            
            {/* Discussion Tab */}
            <TabsContent value="discussion" className="mt-6">
              <AnimatedSection animation="fade" className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Discussion</CardTitle>
                    <CardDescription>
                      Join the conversation about this environmental issue
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="/users/current-user.jpg" />
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <Textarea
                            placeholder="Share your thoughts, observations, or questions about this issue..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex justify-end mt-2">
                            <Button disabled={!newComment.trim()}>
                              <Send className="h-4 w-4 mr-2" />
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {issue.comments.map((comment: any) => (
                        <Comment key={comment.id} comment={comment} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </TabsContent>
            
            {/* Solutions Tab */}
            <TabsContent value="solutions" className="mt-6">
              <AnimatedSection animation="fade" className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Proposed Solutions</CardTitle>
                    <CardDescription>
                      Community-driven solutions to address this environmental issue
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="/users/current-user.jpg" />
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <Input
                            placeholder="Title for your proposed solution"
                            className="mb-2"
                          />
                          <Textarea
                            placeholder="Describe your solution in detail. What should be done, who should do it, and what outcome do you expect?"
                            value={newSolution}
                            onChange={(e) => setNewSolution(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex justify-end mt-2">
                            <Button disabled={!newSolution.trim()}>
                              <Lightbulb className="h-4 w-4 mr-2" />
                              Propose Solution
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      {issue.solutions.map((solution: any) => (
                        <SolutionCard key={solution.id} solution={solution} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column */}
        <div>
          <AnimatedSection animation="slide" delay={0.2} className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Issue Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md mb-3">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Views</span>
                  </div>
                  <span className="font-medium">{issue.views}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md mb-3">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Supporters</span>
                  </div>
                  <span className="font-medium">{likeCount}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md mb-3">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Comments</span>
                  </div>
                  <span className="font-medium">{issue.commentCount}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Solutions</span>
                  </div>
                  <span className="font-medium">{issue.solutions.length}</span>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
          
          <AnimatedSection animation="slide" delay={0.3} className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Reported By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {issue.reportedBy.map((reporter: any, index: number) => (
                    <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={reporter.image} />
                        <AvatarFallback>{reporter.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="text-sm font-medium">{reporter.name}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(reporter.timestamp)}
                        </div>
                      </div>
                      <Badge className="text-xs" variant="outline">{reporter.role}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
          
          <AnimatedSection animation="slide" delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Similar Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="group">
                    <Link href="#" className="flex items-start p-2 hover:bg-gray-50 rounded-md">
                      <div className="w-16 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                        <img src="/placeholder-river-2.jpg" alt="Similar issue" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary-600 transition-colors">Factory Waste in Blue Lake</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs mr-2 bg-orange-50 text-orange-800 border-orange-200">HIGH</Badge>
                          <span className="text-xs text-gray-500">2 miles away</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="group">
                    <Link href="#" className="flex items-start p-2 hover:bg-gray-50 rounded-md">
                      <div className="w-16 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                        <img src="/placeholder-river-3.jpg" alt="Similar issue" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary-600 transition-colors">Chemical Discharge Report at Elk River</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs mr-2 bg-green-50 text-green-800 border-green-200">RESOLVED</Badge>
                          <span className="text-xs text-gray-500">5 miles away</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="group">
                    <Link href="#" className="flex items-start p-2 hover:bg-gray-50 rounded-md">
                      <div className="w-16 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                        <img src="/placeholder-water.jpg" alt="Similar issue" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary-600 transition-colors">Urban Runoff Pollution in Clearwater Stream</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs mr-2 bg-blue-50 text-blue-800 border-blue-200">IN PROGRESS</Badge>
                          <span className="text-xs text-gray-500">7 miles away</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All Similar Issues
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
} 