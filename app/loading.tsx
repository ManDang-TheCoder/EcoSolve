import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-l-8 border-green-600 animate-spin"></div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Loading</h2>
        <p className="text-gray-500 mt-2">Please wait while we prepare your content...</p>
      </div>
    </div>
  );
} 