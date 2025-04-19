'use client';

import React from 'react';

export default function SolutionsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Eco Solutions</h1>
      <p className="text-xl mb-12">Discover sustainable solutions for your community</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Solution cards will go here */}
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Community Gardens</h2>
          <p>Create shared green spaces for growing food and fostering community connection.</p>
        </div>
        
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Energy Conservation</h2>
          <p>Implement energy-saving initiatives to reduce carbon footprint and utility costs.</p>
        </div>
        
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Waste Reduction</h2>
          <p>Develop waste management strategies to minimize landfill impact.</p>
        </div>
      </div>
    </main>
  );
} 