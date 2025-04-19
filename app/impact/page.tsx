'use client';

import React from 'react';

export default function ImpactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Our Impact</h1>
      <p className="text-xl mb-12">Measuring the difference we make together</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 border rounded-lg shadow-md text-center">
          <h2 className="text-5xl font-bold mb-2 text-green-600">2,500+</h2>
          <p className="text-lg">Community Members</p>
        </div>
        
        <div className="p-6 border rounded-lg shadow-md text-center">
          <h2 className="text-5xl font-bold mb-2 text-green-600">120</h2>
          <p className="text-lg">Local Projects</p>
        </div>
        
        <div className="p-6 border rounded-lg shadow-md text-center">
          <h2 className="text-5xl font-bold mb-2 text-green-600">45%</h2>
          <p className="text-lg">Waste Reduction</p>
        </div>
      </div>
      
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Success Stories</h2>
        <div className="p-6 border rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-medium mb-2">Green Spaces Initiative</h3>
          <p>Our community gardens have produced over 5,000 pounds of fresh produce for local food banks.</p>
        </div>
        
        <div className="p-6 border rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-2">Energy Savings Program</h3>
          <p>Local businesses have reduced energy usage by 30% through our collaborative efficiency programs.</p>
        </div>
      </div>
    </main>
  );
} 