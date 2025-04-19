import React from 'react';
import Link from 'next/link';
import { Eye, Clock, MapPin, AlertTriangle, Filter, Plus } from 'lucide-react';

// Mock data - in production this would come from the database
const reports = [
  {
    id: '1',
    title: 'Illegal Dumping at River Creek',
    description: 'Found household waste dumped near the river bank, potentially contaminating water.',
    location: 'River Creek Park, North Side',
    status: 'PENDING',
    urgency: 'HIGH',
    createdAt: '2023-10-15T14:30:00Z',
    user: {
      name: 'Jane Cooper',
      image: 'https://randomuser.me/api/portraits/women/10.jpg'
    }
  },
  {
    id: '2',
    title: 'Excessive Air Pollution from Factory',
    description: 'Black smoke being released from industrial chimney outside regulated hours.',
    location: 'Industrial Zone, East District',
    status: 'VERIFIED',
    urgency: 'CRITICAL',
    createdAt: '2023-10-12T09:15:00Z',
    user: {
      name: 'Robert Fox',
      image: 'https://randomuser.me/api/portraits/men/4.jpg'
    }
  },
  {
    id: '3',
    title: 'Deforestation Activity',
    description: 'Trees being cut down in protected forest area without visible permits.',
    location: 'Green Forest, West County',
    status: 'IN_PROGRESS',
    urgency: 'HIGH',
    createdAt: '2023-10-08T16:45:00Z',
    user: {
      name: 'Esther Howard',
      image: 'https://randomuser.me/api/portraits/women/7.jpg'
    }
  },
  {
    id: '4',
    title: 'Water Contamination in Local Lake',
    description: 'Strange discoloration and dead fish observed at the north shore of the lake.',
    location: 'Crystal Lake, South Park',
    status: 'RESOLVED',
    urgency: 'MEDIUM',
    createdAt: '2023-09-29T11:20:00Z',
    user: {
      name: 'Wade Warren',
      image: 'https://randomuser.me/api/portraits/men/7.jpg'
    }
  }
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'VERIFIED': return 'bg-blue-100 text-blue-800';
    case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800';
    case 'RESOLVED': return 'bg-green-100 text-green-800';
    case 'REJECTED': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getUrgencyBadgeClass = (urgency: string) => {
  switch (urgency) {
    case 'LOW': return 'bg-green-100 text-green-800';
    case 'MEDIUM': return 'bg-blue-100 text-blue-800';
    case 'HIGH': return 'bg-orange-100 text-orange-800';
    case 'CRITICAL': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function ReportsPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Environmental Reports</h1>
            <p className="mt-2 text-lg text-gray-700">
              View and track environmental issues reported by the community
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <Link 
              href="/reports/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
            >
              <Plus className="h-4 w-4 mr-2" />
              Report Issue
            </Link>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="text-3xl font-semibold text-gray-900">0</div>
            <div className="text-sm text-gray-500">Total Reports</div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="text-3xl font-semibold text-yellow-500">0</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="text-3xl font-semibold text-purple-500">0</div>
            <div className="text-sm text-gray-500">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="text-3xl font-semibold text-green-500">0</div>
            <div className="text-sm text-gray-500">Resolved</div>
          </div>
        </div>
        
        {/* Reports list */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {reports.map((report) => (
              <li key={report.id}>
                <Link href={`/reports/${report.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <AlertTriangle className={`h-5 w-5 ${
                            report.urgency === 'CRITICAL' ? 'text-red-500' : 
                            report.urgency === 'HIGH' ? 'text-orange-500' : 
                            report.urgency === 'MEDIUM' ? 'text-blue-500' : 'text-green-500'
                          }`} />
                        </div>
                        <p className="ml-3 text-lg font-medium text-gray-900">{report.title}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(report.status)}`}>
                          {report.status.replace('_', ' ')}
                        </span>
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyBadgeClass(report.urgency)}`}>
                          {report.urgency}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {report.location}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          Reported on{' '}
                          <time dateTime={report.createdAt}>
                            {new Date(report.createdAt).toLocaleDateString()}
                          </time>
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {report.description}
                      </p>
                      <div className="flex items-center ml-4">
                        <Eye className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">Details</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 