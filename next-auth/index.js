// Compatibility layer for next-auth
import * as compatFunctions from '../lib/next-auth-compatibility';

// Export all the compatibility functions
export const NextAuth = compatFunctions.NextAuth;
export const getServerSession = compatFunctions.getServerSession;
export const authOptions = compatFunctions.authOptions;

// Default export
export default compatFunctions.NextAuth; 