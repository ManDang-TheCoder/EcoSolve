'use client';

import React from 'react';
import Link from 'next/link';

const eventsData = [
  {
    id: 1,
    title: 'Community Garden Planting Day',
    date: 'May 15, 2025',
    location: 'Central Community Garden',
    description: 'Join us for a day of planting and community building. Bring your gardening tools and enthusiasm!',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Eco-Friendly Home Workshop',
    date: 'June 5, 2025',
    location: 'City Library Conference Room',
    description: 'Learn practical ways to make your home more energy efficient and environmentally friendly.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Community Clean-Up Day',
    date: 'June 20, 2025',
    location: 'Riverside Park',
    description: 'Help clean up our local park and waterways. Equipment will be provided. Just bring your energy!',
    image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Sustainable Cooking Class',
    date: 'July 10, 2025',
    location: 'Community Center Kitchen',
    description: 'Learn to cook delicious meals using locally-sourced, seasonal ingredients.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl max-w-3xl mx-auto">Join our community events to connect with others passionate about local sustainability and environmental action.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {eventsData.map((event) => (
            <div key={event.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={event.image} alt={event.title} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-600">
                    {event.date}
                  </p>
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{event.title}</p>
                    <p className="mt-3 text-base text-gray-500">{event.description}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                      {event.location}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <Link
                      href={`/events/register/${event.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link
            href="/events/all"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
          >
            View All Events
          </Link>
        </div>
      </div>
    </main>
  );
} 