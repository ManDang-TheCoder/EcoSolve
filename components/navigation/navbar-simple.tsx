'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  MessageSquare, 
  MapPin,
  PlusCircle,
  ChevronDown,
  Search,
  Loader2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/app/providers';

// Main navigation items
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Map', href: '/map' },
  { name: 'Events', href: '/events' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Community', href: '/community' },
  { name: 'Experts', href: '/experts' },
];

// Placeholder notifications - in a real app these would come from the backend
const notifications = [
  {
    id: 1,
    title: 'Your report has been verified',
    description: 'The water pollution issue you reported has been verified by moderators.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    title: 'New comment on your report',
    description: 'Emily left a comment on your issue report about the wildlife habitat.',
    time: '1 day ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Upcoming event near you',
    description: 'Beach cleanup event is happening this weekend near your location.',
    time: '2 days ago',
    unread: false,
  },
];

// Navbar animations
const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 20 
    } 
  }
};

// Mobile menu animations
const mobileMenuVariants = {
  hidden: { opacity: 0, y: -10, height: 0 },
  visible: { 
    opacity: 1, 
    y: 0, 
    height: 'auto',
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.1, 0.25, 1.0],
      staggerChildren: 0.05 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    height: 0,
    transition: { 
      duration: 0.2, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  }
};

// Mobile menu item animation
const menuItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 25
    } 
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  // Use auth context
  const { user, isLoading, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`sticky top-0 z-50 w-full border-b ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-transparent' 
          : 'bg-white shadow-sm'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="font-bold text-xl text-green-800">EcoSolve</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    ? 'text-green-600'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="search"
                placeholder="Search issues, events, or experts..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>
          
          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <Button variant="ghost" size="sm" disabled>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </Button>
            ) : user ? (
              <>
                {/* Report Issue Button */}
                <Button asChild variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  <Link href="/report-issue">
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Report Issue
                  </Link>
                </Button>
                
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                        {notifications.filter(n => n.unread).length}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map(notification => (
                      <DropdownMenuItem key={notification.id} className="p-3 focus:bg-gray-100">
                        <div className="flex space-x-3">
                          <div className={`w-2 self-stretch ${notification.unread ? 'bg-green-500' : 'bg-transparent'} rounded-full`} />
                          <div className="flex-1 space-y-1">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.description}</p>
                            <p className="text-xs text-gray-400">{notification.time}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="justify-center text-sm text-green-600 cursor-pointer">
                      <Link href="/notifications" className="w-full text-center">View all notifications</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/community/users" className="flex items-center w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Community</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/signin">
                    Sign in
                  </Link>
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/auth/signup">
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 pt-3 pb-6 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            
            {/* Mobile Navigation */}
            <nav className="grid gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href || pathname?.startsWith(`${item.href}/`)
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Report Issue for Mobile */}
            <div className="pt-3">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/report-issue" onClick={() => setMobileMenuOpen(false)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Report Environmental Issue
                </Link>
              </Button>
            </div>
            
            {/* Authentication for Mobile */}
            <div className="pt-3 border-t border-gray-100">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-green-600" />
                </div>
              ) : user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-1">
                    <Link 
                      href="/profile" 
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link 
                      href="/settings" 
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <Link 
                      href="/notifications" 
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                      {notifications.filter(n => n.unread).length > 0 && (
                        <Badge className="ml-auto bg-red-500">{notifications.filter(n => n.unread).length}</Badge>
                      )}
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-2 grid-cols-2">
                  <Button variant="outline" asChild>
                    <Link 
                      href="/auth/signin"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" asChild>
                    <Link 
                      href="/auth/signup"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
} 