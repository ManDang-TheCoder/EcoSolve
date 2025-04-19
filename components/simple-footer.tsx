'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ChevronRight, 
  MapPin,
  Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
    
    // Reset the subscribed state after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="bg-white border-t">
      {/* Main footer content */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and about */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="font-bold text-xl text-green-800">EcoSolve</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              EcoSolve connects communities to identify, report, and solve environmental issues together. Join us in creating a sustainable future for our planet.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-500 hover:text-green-600" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2" /> 
              <span>345 Green Street, San Francisco, CA 94102</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Issue Map
                </Link>
              </li>
              <li>
                <Link href="/report-issue" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Report Issue
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/community" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Community Hub
                </Link>
              </li>
              <li>
                <Link href="/community/users" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Members
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Events
                </Link>
              </li>
              <li>
                <Link href="/community/issues" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Issues
                </Link>
              </li>
              <li>
                <Link href="/experts" className="text-gray-600 hover:text-green-600 flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Experts
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for updates on environmental issues and community events.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-r-none border-r-0"
                />
                <Button type="submit" className="rounded-l-none bg-green-600 hover:bg-green-700">
                  <Mail size={16} />
                </Button>
              </div>
              {subscribed && (
                <p className="text-green-600 text-sm">Thanks for subscribing!</p>
              )}
            </form>
            <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-start space-x-2">
              <Leaf className="text-green-600 mt-1 flex-shrink-0" size={20} />
              <p className="text-sm text-gray-700">
                Join our community of <span className="font-bold">10,000+</span> environmental advocates making a difference.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EcoSolve. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-green-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-green-600">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-500 hover:text-green-600">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="text-sm text-gray-500 hover:text-green-600">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 