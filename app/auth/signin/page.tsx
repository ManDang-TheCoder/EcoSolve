'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useAuth } from '@/app/providers';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Background animations
const backgroundElements = [
  { size: 'w-64 h-64', top: '15%', left: '8%', delay: 0 },
  { size: 'w-80 h-80', bottom: '10%', right: '5%', delay: 0.5 },
  { size: 'w-40 h-40', top: '60%', left: '20%', delay: 1 },
];

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Get the login function from auth context
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred during sign in');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoLogin = async () => {
    setEmail('test@example.com');
    setPassword('password123');
    
    try {
      const success = await login('test@example.com', 'password123');
      if (success) {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Demo login error:', error);
      setError('An unexpected error occurred during sign in');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      {backgroundElements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.size} rounded-full bg-green-500 opacity-5 blur-3xl`}
          style={{ 
            top: el.top || 'auto', 
            left: el.left || 'auto',
            right: el.right || 'auto',
            bottom: el.bottom || 'auto',
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.05, 0.07, 0.05],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            delay: el.delay,
            ease: 'easeInOut'
          }}
        />
      ))}

      <motion.div
        className="w-full max-w-md z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <Link href="/" className="flex items-center group">
            <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <span className="font-bold text-2xl text-green-800 group-hover:text-green-700 transition-colors">EcoSolve</span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="w-full shadow-lg border-green-100 overflow-hidden">
            <CardHeader className="space-y-1 text-center bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="text-2xl font-bold text-gray-800">Welcome back</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {error && (
                <motion.div 
                  className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      href="/auth/forgot-password" 
                      className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)} 
                    className="text-green-600 focus:ring-green-500"
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" type="button" className="w-full transition-all hover:shadow-md" disabled={isLoading}>
                    <Image src="/google.svg" width={18} height={18} alt="Google" className="mr-2" />
                    Google
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" type="button" className="w-full transition-all hover:shadow-md" disabled={isLoading}>
                    <Image src="/github.svg" width={18} height={18} alt="GitHub" className="mr-2" />
                    GitHub
                  </Button>
                </motion.div>
              </div>

              <div className="mt-6">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    className="w-full hover:shadow-md transition-all"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Use Demo Account
                  </Button>
                </motion.div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-green-50 to-blue-50 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="font-medium text-green-600 hover:text-green-500 hover:underline transition-colors">
                  Sign up
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="underline hover:text-gray-700 transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="underline hover:text-gray-700 transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
} 