// This file has been replaced with our custom auth system
// Check app/providers.tsx for the implementation

// This stub file is kept for compatibility with any code that might import from here
import { Session } from '../lib/next-auth-compatibility';

export type { Session };

export async function getServerSession() {
  console.warn("getServerSession from lib/auth was called but we're using a custom auth system in app/providers.tsx");
  return null;
}

export const authOptions = {
  providers: []
}; 