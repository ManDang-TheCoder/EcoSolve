'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import mapboxgl from 'mapbox-gl';
import { Upload, MapPin, Camera, X, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Get Mapbox token from env
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Form schema for report validation
const reportSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(100, {
    message: "Title cannot exceed 100 characters."
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }).max(2000, {
    message: "Description cannot exceed 2000 characters."
  }),
  location: z.string().min(3, {
    message: "Please provide a location."
  }),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], {
    required_error: "Please select the urgency level.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  potentialSolutions: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Categories of environmental issues
const issueCategories = [
  { value: 'water-pollution', label: 'Water Pollution' },
  { value: 'air-pollution', label: 'Air Pollution' },
  { value: 'waste-management', label: 'Waste Management' },
  { value: 'deforestation', label: 'Deforestation' },
  { value: 'habitat-destruction', label: 'Habitat Destruction' },
  { value: 'endangered-species', label: 'Endangered Species' },
  { value: 'climate-impacts', label: 'Climate Change Impacts' },
  { value: 'resource-depletion', label: 'Resource Depletion' },
  { value: 'soil-contamination', label: 'Soil Contamination' },
  { value: 'noise-pollution', label: 'Noise Pollution' },
  { value: 'illegal-dumping', label: 'Illegal Dumping' },
  { value: 'other', label: 'Other' },
];

export default function ReportIssuePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapPosition, setMapPosition] = useState({
    lng: -98.5795, // Default to US center
    lat: 39.8283,
    zoom: 3
  });
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      category: '',
      urgency: 'MEDIUM',
      potentialSolutions: '',
    },
  });
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    const initializeMap = () => {
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [mapPosition.lng, mapPosition.lat],
          zoom: mapPosition.zoom
        });
        
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }));
        
        map.current.on('load', () => {
          setMapLoaded(true);
        });
        
        map.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          
          // Update marker
          if (marker.current) {
            marker.current.remove();
          }
          
          marker.current = new mapboxgl.Marker({ color: '#10b981' })
            .setLngLat([lng, lat])
            .addTo(map.current!);
          
          // Update form values
          setSelectedLocation({ lat, lng });
          form.setValue('latitude', lat);
          form.setValue('longitude', lng);
          
          // Try to get a reverse geocoded location name
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
              if (data.features && data.features.length > 0) {
                const placeName = data.features[0].place_name;
                form.setValue('location', placeName);
              }
            })
            .catch(error => {
              console.error('Error getting location name:', error);
            });
        });
      } catch (error) {
        console.error('Error initializing map:', error);
        toast.error('Unable to load map. Please check your connection and try again.');
      }
    };
    
    if (mapboxgl.supported()) {
      initializeMap();
    } else {
      toast.error('Your browser does not support Mapbox GL');
    }
    
    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      
      if (images.length + newImages.length > 5) {
        toast.error('You can upload a maximum of 5 images');
        return;
      }
      
      setImages(prev => [...prev, ...newImages]);
      
      // Create URLs for preview
      const newImageUrls = newImages.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newImageUrls]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    
    // Cleanup object URL
    URL.revokeObjectURL(imageUrls[index]);
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  // Search location
  const searchLocation = (query: string) => {
    if (!query || query.length < 3 || !map.current) return;
    
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          
          map.current!.flyTo({
            center: [lng, lat],
            zoom: 10,
            essential: true
          });
          
          // Update marker
          if (marker.current) {
            marker.current.remove();
          }
          
          marker.current = new mapboxgl.Marker({ color: '#10b981' })
            .setLngLat([lng, lat])
            .addTo(map.current!);
          
          // Update form values
          setSelectedLocation({ lat, lng });
          form.setValue('latitude', lat);
          form.setValue('longitude', lng);
          form.setValue('location', data.features[0].place_name);
        }
      })
      .catch(error => {
        console.error('Error searching location:', error);
        toast.error('Unable to find location. Please try a different search term.');
      });
  };
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof reportSchema>) => {
    if (status === 'unauthenticated') {
      toast.error('You must be signed in to report an issue');
      router.push('/auth/signin?callbackUrl=/report-issue');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First, upload images if any
      let imageUrls: string[] = [];
      
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach(image => {
          formData.append('files', image);
        });
        
        const uploadResponse = await fetch('/api/uploads', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload images');
        }
        
        const uploadData = await uploadResponse.json();
        imageUrls = uploadData.urls;
      }
      
      // Submit the report with image URLs
      const reportData = {
        ...values,
        images: imageUrls,
      };
      
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit report');
      }
      
      toast.success('Report submitted successfully!');
      router.push('/report-success');
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Check if user is authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.warning('You will need to sign in to submit a report');
    }
  }, [status]);

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full shadow-lg border-green-100">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b pb-8">
          <CardTitle className="text-2xl font-bold text-center text-green-800">Report an Environmental Issue</CardTitle>
          <CardDescription className="text-center text-base pt-2">
            Help us identify and address environmental problems in your community
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Title</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Illegal Waste Dumping in River Valley" {...field} />
                        </FormControl>
                        <FormDescription>
                          A clear, concise title for the environmental issue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {issueCategories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the category that best describes the issue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgency Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="LOW">Low</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="HIGH">High</SelectItem>
                            <SelectItem value="CRITICAL">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How urgent is this environmental issue?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the environmental issue in detail. Include any relevant background information, what you observed, when you noticed it, and why it's concerning." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide as much detail as possible
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="potentialSolutions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potential Solutions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="If you have any ideas or suggestions for addressing this issue, please share them here." 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Share your ideas for solving this environmental problem
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <FormLabel>Location</FormLabel>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Search for a location" 
                          value={form.watch('location')}
                          onChange={(e) => form.setValue('location', e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => searchLocation(form.watch('location'))}
                        >
                          <MapPin className="h-4 w-4 mr-2" /> Search
                        </Button>
                      </div>
                      <input type="hidden" {...form.register('latitude')} />
                      <input type="hidden" {...form.register('longitude')} />
                      
                      <div className="relative w-full h-[300px] border rounded-md overflow-hidden">
                        <div ref={mapContainer} className="absolute inset-0" />
                        {!mapLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70">
                            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                          </div>
                        )}
                      </div>
                      
                      <FormDescription>
                        Search for a location or click directly on the map to select the exact location of the issue
                      </FormDescription>
                      {selectedLocation && (
                        <p className="text-sm text-green-600">
                          Selected location: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                        </p>
                      )}
                      <FormMessage>{form.formState.errors.location?.message}</FormMessage>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="images">Upload Images (Optional)</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Camera className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or JPEG (max 5MB per image)</p>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      
                      {imageUrls.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                          {imageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Uploaded image ${index + 1}`}
                                className="h-24 w-full object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Upload up to 5 images to help document the environmental issue
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-end">
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Report'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
