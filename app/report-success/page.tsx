"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ReportSuccessPage() {
  return (
    <div className="container mx-auto py-16 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl text-center"
      >
        <div className="mb-8 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-green-800 mb-4">Report Submitted Successfully!</h1>
        <p className="text-lg text-gray-600 mb-10">
          Thank you for helping make our community a better place. Your environmental report has been received.
        </p>
        
        <Card className="shadow-lg border-green-100 mb-8">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b pb-6">
            <CardTitle className="text-xl font-semibold text-green-800">What happens next?</CardTitle>
            <CardDescription>
              Your report will go through the following process
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Review</h3>
                <p className="text-gray-600 text-sm">
                  Our team will review your report within 24-48 hours
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Verification</h3>
                <p className="text-gray-600 text-sm">
                  The information will be verified and categorized
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <span className="text-teal-600 font-bold">3</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Action</h3>
                <p className="text-gray-600 text-sm">
                  The issue will be assigned to a group for resolution
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Explore the Map
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">
                See all reported environmental issues in your area on our interactive map.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild variant="outline" size="sm">
                <Link href="/map">View Map</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Join a Group
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">
                Connect with others to work together on solving environmental issues.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild variant="outline" size="sm">
                <Link href="/groups">Find Groups</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-green-200">
            <Link href="/report-issue">
              Report Another Issue
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
