import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  Clock, 
  Users, 
  AlertTriangle, 
  ChevronRight, 
  BarChart2,
  MessageSquare,
  MapPin,
  FileText,
  Star,
  Zap,
  PieChart,
  Activity,
  Award
} from 'lucide-react';

// Mock user data
const user = {
  name: 'Jane Cooper',
  image: '/placeholder-user.jpg',
  email: 'jane.cooper@example.com',
  joined: 'May 2023',
  role: 'USER',
  location: 'San Francisco, CA',
  bio: 'Environmental enthusiast passionate about sustainable living and community engagement.',
  impactScore: 82,
  level: 'Earth Protector',
  points: 1250,
  achievements: [
    { id: 1, name: 'First Report', icon: AlertTriangle, date: '2023-06-15' },
    { id: 2, name: 'Campaign Joiner', icon: Users, date: '2023-07-21' },
    { id: 3, name: 'Community Connector', icon: MessageSquare, date: '2023-08-10' }
  ]
};

// Mock data for recent activities
const recentActivities = [
  { 
    id: 1, 
    type: 'report', 
    title: 'Reported illegal dumping at River Creek', 
    date: '2023-10-15', 
    status: 'VERIFIED', 
    icon: AlertTriangle,
    url: '/reports/1'
  },
  { 
    id: 2, 
    type: 'consultation', 
    title: 'Consultation with Dr. Emma Johnson about water conservation', 
    date: '2023-10-10', 
    status: 'COMPLETED', 
    icon: MessageSquare,
    url: '/consult/history/12'
  },
  { 
    id: 3, 
    type: 'group', 
    title: 'Joined Green City Cleanup group', 
    date: '2023-10-05', 
    status: 'ACTIVE', 
    icon: Users,
    url: '/groups/1'
  },
  { 
    id: 4, 
    type: 'advocacy', 
    title: 'Supported Ban Single-Use Plastics campaign', 
    date: '2023-09-28', 
    status: 'ACTIVE', 
    icon: Zap,
    url: '/advocacy/2'
  }
];

// Mock statistics
const userStats = [
  { name: 'Reports Submitted', value: 8, icon: AlertTriangle, color: 'bg-blue-100 text-blue-600' },
  { name: 'Campaigns Joined', value: 3, icon: Zap, color: 'bg-green-100 text-green-600' },
  { name: 'Groups Participating', value: 2, icon: Users, color: 'bg-purple-100 text-purple-600' },
  { name: 'Consultations', value: 5, icon: MessageSquare, color: 'bg-orange-100 text-orange-600' }
];

// Mock upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: 'Beach Cleanup at Ocean Park',
    date: '2023-11-05T09:00:00',
    location: 'Ocean Park, North Beach',
    type: 'group',
    url: '/groups/events/15'
  },
  {
    id: 2,
    title: 'Consultation with Sarah Patel on Urban Farming',
    date: '2023-11-08T14:30:00',
    location: 'Virtual Meeting',
    type: 'consultation',
    url: '/consult/upcoming/23'
  },
  {
    id: 3,
    title: 'Community Tree Planting',
    date: '2023-11-12T10:00:00',
    location: 'City Park, Downtown',
    type: 'group',
    url: '/groups/events/18'
  }
];

// Impact chart data (percentage values)
const impactData = {
  waterSaved: 45,
  carbonReduced: 30,
  wasteRecycled: 80,
  energyConserved: 25
};

