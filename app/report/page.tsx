import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, MapPin, AlertTriangle, Send, Info, Calendar, ChevronDown, Upload, Check } from 'lucide-react';

const issueTypes = [
  {
    id: 'pollution',
    name: 'Pollution',
    description: 'Report water, air, noise, or soil pollution incidents'
  },
  {
    id: 'illegal-dumping',
    name: 'Illegal Dumping',
    description: 'Report unauthorized waste disposal or littering'
  },
  {
    id: 'habitat-destruction',
    name: 'Habitat Destruction',
    description: 'Report destruction of natural habitats or ecosystems'
  },
  {
    id: 'endangered-species',
    name: 'Endangered Species',
    description: 'Report threats to protected wildlife or plant species'
  },
  {
    id: 'deforestation',
    name: 'Deforestation',
    description: 'Report illegal logging or forest clearing activities'
  },
  {
    id: 'water-issues',
    name: 'Water Issues',
    description: 'Report water wastage, contamination, or drainage problems'
  },
  {
    id: 'other',
    name: 'Other Environmental Concern',
    description: 'Report other environmental issues not listed above'
  }
];

const urgencyLevels = [
  { id: 'low', name: 'Low', description: 'No immediate threat, but needs attention' },
  { id: 'medium', name: 'Medium', description: 'Ongoing issue with moderate impact' },
  { id: 'high', name: 'High', description: 'Serious impact requiring prompt action' },
  { id: 'critical', name: 'Critical', description: 'Immediate threat requiring urgent action' }
];

export default function ReportPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-green-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative h-full w-full">
            <Image
              src="/placeholder.jpg"
              alt="Report environmental issues"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
              className="absolute inset-0"
            />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Report Environmental Issues
          </h1>
          <p className="text-xl text-center max-w-3xl mb-6">
            Help us protect our environment by reporting issues in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link href="#report-form" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Report Now
            </Link>
            <Link href="/report/map" className="bg-white hover:bg-gray-100 text-green-800 font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors">
              <MapPin className="mr-2 h-5 w-5" />
              View Issues Map
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Reporting Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Submit Your Report</h3>
              <p className="text-gray-600">
                Fill out the form with details about the environmental issue you've observed, including photos and location data.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <Info className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verification Process</h3>
              <p className="text-gray-600">
                Our team reviews your report and may contact you for additional information if needed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Action Taken</h3>
              <p className="text-gray-600">
                We escalate verified reports to the appropriate authorities or community groups who can take action to address the issue.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Form */}
      <div id="report-form" className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100">
          <div className="bg-green-700 py-6 px-8">
            <h2 className="text-2xl font-bold text-white">Environmental Issue Report</h2>
            <p className="text-green-100 mt-1">
              Please provide as much detail as possible to help us address the issue effectively
            </p>
          </div>

          <form className="p-8">
            {/* Issue Type */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What type of issue are you reporting?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {issueTypes.map((type) => (
                  <label 
                    key={type.id}
                    className="relative flex flex-col bg-white p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <input 
                      type="radio" 
                      name="issueType" 
                      value={type.id}
                      className="absolute h-0 w-0 opacity-0 peer"
                    />
                    <div className="mb-2 flex justify-between items-start">
                      <span className="font-medium text-gray-800">{type.name}</span>
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white hidden peer-checked:block" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Urgency Level */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">How urgent is this issue?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {urgencyLevels.map((level) => (
                  <label 
                    key={level.id}
                    className="relative flex items-center bg-white p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <input 
                      type="radio" 
                      name="urgencyLevel" 
                      value={level.id}
                      className="h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-800">{level.name}</span>
                      <p className="text-sm text-gray-500">{level.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                <MapPin className="h-5 w-5 inline-block mr-2 text-green-600" />
                Location
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address or Landmark
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="E.g., Near Central Park, West 59th Street"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200">
                    <MapPin className="h-4 w-4 mr-2" />
                    Use my current location
                  </button>
                  <span className="text-sm text-gray-500 ml-3">or</span>
                  <button type="button" className="ml-3 text-sm text-green-600 hover:text-green-800">
                    Pin on map
                  </button>
                </div>
              </div>
            </div>

            {/* Date Observed */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                <Calendar className="h-5 w-5 inline-block mr-2 text-green-600" />
                When did you observe this issue?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="observedDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="observedDate"
                    name="observedDate"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="observedTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Approximate Time (optional)
                  </label>
                  <input
                    type="time"
                    id="observedTime"
                    name="observedTime"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="isOngoing" 
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">This issue is ongoing/recurring</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                <Info className="h-5 w-5 inline-block mr-2 text-green-600" />
                Describe the issue
              </h3>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Please provide as much detail as possible about what you observed..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
              <div className="mt-4">
                <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-1">
                  Potential impact (optional)
                </label>
                <textarea
                  id="impact"
                  name="impact"
                  rows={2}
                  placeholder="How is this issue affecting the environment, wildlife, or community?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
            </div>

            {/* Photo Evidence */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                <Camera className="h-5 w-5 inline-block mr-2 text-green-600" />
                Upload Photos or Evidence
              </h3>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500"
                    >
                      <span>Upload files</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each (max 5 files)</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">Visual evidence greatly helps in assessing and addressing the issue.</p>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Contact Information</h3>
              <p className="text-sm text-gray-500 mb-4">
                This information will be kept confidential and only used to follow up on your report if necessary.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="anonymous" 
                    className="h-4 w-4 mt-1 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I wish to remain anonymous (note: this may limit our ability to follow up or get additional information)
                  </span>
                </label>
              </div>
            </div>

            {/* Terms and Agreement */}
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  name="terms" 
                  required
                  className="h-4 w-4 mt-1 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I understand that filing a false report may be subject to penalties. I confirm that the information provided is accurate to the best of my knowledge.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Send className="mr-2 h-5 w-5" />
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What Happens After You Report?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                <li>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-700 font-bold">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Confirmation</h3>
                        <p className="text-sm text-gray-500">
                          You'll receive an email confirmation with a reference number for your report.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-700 font-bold">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Review Process</h3>
                        <p className="text-sm text-gray-500">
                          Our team will review your report within 1-3 business days and may contact you for additional information.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-700 font-bold">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Action Plan</h3>
                        <p className="text-sm text-gray-500">
                          We'll determine the appropriate action, which may include notifying local authorities, community cleanup initiatives, or other interventions.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-700 font-bold">4</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Status Updates</h3>
                        <p className="text-sm text-gray-500">
                          You'll receive updates on the status of your report and any actions taken (unless you chose to remain anonymous).
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6 text-center">
              <Link href="/report/faq" className="text-green-600 hover:text-green-800 font-medium">
                View Frequently Asked Questions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-auto max-w-7xl my-8 mx-4 sm:mx-6 lg:mx-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Emergency Situations</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                For immediate threats to life, health, or significant environmental damage requiring emergency response,
                please contact your local emergency services directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 