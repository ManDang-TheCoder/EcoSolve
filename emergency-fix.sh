#!/bin/bash
echo "Executing emergency recovery..."

# Stop all Node.js processes
pkill -f "node" || true
sleep 2

# Clean all Next.js cache and build files thoroughly
echo "Cleaning all cache files..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

# Create fresh cache directories
mkdir -p .next/cache

# Start development server with clean state
echo "Starting development server with clean slate..."
NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 npm run dev 