// Compatibility layer for next-auth
import * as compatFunctions from '../lib/next-auth-compatibility';

// Export the useSession hook (a valid React hook)
export const useSession = compatFunctions.useSession;

// Export the signIn function (not a hook, just a regular function)
export const signIn = compatFunctions.signIn;

// Export useSignOut hook (for components that need to call signOut)
export const useSignOut = compatFunctions.useSignOut;

// Export signOut as a non-hook function for compatibility
export const signOut = compatFunctions.signOut;

// Default export for components that import directly
export default {
  useSession: compatFunctions.useSession,
  signIn: compatFunctions.signIn,
  signOut: compatFunctions.signOut,
  useSignOut: compatFunctions.useSignOut,
}; 