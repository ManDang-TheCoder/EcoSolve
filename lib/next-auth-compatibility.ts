// This file provides compatibility functions to prevent errors when components try to use next-auth
// while we're using our custom auth system

import { useAuth } from '@/app/providers';
import { useCallback } from 'react';

// Minimal session type to match next-auth's Session
export type Session = {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
  };
  expires: string;
};

// Mock for the useSession hook from next-auth/react
export function useSession() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return { data: null, status: "loading" };
  }
  
  if (user) {
    // If user is logged in, return a session-like object
    return {
      data: {
        user: {
          name: user.name,
          email: user.email,
          image: user.image || undefined,
          id: user.id,
        },
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      status: "authenticated"
    };
  }
  
  // If user is not logged in
  return { data: null, status: "unauthenticated" };
}

// Mock for the signIn function - this is a regular function, not a hook
export function signIn(provider?: string, options?: any) {
  console.warn("next-auth signIn() was called, but we're using a custom auth system. Redirecting to /auth/signin instead.");
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/signin';
  }
  return Promise.resolve({ ok: false, error: "Custom auth system in use. Please use the login page." });
}

// Create a hook to use signOut properly
export function useSignOut() {
  const { logout } = useAuth();

  // Return memoized function to avoid recreation on each render
  return useCallback(() => {
    console.warn("next-auth signOut() was called, but we're using a custom auth system. Using custom logout instead.");
    logout();
    return Promise.resolve({ ok: true });
  }, [logout]);
}

// Mock for the signOut function that doesn't use hooks
export function signOut(options?: any) {
  console.warn("next-auth signOut() was called directly without useSignOut hook. Redirecting to signout page.");
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/signout';
  }
  return Promise.resolve({ ok: true });
}

// For server-side auth checks
export async function getServerSession() {
  console.warn("getServerSession from next-auth was called, but we're using a custom auth system.");
  return null;
}

// Export a dummy NextAuth function to prevent errors
export function NextAuth() {
  return {
    auth: async () => {
      return { user: null };
    }
  };
}

export const authOptions = {
  providers: []
}; 