// Get status badge styling
const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'VERIFIED': return 'bg-blue-100 text-blue-800';
    case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800';
    case 'RESOLVED': return 'bg-green-100 text-green-800';
    case 'COMPLETED': return 'bg-green-100 text-green-800';
    case 'ACTIVE': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function DashboardPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-full object-cover border-2 border-green-500"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h1>
                <p className="text-sm text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location} • Joined {user.joined}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link
                href="/profile/edit"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Edit Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userStats.map((stat) => (
                <div key={stat.name} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-full ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="ml-auto text-2xl font-bold">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-500">{stat.name}</div>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
              </div>
              <ul role="list" className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <li key={activity.id}>
                    <Link 
                      href={activity.url}
                      className="block hover:bg-gray-50 px-6 py-4"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <activity.icon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(activity.status)}`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 px-6 py-3 flex justify-center">
                <Link 
                  href="/dashboard/activities"
                  className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center"
                >
                  View all activities
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
              </div>
              <ul role="list" className="divide-y divide-gray-200">
                {upcomingEvents.map((event) => (
                  <li key={event.id}>
                    <Link 
                      href={event.url}
                      className="block hover:bg-gray-50 px-6 py-4"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Calendar className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="flex text-sm text-gray-500 mt-1">
                            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                          <div className="flex text-sm text-gray-500 mt-1">
                            <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {event.location}
                          </div>
                        </div>
                        <div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 px-6 py-3 flex justify-center">
                <Link 
                  href="/dashboard/calendar"
                  className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center"
                >
                  View your calendar
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link 
                  href="/reports/new"
                  className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-green-500 transition-colors"
                >
                  <AlertTriangle className="h-6 w-6 text-orange-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Report Issue</span>
                </Link>
                <Link 
                  href="/consult/book"
                  className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-green-500 transition-colors"
                >
                  <MessageSquare className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Get Consultation</span>
                </Link>
                <Link 
                  href="/groups/join"
                  className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-green-500 transition-colors"
                >
                  <Users className="h-6 w-6 text-purple-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Join Group</span>
                </Link>
                <Link 
                  href="/advocacy/campaigns"
                  className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-green-500 transition-colors"
                >
                  <Zap className="h-6 w-6 text-green-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Support Campaign</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* User Impact Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Your Impact</h2>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{user.impactScore}</div>
                    <div className="text-sm text-gray-500">Impact Score</div>
                  </div>
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <BarChart2 className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-500">Water Saved</span>
                      <span className="text-sm font-medium text-gray-900">{impactData.waterSaved}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${impactData.waterSaved}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-500">Carbon Reduced</span>
                      <span className="text-sm font-medium text-gray-900">{impactData.carbonReduced}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${impactData.carbonReduced}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-500">Waste Recycled</span>
                      <span className="text-sm font-medium text-gray-900">{impactData.wasteRecycled}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${impactData.wasteRecycled}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-500">Energy Conserved</span>
                      <span className="text-sm font-medium text-gray-900">{impactData.energyConserved}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${impactData.energyConserved}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/dashboard/impact"
                    className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                  >
                    View Detailed Impact
                  </Link>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Achievements</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.level}</div>
                    <div className="text-xs text-gray-500">{user.points} points</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {user.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <achievement.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900">{achievement.name}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link
                    href="/dashboard/achievements"
                    className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center justify-center"
                  >
                    View all achievements
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Your Reports */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Your Reports</h2>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <Link 
                    href="/reports/1"
                    className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-900">Illegal Dumping at River Creek</div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        VERIFIED
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Reported on Oct 15, 2023</div>
                  </Link>
                  <Link 
                    href="/reports/5"
                    className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-900">Air Pollution from Factory</div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        PENDING
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Reported on Oct 8, 2023</div>
                  </Link>
                  <Link 
                    href="/reports/3"
                    className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-900">Contaminated Water in Park</div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        RESOLVED
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Reported on Sep 20, 2023</div>
                  </Link>
                </div>
                
                <div className="mt-3 flex justify-center">
                  <Link
                    href="/dashboard/reports"
                    className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center"
                  >
                    View all reports
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Resources Card */}
            <div className="bg-green-50 rounded-lg border border-green-100 overflow-hidden">
              <div className="p-6">
                <h3 className="font-medium text-green-800 mb-2">Resources & Tips</h3>
                <p className="text-sm text-green-700 mb-4">
                  Check out these resources to increase your environmental impact.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/resources/guides" className="text-green-600 hover:text-green-800 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Home Energy Efficiency Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/water-conservation" className="text-green-600 hover:text-green-800 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      10 Simple Water Conservation Tips
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/calculator" className="text-green-600 hover:text-green-800 flex items-center">
                      <PieChart className="h-4 w-4 mr-2" />
                      Carbon Footprint Calculator
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 