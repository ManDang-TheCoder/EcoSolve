'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

// Form validation schema
const baseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
  location: z.string().optional(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

const volunteerSchema = baseSchema.extend({
  interests: z.string().optional(),
});

const expertSchema = baseSchema.extend({
  expertise: z.string().min(10, "Please describe your expertise in detail"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  expertiseCategories: z.string().min(2, "Please select your areas of expertise"),
});

const signupFormSchema = z.discriminatedUnion('userType', [
  z.object({ userType: z.literal('VOLUNTEER'), ...volunteerSchema.shape }),
  z.object({ userType: z.literal('EXPERT'), ...expertSchema.shape }),
  z.object({ userType: z.literal('USER'), ...baseSchema.shape }),
]).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'USER' | 'VOLUNTEER' | 'EXPERT'>('USER');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      userType: 'USER',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      location: '',
      agreeTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }

      toast.success("Account created successfully!");
      
      // Redirect based on role
      if (values.userType === 'EXPERT') {
        router.push('/experts/register-success');
      } else {
        router.push('/auth/signin');
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }

  // Update form schema when user type changes
  const handleUserTypeChange = (value: 'USER' | 'VOLUNTEER' | 'EXPERT') => {
    setUserType(value);
    form.setValue('userType', value);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-3xl"
      >
        <Card className="w-full shadow-lg border-green-100">
          <CardHeader className="space-y-1 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <Image 
                src="/placeholder-logo.svg" 
                alt="LocalEcoSolve" 
                width={120} 
                height={60} 
                className="h-16 w-auto"
              />
            </div>
            <CardTitle className="text-2xl text-center font-bold">Create your account</CardTitle>
            <CardDescription className="text-center">
              Join our community and start making a difference
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="USER" className="w-full" onValueChange={(value) => handleUserTypeChange(value as any)}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="USER">Regular User</TabsTrigger>
              <TabsTrigger value="VOLUNTEER">Volunteer</TabsTrigger>
              <TabsTrigger value="EXPERT">Expert</TabsTrigger>
            </TabsList>
            
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <input type="hidden" {...form.register('userType')} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (City, Country)</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco, USA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <TabsContent value="VOLUNTEER" className="space-y-4 mt-4">
                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Environmental Interests</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your interests" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="conservation">Wildlife Conservation</SelectItem>
                                <SelectItem value="climate">Climate Action</SelectItem>
                                <SelectItem value="recycling">Recycling & Waste</SelectItem>
                                <SelectItem value="water">Water Conservation</SelectItem>
                                <SelectItem value="sustainability">Sustainable Living</SelectItem>
                                <SelectItem value="pollution">Air & Water Pollution</SelectItem>
                                <SelectItem value="energy">Renewable Energy</SelectItem>
                                <SelectItem value="agriculture">Sustainable Agriculture</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="EXPERT" className="space-y-4 mt-4">
                    <FormField
                      control={form.control}
                      name="expertiseCategories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area of Expertise</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your expertise" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="environmental-science">Environmental Science</SelectItem>
                                <SelectItem value="conservation">Conservation Biology</SelectItem>
                                <SelectItem value="climate">Climate Science</SelectItem>
                                <SelectItem value="pollution">Pollution Control</SelectItem>
                                <SelectItem value="policy">Environmental Policy</SelectItem>
                                <SelectItem value="engineering">Environmental Engineering</SelectItem>
                                <SelectItem value="education">Environmental Education</SelectItem>
                                <SelectItem value="sustainable-development">Sustainable Development</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="expertise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Describe Your Expertise</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your background, credentials, and experience..." 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell the community about yourself..." 
                              className="min-h-[80px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Tabs>
          
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-green-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
} 