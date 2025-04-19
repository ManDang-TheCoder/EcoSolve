'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ExpertRegistrationSuccess() {
  return (
    <div className="container mx-auto py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl text-center"
      >
        <Card className="border-green-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg pb-6">
            <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Expert Registration Successful!</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Thank you for joining our community of environmental experts
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 px-8">
            <div className="space-y-4 text-left">
              <p className="text-gray-700">
                Your application has been received and is currently being reviewed by our team. This process typically takes 1-3 business days.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">What happens next?</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Our team will review your expertise and credentials</li>
                  <li>You'll receive an email notification once your expert status is approved</li>
                  <li>Once approved, you can start answering questions and providing expert advice</li>
                  <li>You'll gain access to our expert dashboard with additional features</li>
                </ul>
              </div>
              
              <p className="text-gray-700">
                In the meantime, you can explore the platform, browse environmental issues, and participate in community discussions.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-2 pb-6">
            <Button asChild variant="default" className="bg-green-600 hover:bg-green-700">
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
              <Link href="/experts">
                Browse Expert Profiles
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <p className="mt-6 text-gray-500 text-sm">
          Have questions? Contact our <Link href="/support" className="text-green-600 hover:underline">support team</Link>.
        </p>
      </motion.div>
    </div>
  );
} 