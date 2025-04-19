import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Video, MessageSquare, Star, Users, Clock4, ArrowRight, Filter } from 'lucide-react';

// Mock data for consultation types
const consultationTypes = [
  {
    id: 'quick',
    name: 'Quick Consultation',
    description: 'A 30-minute session to get quick advice on a specific environmental issue',
    duration: '30 minutes',
    price: 'Free',
    icon: Clock
  },
  {
    id: 'standard',
    name: 'Standard Consultation',
    description: 'A comprehensive 60-minute session to discuss your environmental concerns in detail',
    duration: '60 minutes',
    price: '$75',
    icon: Calendar
  },
  {
    id: 'site',
    name: 'Site Assessment',
    description: 'An expert will visit your location to provide on-site evaluation and recommendations',
    duration: 'Varies',
    price: 'From $150',
    icon: MapPin
  },
  {
    id: 'ongoing',
    name: 'Ongoing Support',
    description: 'Regular consultations and guidance for long-term environmental projects or initiatives',
    duration: 'Custom',
    price: 'Custom pricing',
    icon: Users
  }
];

// Mock data for featured experts (using some from the experts page)
const featuredExperts = [
  {
    id: '1',
    name: 'Dr. Emma Johnson',
    image: '/placeholder-user.jpg',
    expertise: ['Water Conservation', 'Marine Biology', 'Pollution Control'],
    rating: 4.9,
    reviewCount: 27,
    availability: 'Next available: Today',
    bio: 'Marine biologist with 12 years of experience working on water pollution and sustainable fishing practices. PhD from Stanford University.'
  },
  {
    id: '3',
    name: 'Sarah Patel',
    image: '/placeholder-user.jpg',
    expertise: ['Sustainable Agriculture', 'Urban Farming', 'Food Systems'],
    rating: 4.8,
    reviewCount: 32,
    availability: 'Next available: Tomorrow',
    bio: 'Agricultural scientist specializing in sustainable farming methods and urban food systems. Founded three community garden initiatives.'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    image: '/placeholder-user.jpg',
    expertise: ['Waste Management', 'Circular Economy', 'Industrial Ecology'],
    rating: 4.6,
    reviewCount: 15,
    availability: 'Next available: Wed, May 15',
    bio: 'Environmental engineer with expertise in waste reduction and circular economy principles. Consults with businesses on sustainable practices.'
  }
];

// Mock testimonials
const testimonials = [
  {
    id: 1,
    content: "The consultation helped us implement water conservation methods that reduced our usage by 40%. Incredibly valuable advice!",
    author: "Maria Rodriguez",
    role: "Community Garden Manager",
    image: "/placeholder-user.jpg"
  },
  {
    id: 2,
    content: "Our business was able to transition to sustainable packaging thanks to the expert guidance we received. The ROI has been remarkable.",
    author: "James Chen",
    role: "Small Business Owner",
    image: "/placeholder-user.jpg"
  },
  {
    id: 3,
    content: "The site assessment identified critical biodiversity opportunities on our property that we never would have discovered on our own.",
    author: "Tanya Williams",
    role: "Landowner",
    image: "/placeholder-user.jpg"
  }
];

