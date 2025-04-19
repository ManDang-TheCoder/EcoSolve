#!/bin/bash
echo "Restarting Next.js app..."

# Kill all running Next.js processes
echo "Stopping all existing Next.js processes..."
pkill -f "next" || true
sleep 2

# Thoroughly clean Next.js cache
echo "Cleaning Next.js cache thoroughly..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

# Create fresh cache directory
mkdir -p .next/cache

# Start with a completely clean state
echo "Starting development server with a clean state..."
npm run dev



