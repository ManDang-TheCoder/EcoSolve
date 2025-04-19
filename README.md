# LocalEcoSolve

LocalEcoSolve is a web application that connects communities with solutions to local environmental challenges. It provides a platform for reporting environmental issues, finding experts, and tracking the impact of community efforts.

## Features

- **Environmental Issue Reporting**: Report and track local environmental problems
- **Expert Network**: Connect with verified environmental specialists
- **Issue Map**: Visualize environmental issues in your community
- **Impact Tracking**: Measure and celebrate community achievements

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/local-eco-solve.git
cd local-eco-solve
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
- Copy the `.env.local.example` file to `.env.local` and update the variables as needed

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
local-eco-solve/
├── app/                 # Next.js app directory
│   ├── actions/         # Server actions
│   ├── experts/         # Expert-related pages
│   ├── report-issue/    # Issue reporting pages
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── experts/         # Expert-related components
│   ├── issues/          # Issue-related components
│   └── ui/              # UI components from shadcn/ui
├── public/              # Static files
│   └── images/          # Image assets
├── styles/              # Global styles
├── lib/                 # Utility functions
├── types.d.ts           # Type declarations
└── next.config.mjs      # Next.js configuration
```

## Troubleshooting

If you encounter type errors, ensure you have the correct TypeScript configuration:

1. Make sure `node_modules` is properly installed
2. Check that `types.d.ts` includes all necessary module declarations
3. Restart your development server

## License

[MIT](LICENSE) 