export default function ConsultPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-green-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative h-full w-full">
            <Image
              src="/placeholder.jpg"
              alt="Expert consultation on environmental issues"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
              className="absolute inset-0"
            />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Expert Environmental Consultations
          </h1>
          <p className="text-xl max-w-3xl mb-8">
            Connect with qualified environmental experts to get personalized advice, 
            solutions, and guidance for your sustainability challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#book-consultation" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors">
              <Calendar className="mr-2 h-5 w-5" />
              Book a Consultation
            </Link>
            <Link href="/experts" className="bg-white hover:bg-gray-100 text-green-800 font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors">
              <Users className="mr-2 h-5 w-5" />
              Browse All Experts
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How Consultations Work</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined process connects you with the right expert for your environmental needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">1</div>
              <div className="pt-4">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Choose Your Consultation Type</h3>
                <p className="text-gray-600">
                  Select from various consultation formats based on your needs, timeline, and budget.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">2</div>
              <div className="pt-4">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Book with the Right Expert</h3>
                <p className="text-gray-600">
                  Browse expert profiles, check availability, and schedule a time that works for you.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">3</div>
              <div className="pt-4">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Receive Expert Guidance</h3>
                <p className="text-gray-600">
                  Meet with your expert via video call or in-person to discuss your environmental challenges and get actionable advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Consultation Types */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Consultation Options</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the consultation format that best fits your environmental needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <div key={type.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{type.name}</h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock4 className="h-4 w-4 mr-1" />
                        {type.duration}
                      </div>
                      <div className="font-medium text-gray-900">{type.price}</div>
                    </div>
                    <Link 
                      href={`/consult/book?type=${type.id}`}
                      className="block w-full text-center py-2 px-4 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                    >
                      Select
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Featured Experts */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Experts</h2>
              <p className="mt-2 text-lg text-gray-600">
                Our top environmental specialists ready to help you
              </p>
            </div>
            <Link 
              href="/experts"
              className="text-green-600 hover:text-green-800 font-medium flex items-center"
            >
              View all experts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredExperts.map((expert) => (
              <div key={expert.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Image 
                      src={expert.image}
                      alt={expert.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">{expert.rating} ({expert.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">{expert.bio}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {expert.expertise.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-green-600 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {expert.availability}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link 
                      href={`/consult/book?expert=${expert.id}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center"
                    >
                      Book Consultation
                    </Link>
                    <Link 
                      href={`/experts/${expert.id}`}
                      className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded flex items-center justify-center"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div id="book-consultation" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Book Your Consultation</h2>
            <p className="mt-4 text-lg text-gray-600">
              Tell us about your environmental needs and we'll match you with the right expert
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-green-600 p-6 text-white">
              <h3 className="text-xl font-bold">Consultation Request Form</h3>
              <p className="text-green-100">Fill out the form below to get started</p>
            </div>
            
            <form className="p-6 space-y-6">
              {/* Consultation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Consultation Type
                </label>
                <div className="mt-1">
                  <select 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a consultation type</option>
                    {consultationTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.name} ({type.duration})</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Topic */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                  What environmental topic do you need help with?
                </label>
                <div className="mt-1">
                  <select 
                    id="topic"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="water">Water Conservation</option>
                    <option value="energy">Renewable Energy</option>
                    <option value="waste">Waste Management</option>
                    <option value="agriculture">Sustainable Agriculture</option>
                    <option value="pollution">Pollution Control</option>
                    <option value="conservation">Wildlife Conservation</option>
                    <option value="policy">Environmental Policy</option>
                    <option value="other">Other (please specify)</option>
                  </select>
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Please describe your environmental challenge or question
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Provide details about what you need help with..."
                ></textarea>
              </div>
              
              {/* Consultation Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Consultation Method
                </label>
                <div className="mt-1 space-y-3">
                  <div className="flex items-center">
                    <input
                      id="method-video"
                      name="method"
                      type="radio"
                      defaultChecked
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label htmlFor="method-video" className="ml-3 flex items-center text-gray-700">
                      <Video className="h-5 w-5 mr-2 text-gray-500" />
                      Video Call
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="method-phone"
                      name="method"
                      type="radio"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label htmlFor="method-phone" className="ml-3 flex items-center text-gray-700">
                      <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
                      Phone Call
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="method-inperson"
                      name="method"
                      type="radio"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label htmlFor="method-inperson" className="ml-3 flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                      In Person (if available)
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Preferred Date/Time */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Your Contact Information</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-5">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Request Consultation
                </button>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  We'll confirm availability and follow up within 24 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              See how our expert consultations have helped others solve their environmental challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.author}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              href="/testimonials"
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
            >
              Read more success stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">How much does a consultation cost?</h3>
              <p className="mt-2 text-gray-600">
                We offer a range of consultation options from free quick sessions to more comprehensive paid consultations.
                Prices vary based on the expert's qualifications, consultation length, and format. You can see pricing on each expert's profile.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">How do I choose the right expert?</h3>
              <p className="mt-2 text-gray-600">
                You can browse expert profiles based on expertise areas, read reviews, and check their qualifications.
                If you're unsure, you can request a match based on your specific environmental needs.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">What happens after I request a consultation?</h3>
              <p className="mt-2 text-gray-600">
                You'll receive a confirmation email with details. The expert will review your request and either confirm
                the appointment or suggest alternative times. Once confirmed, you'll receive instructions for the meeting.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">Can I get a refund if I need to cancel?</h3>
              <p className="mt-2 text-gray-600">
                Yes, cancellations made at least 24 hours before the scheduled consultation are eligible for a full refund.
                Cancellations with less notice may receive partial credit for future consultations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Solve Your Environmental Challenges?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our network of environmental experts is ready to provide the guidance you need.
          </p>
          <Link 
            href="#book-consultation"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white"
          >
            Book Your Consultation Today
          </Link>
        </div>
      </div>
    </div>
  );
} 