#!/bin/bash

# Local Eco Solve - Setup Script
# This script helps set up the environment for running the LocalEcoSolve website

echo "🌱 Setting up LocalEcoSolve website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (version 18+) first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    echo "Please upgrade Node.js and try again."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
if [ -f "yarn.lock" ]; then
    yarn install
elif [ -f "pnpm-lock.yaml" ]; then
    if ! command -v pnpm &> /dev/null; then
        echo "Installing pnpm..."
        npm install -g pnpm
    fi
    pnpm install
else
    npm install
fi

# Generate Prisma client
echo "🗃️ Setting up database..."
npx prisma generate

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local from example file..."
    cp .env.local.example .env.local
    echo "⚠️ Please update the credentials in .env.local with your actual values."
fi

# Build the application
echo "🏗️ Building the application..."
npm run build

echo "✅ Setup complete! You can now run the website with:"
echo "npm run dev    # For development"
echo "npm run start  # For production"
echo ""
echo "📑 For more information, please see the README.md file." 