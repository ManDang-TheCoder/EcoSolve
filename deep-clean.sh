#!/bin/bash
echo "Deep cleaning Next.js app..."

# Kill all node processes
echo "Stopping all Node.js processes..."
pkill -f "node" || true
sleep 2

# Thoroughly clean Next.js cache and temporary files
echo "Removing all cache and temporary files..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo
rm -rf .vercel
find . -name ".DS_Store" -delete
find . -name "*.log" -delete

# Make directory for cache
mkdir -p .next/cache

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force

# Reinstall dependencies if needed
echo "Reinstalling dependencies..."
rm -rf node_modules
npm install

# Start fresh development server
echo "Starting development server..."
npm run dev 