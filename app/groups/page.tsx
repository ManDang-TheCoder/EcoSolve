import React from 'react';
import Link from 'next/link';
import { Users, MapPin, Calendar, Plus, Search } from 'lucide-react';

// Mock data - in production this would come from database
const groups = [
  {
    id: '1',
    name: 'Green City Cleanup',
    description: 'Weekly cleanup activities around the city parks and waterways. Join us to keep our city clean and green!',
    location: 'City Center, Downtown',
    imageUrl: 'https://images.unsplash.com/photo-1535700601052-b90a78c466e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    memberCount: 42,
    upcomingEvents: 2
  },
  {
    id: '2',
    name: 'Urban Gardeners',
    description: 'Growing organic food in community gardens and teaching sustainable gardening techniques to locals.',
    location: 'Various locations',
    imageUrl: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    memberCount: 78,
    upcomingEvents: 5
  },
  {
    id: '3',
    name: 'River Warriors',
    description: 'Dedicated to restoring and protecting our local river systems through cleanup, monitoring, and advocacy.',
    location: 'River Delta Area',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    memberCount: 36,
    upcomingEvents: 1
  },
  {
    id: '4',
    name: 'Forest Conservationists',
    description: 'Protecting local forests through tree planting, trail maintenance, and educational programs.',
    location: 'Northern Forest Reserve',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    memberCount: 53,
    upcomingEvents: 3
  }
];

export default function GroupsPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Groups</h1>
            <p className="mt-2 text-lg text-gray-700">
              Join groups of like-minded volunteers to work together on environmental projects
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                placeholder="Search groups"
              />
            </div>
            <Link 
              href="/groups/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Link>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="text-3xl font-semibold text-gray-900">0</div>
            <div className="text-sm text-gray-500">Active Groups</div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="text-3xl font-semibold text-gray-900">0</div>
            <div className="text-sm text-gray-500">Volunteers</div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="text-3xl font-semibold text-gray-900">0</div>
            <div className="text-sm text-gray-500">Projects Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="text-3xl font-semibold text-gray-900">0</div>
            <div className="text-sm text-gray-500">Upcoming Events</div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-40 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${group.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {group.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  {group.location}
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400" />
                    {group.memberCount} members
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400" />
                    {group.upcomingEvents} upcoming
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <Link 
                    href={`/groups/${group.id}`}
                    className="flex-1 text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100"
                  >
                    View Details
                  </Link>
                  <button
                    className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                  >
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 