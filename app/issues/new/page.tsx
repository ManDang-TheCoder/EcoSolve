'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin,
  Camera,
  Upload,
  AlertTriangle,
  Info,
  X,
  Loader2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/ui/animated-section';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Checkbox
} from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

// Form types
interface IssueFormData {
  title: string;
  description: string;
  detailedDescription: string;
  location: string;
  exactLocation: string;
  latitude: string;
  longitude: string;
  category: string;
  urgency: string;
  affectedSpecies: string[];
  possibleSources: string[];
  agreeToTerms: boolean;
  imageFiles: File[];
}

export default function NewIssuePage() {
  // Form state
  const [formData, setFormData] = useState<IssueFormData>({
    title: '',
    description: '',
    detailedDescription: '',
    location: '',
    exactLocation: '',
    latitude: '',
    longitude: '',
    category: '',
    urgency: 'MEDIUM',
    affectedSpecies: [],
    possibleSources: [],
    agreeToTerms: false,
    imageFiles: [],
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [speciesInput, setSpeciesInput] = useState('');
  const [sourceInput, setSourceInput] = useState('');
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Update form data with new files
    setFormData(prev => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files],
    }));
    
    // Create preview URLs for the images
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };
  
  // Remove an uploaded image
  const removeImage = (index: number) => {
    const newImageFiles = [...formData.imageFiles];
    newImageFiles.splice(index, 1);
    
    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index]); // Clean up the URL object
    newPreviews.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      imageFiles: newImageFiles,
    }));
    setPreviewImages(newPreviews);
  };
  
  // Add a species to the list
  const addSpecies = () => {
    if (speciesInput.trim() && !formData.affectedSpecies.includes(speciesInput.trim())) {
      setFormData(prev => ({
        ...prev,
        affectedSpecies: [...prev.affectedSpecies, speciesInput.trim()],
      }));
      setSpeciesInput('');
    }
  };
  
  // Remove a species from the list
  const removeSpecies = (species: string) => {
    setFormData(prev => ({
      ...prev,
      affectedSpecies: prev.affectedSpecies.filter(s => s !== species),
    }));
  };
  
  // Add a source to the list
  const addSource = () => {
    if (sourceInput.trim() && !formData.possibleSources.includes(sourceInput.trim())) {
      setFormData(prev => ({
        ...prev,
        possibleSources: [...prev.possibleSources, sourceInput.trim()],
      }));
      setSourceInput('');
    }
  };
  
  // Remove a source from the list
  const removeSource = (source: string) => {
    setFormData(prev => ({
      ...prev,
      possibleSources: prev.possibleSources.filter(s => s !== source),
    }));
  };
  
  // Go to next form step
  const goToNextStep = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.title || !formData.description || !formData.category) {
        toast({
          title: "Required fields missing",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.location) {
        toast({
          title: "Location required",
          description: "Please provide at least a general location for the issue.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  // Go to previous form step
  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions to submit your report.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would submit to your API here
      // const response = await fetch('/api/issues', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Issue reported successfully",
        description: "Thank you for your contribution to a cleaner environment.",
      });
      
      // Redirect to the issues list page after successful submission
      window.location.href = '/issues';
      
    } catch (error) {
      console.error('Error submitting issue:', error);
      toast({
        title: "Error submitting report",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Button asChild variant="outline" size="sm" className="mb-6">
        <Link href="/issues" className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Issues
        </Link>
      </Button>
      
      {/* Page title */}
      <AnimatedSection animation="fade" className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-3">
          Report an Environmental Issue
        </h1>
        <p className="text-gray-600">
          Help us identify and address environmental concerns in your community. 
          The information you provide will be reviewed by our team and relevant authorities.
        </p>
      </AnimatedSection>
      
      {/* Form steps indicator */}
      <div className="mb-10">
        <div className="flex justify-between">
          <div className={`step-item flex-1 ${currentStep >= 1 ? 'active' : ''}`}>
            <div className={`step-circle flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className="step-title text-sm mt-2">Basic Information</div>
          </div>
          <div className="step-connector flex-1 mx-4 mt-4 border-t-2 border-gray-200"></div>
          <div className={`step-item flex-1 ${currentStep >= 2 ? 'active' : ''}`}>
            <div className={`step-circle flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className="step-title text-sm mt-2">Location Details</div>
          </div>
          <div className="step-connector flex-1 mx-4 mt-4 border-t-2 border-gray-200"></div>
          <div className={`step-item flex-1 ${currentStep >= 3 ? 'active' : ''}`}>
            <div className={`step-circle flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
            <div className="step-title text-sm mt-2">Impact & Evidence</div>
          </div>
          <div className="step-connector flex-1 mx-4 mt-4 border-t-2 border-gray-200"></div>
          <div className={`step-item flex-1 ${currentStep >= 4 ? 'active' : ''}`}>
            <div className={`step-circle flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
              4
            </div>
            <div className="step-title text-sm mt-2">Review & Submit</div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
        <AnimatedSection 
          animation="fade" 
          className={`mb-6 ${currentStep === 1 ? 'block' : 'hidden'}`}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <FormLabel htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Brief title describing the issue (e.g., 'Chemical Spill in Green River')"
                      className="w-full"
                      required
                    />
                    <FormDescription className="text-xs text-gray-500 mt-1">
                      Keep it clear and descriptive (max 100 characters)
                    </FormDescription>
                  </div>
                  
                  <div>
                    <FormLabel htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Brief Description <span className="text-red-500">*</span>
                    </FormLabel>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Provide a short summary of the environmental issue"
                      className="w-full min-h-[100px]"
                      required
                    />
                    <FormDescription className="text-xs text-gray-500 mt-1">
                      Summarize the issue in 1-2 sentences (max 200 characters)
                    </FormDescription>
                  </div>
                  
                  <div>
                    <FormLabel htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Detailed Description
                    </FormLabel>
                    <Textarea
                      id="detailedDescription"
                      name="detailedDescription"
                      value={formData.detailedDescription}
                      onChange={handleChange}
                      placeholder="Provide detailed information about the issue, including when you first noticed it, any changes over time, and other relevant details"
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  
                  <div>
                    <FormLabel htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={(value) => handleSelectChange('category', value)}
                      value={formData.category}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select issue category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="water-pollution">Water Pollution</SelectItem>
                        <SelectItem value="air-pollution">Air Pollution</SelectItem>
                        <SelectItem value="waste-management">Waste Management</SelectItem>
                        <SelectItem value="soil-contamination">Soil Contamination</SelectItem>
                        <SelectItem value="habitat-destruction">Habitat Destruction</SelectItem>
                        <SelectItem value="noise-pollution">Noise Pollution</SelectItem>
                        <SelectItem value="light-pollution">Light Pollution</SelectItem>
                        <SelectItem value="deforestation">Deforestation</SelectItem>
                        <SelectItem value="wildlife-concerns">Wildlife Concerns</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <FormLabel htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                      Urgency Level
                    </FormLabel>
                    <Select 
                      onValueChange={(value) => handleSelectChange('urgency', value)}
                      value={formData.urgency}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Low - Attention needed, but not time-sensitive</SelectItem>
                        <SelectItem value="MEDIUM">Medium - Should be addressed within weeks</SelectItem>
                        <SelectItem value="HIGH">High - Requires prompt attention</SelectItem>
                        <SelectItem value="CRITICAL">Critical - Immediate action required</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs text-gray-500 mt-1">
                      Please select based on potential impact and time sensitivity
                    </FormDescription>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex justify-end">
            <Button type="button" onClick={goToNextStep}>
              Continue to Location Details
            </Button>
          </div>
        </AnimatedSection>
        
        {/* Step 2: Location Details */}
        <AnimatedSection 
          animation="fade" 
          className={`mb-6 ${currentStep === 2 ? 'block' : 'hidden'}`}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <FormLabel htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      General Location <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., 'Green River, North District'"
                      className="w-full"
                      required
                    />
                    <FormDescription className="text-xs text-gray-500 mt-1">
                      Provide a general area name, neighborhood, or landmark
                    </FormDescription>
                  </div>
                  
                  <div>
                    <FormLabel htmlFor="exactLocation" className="block text-sm font-medium text-gray-700 mb-1">
                      Exact Address/Location
                    </FormLabel>
                    <Input
                      id="exactLocation"
                      name="exactLocation"
                      value={formData.exactLocation}
                      onChange={handleChange}
                      placeholder="e.g., '123 Riverside Road, North District'"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FormLabel htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                        Latitude
                      </FormLabel>
                      <Input
                        id="latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="e.g., 37.7749"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                        Longitude
                      </FormLabel>
                      <Input
                        id="longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="e.g., -122.4194"
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                    <div className="text-center p-4">
                      <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500 mb-2">Interactive map would be displayed here</p>
                      <Button variant="outline" size="sm">
                        Use My Current Location
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        Providing precise location details helps authorities respond more effectively. 
                        If you're unsure about coordinates, you can use the general location field or draw on the map.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Back to Basic Information
            </Button>
            <Button type="button" onClick={goToNextStep}>
              Continue to Impact & Evidence
            </Button>
          </div>
        </AnimatedSection>
        
        {/* Step 3: Impact & Evidence */}
        <AnimatedSection 
          animation="fade" 
          className={`mb-6 ${currentStep === 3 ? 'block' : 'hidden'}`}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Species impact */}
                <div>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-3">
                    Affected Species
                  </FormLabel>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.affectedSpecies.map((species, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50 flex items-center gap-1 py-1.5">
                        {species}
                        <button 
                          type="button"
                          onClick={() => removeSpecies(species)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {formData.affectedSpecies.length === 0 && (
                      <span className="text-sm text-gray-500 italic">No species added yet</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={speciesInput}
                      onChange={(e) => setSpeciesInput(e.target.value)}
                      placeholder="Add affected species (e.g., 'Fish', 'Birds')"
                      className="flex-grow"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSpecies();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addSpecies}
                      disabled={!speciesInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                {/* Possible sources */}
                <div>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-3">
                    Possible Sources
                  </FormLabel>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.possibleSources.map((source, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50 flex items-center gap-1 py-1.5">
                        {source}
                        <button 
                          type="button"
                          onClick={() => removeSource(source)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {formData.possibleSources.length === 0 && (
                      <span className="text-sm text-gray-500 italic">No sources added yet</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={sourceInput}
                      onChange={(e) => setSourceInput(e.target.value)}
                      placeholder="Add possible source (e.g., 'Industrial Discharge')"
                      className="flex-grow"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSource();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addSource}
                      disabled={!sourceInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                {/* Image upload */}
                <div>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-3">
                    Photo Evidence
                  </FormLabel>
                  
                  {/* Image preview area */}
                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                            <img 
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                      >
                        <span>Upload images</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF up to 10MB each (maximum 5 images)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Back to Location Details
            </Button>
            <Button type="button" onClick={goToNextStep}>
              Continue to Review
            </Button>
          </div>
        </AnimatedSection>
        
        {/* Step 4: Review & Submit */}
        <AnimatedSection 
          animation="fade" 
          className={`mb-6 ${currentStep === 4 ? 'block' : 'hidden'}`}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Please review your report information carefully before submitting. 
                      Once submitted, your report will be reviewed by our team and shared with relevant environmental authorities.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Basic Information Review */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h3>
                    <div className="bg-gray-50 rounded-md p-4 space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Title:</p>
                        <p className="text-gray-900">{formData.title || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Description:</p>
                        <p className="text-gray-900">{formData.description || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Category:</p>
                        <p className="text-gray-900">
                          {formData.category ? (
                            formData.category.charAt(0).toUpperCase() + formData.category.slice(1).replace(/-/g, ' ')
                          ) : "Not selected"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Urgency:</p>
                        <p className="text-gray-900">{formData.urgency || "Not selected"}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Details Review */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Location Details</h3>
                    <div className="bg-gray-50 rounded-md p-4 space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">General Location:</p>
                        <p className="text-gray-900">{formData.location || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Exact Location:</p>
                        <p className="text-gray-900">{formData.exactLocation || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Coordinates:</p>
                        <p className="text-gray-900">
                          {formData.latitude && formData.longitude 
                            ? `${formData.latitude}, ${formData.longitude}` 
                            : "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Impact & Evidence Review */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Impact & Evidence</h3>
                    <div className="bg-gray-50 rounded-md p-4 space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Affected Species:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.affectedSpecies.length > 0 
                            ? formData.affectedSpecies.map((species, index) => (
                                <Badge key={index} variant="outline" className="bg-white">
                                  {species}
                                </Badge>
                              ))
                            : <p className="text-gray-700">None specified</p>
                          }
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Possible Sources:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.possibleSources.length > 0 
                            ? formData.possibleSources.map((source, index) => (
                                <Badge key={index} variant="outline" className="bg-white">
                                  {source}
                                </Badge>
                              ))
                            : <p className="text-gray-700">None specified</p>
                          }
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Photos:</p>
                        {previewImages.length > 0 
                          ? <p className="text-gray-900">{previewImages.length} photo(s) attached</p>
                          : <p className="text-gray-700">No photos attached</p>
                        }
                      </div>
                    </div>
                  </div>
                  
                  {/* Terms and conditions */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-start">
                      <Checkbox 
                        id="agreeToTerms" 
                        checked={formData.agreeToTerms}
                        onCheckedChange={handleCheckboxChange}
                        className="mt-1 mr-2"
                      />
                      <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                        I confirm that the information I've provided is accurate to the best of my knowledge. 
                        I understand that this report may be shared with relevant environmental authorities and 
                        that I may be contacted for additional information. 
                        <Link href="/terms" className="text-primary hover:underline ml-1">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Back to Impact & Evidence
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.agreeToTerms}
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
        </AnimatedSection>
      </form>
    </div>
  );
} 