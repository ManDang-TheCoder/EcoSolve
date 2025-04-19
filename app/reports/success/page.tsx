'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, MapPin, ArrowLeft, Eye, Users } from 'lucide-react';

export default function ReportSuccessPage() {
  return (
    <div className="py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/reports"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to reports
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for contributing to a healthier environment. Your report has been received and will be reviewed by our team.
          </p>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">What happens next?</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Review</h3>
                  <p className="text-gray-600 text-sm">
                    We'll review your report within 24-48 hours
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Verification</h3>
                  <p className="text-gray-600 text-sm">
                    The information will be verified and categorized
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Action</h3>
                  <p className="text-gray-600 text-sm">
                    Issues are assigned for resolution
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center text-lg font-medium text-gray-900 mb-2">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                View Map
              </div>
              <p className="text-sm text-gray-600 mb-3">
                See all reported environmental issues in your area on our interactive map.
              </p>
              <Link 
                href="/map" 
                className="text-green-600 hover:text-green-800 text-sm font-medium inline-flex items-center"
              >
                Explore Map
                <Eye className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center text-lg font-medium text-gray-900 mb-2">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Community Groups
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Connect with others to work together on solving environmental issues.
              </p>
              <Link 
                href="/groups" 
                className="text-green-600 hover:text-green-800 text-sm font-medium inline-flex items-center"
              >
                Join Groups
                <Eye className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
            >
              Go to Dashboard
            </Link>
            <Link 
              href="/reports/new"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Report Another Issue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 