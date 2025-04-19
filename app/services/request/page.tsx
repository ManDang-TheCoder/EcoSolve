import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, MapPin, Info } from 'lucide-react';

// Service types for selection
const serviceTypes = [
  { id: 'cleanup', name: 'Area Cleanup', description: 'Organized cleanup of parks, beaches, or natural areas' },
  { id: 'conservation', name: 'Conservation Project', description: 'Habitat restoration or species protection' },
  { id: 'education', name: 'Educational Workshop', description: 'Environmental education for communities or schools' },
  { id: 'assessment', name: 'Environmental Assessment', description: 'Professional assessment of environmental concerns' },
  { id: 'planting', name: 'Planting Project', description: 'Tree planting or garden establishment' },
  { id: 'monitoring', name: 'Environmental Monitoring', description: 'Ongoing monitoring of air, water, or soil quality' },
];

export default function RequestServicePage() {
  return (
    <div className="py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/services" 
          className="inline-flex items-center mb-6 text-sm font-medium text-green-600 hover:text-green-800"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Services
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-green-600 py-4 px-6">
            <h1 className="text-xl font-bold text-white">Request Environmental Service</h1>
          </div>
          
          <form className="p-6">
            <div className="space-y-8">
              {/* Service Type Selection */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">What type of service do you need?</h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  {serviceTypes.map((service) => (
                    <label 
                      key={service.id}
                      className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none hover:border-green-500"
                    >
                      <input
                        type="radio"
                        name="service-type"
                        value={service.id}
                        className="sr-only"
                      />
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <span className="block text-sm font-medium text-gray-900">{service.name}</span>
                          <span className="mt-1 flex items-center text-xs text-gray-500">{service.description}</span>
                        </span>
                      </span>
                      <span className="h-5 w-5 rounded-full border flex items-center justify-center">
                        <span className="rounded-full bg-green-600 h-2.5 w-2.5 invisible peer-checked:visible"></span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title/Name of Project
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      placeholder="e.g., Beach Cleanup at Ocean Park"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      placeholder="Please provide details about what you need help with..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Location */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Location</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <button type="button" className="text-sm text-green-600 font-medium">
                      Use my current location
                    </button>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      placeholder="Street address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        id="country"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        defaultValue="US"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="MX">Mexico</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timing */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Timing</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Date
                    </label>
                    <div className="mt-1 flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="date"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Time
                    </label>
                    <div className="mt-1 flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="time"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="flexibility" className="block text-sm font-medium text-gray-700">
                      Time Flexibility
                    </label>
                    <select
                      id="flexibility"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    >
                      <option>Exact date and time only</option>
                      <option>Flexible within 1-2 days</option>
                      <option>Flexible within a week</option>
                      <option>Flexible within a month</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Additional Details */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
                      Estimated Number of Participants/Volunteers Needed
                    </label>
                    <input
                      type="number"
                      id="participants"
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                      Budget (if applicable)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        id="budget"
                        className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                      Special Requirements or Considerations
                    </label>
                    <textarea
                      id="requirements"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      placeholder="Any additional details that service providers should know..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="updates"
                        name="updates"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="updates" className="font-medium text-gray-700">
                        Receive updates about this request
                      </label>
                      <p className="text-gray-500">We'll send you status updates and messages from service providers.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Terms and Disclaimer */}
              <div className="bg-yellow-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Information</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        By submitting this request, you agree that:<br />
                        - Your request will be reviewed by our team<br />
                        - A service provider may contact you for more details<br />
                        - Local Eco Solve will help coordinate but does not guarantee service availability
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 