'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider } from 'next-themes';
// Comment out SessionProvider until we're ready to use it
// import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

// Check if we're in the browser environment to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

// Safe useLayoutEffect implementation that doesn't run during SSR
const useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;

// Enhanced browser detection
const getBrowserInfo = () => {
  if (!isBrowser) return { name: 'SSR', version: '0', compatible: true };
  
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let version = '0';
  let compatible = true;
  
  // More comprehensive checks for browsers
  if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1 && ua.indexOf('OPR') === -1) {
    browserName = 'Chrome';
    const match = ua.match(/Chrome\/(\d+)/);
    if (match && match[1]) {
      version = match[1];
      compatible = parseInt(version) >= 70; // Chrome 70+ is considered compatible
    }
  } else if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    const match = ua.match(/Firefox\/(\d+)/);
    if (match && match[1]) {
      version = match[1];
      compatible = parseInt(version) >= 65; // Firefox 65+ is compatible
    }
  } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
    browserName = 'Safari';
    const match = ua.match(/Version\/(\d+)/);
    if (match && match[1]) {
      version = match[1];
      compatible = parseInt(version) >= 12; // Safari 12+ is compatible
    }
  } else if (ua.indexOf('Edg') > -1) {
    browserName = 'Edge';
    const match = ua.match(/Edg\/(\d+)/);
    if (match && match[1]) {
      version = match[1];
      compatible = parseInt(version) >= 79; // Chromium-based Edge is compatible
    }
  }
  
  return { name: browserName, version, compatible };
};

// Client-side only components
const BrowserCompatibilityWarning = dynamic(() => 
  Promise.resolve(() => {
    const [browserInfo, setBrowserInfo] = useState({ name: 'SSR', version: '0', compatible: true });
    
    useEffect(() => {
      setBrowserInfo(getBrowserInfo());
    }, []);
    
    if (browserInfo.compatible) return null;
    
    return (
      <div className="fixed bottom-0 w-full bg-yellow-100 text-yellow-800 p-4 text-center z-50">
        <p>
          You're using {browserInfo.name} {browserInfo.version} which may have limited compatibility.
          For the best experience, please use Chrome 70+, Firefox 65+, Safari 12+, or Edge 79+.
        </p>
      </div>
    );
  }),
  { ssr: false }
);

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'EXPERT' | 'VOLUNTEER' | 'ADMIN';
  image?: string;
  location?: string;
};

// Auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<boolean>;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes
const MOCK_USER: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'USER',
  image: '/placeholder-user.jpg',
  location: 'Portland, OR',
};

// AuthProvider component
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Helper function to make authenticated API requests
  const authFetch = async (url: string, options: RequestInit = {}) => {
    if (!isBrowser) return new Response(JSON.stringify({ error: 'Server-side API call not supported' }));
    
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };
    
    return fetch(url, { ...options, headers });
  };

  // Simulate checking for stored auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Skip if not in browser
        if (!isBrowser) {
          setIsLoading(false);
          return;
        }
        
        // Check if we have a token in localStorage
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          // Set the user from localStorage initially
          setUser(JSON.parse(storedUser));
          
          // Then verify and refresh user data from API
          try {
            const response = await authFetch('/api/auth/user');
            
            if (response.ok) {
              const data = await response.json();
              setUser(data.user);
              // Update stored user data
              localStorage.setItem('user', JSON.stringify(data.user));
            } else {
              // If API returns error, token might be expired - force logout
              console.warn('Token validation failed');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setUser(null);
            }
          } catch (apiError) {
            console.error('API error during auth check:', apiError);
            // If API error, keep using stored user data but log warning
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (isBrowser) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    if (!isBrowser) return false;
    
    setIsLoading(true);
    
    try {
      // In development or demo mode, allow a mock login
      if (process.env.NODE_ENV === 'development' && 
         (email === 'test@example.com' && password === 'password123' || email === MOCK_USER.email)) {
        const loggedInUser = MOCK_USER;
        
        // Store the user in local storage
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', 'mock-token-for-development-only');
        setUser(loggedInUser);
        
        toast.success('Successfully logged in with demo account!');
        return true;
      }
      
      // Real API call for authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe: true }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || 'Login failed');
        return false;
      }
      
      const data = await response.json();
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setUser(data.user);
      
      toast.success('Successfully logged in!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call the logout API to clear the cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      // Clear client-side storage
      if (isBrowser) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      setUser(null);
      toast.success('Successfully logged out!');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear local storage and state
      if (isBrowser) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      setUser(null);
      toast.error('An error occurred during logout.');
      router.push('/');
    }
  };

  // Register function
  const register = async (userData: any): Promise<boolean> => {
    if (!isBrowser) return false;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || 'Registration failed');
        return false;
      }
      
      toast.success('Account created successfully! Please log in.');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Provide additional helper methods
  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    if (!isBrowser) return false;
    
    try {
      if (!user) return false;
      
      const response = await authFetch('/api/auth/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || 'Failed to update profile');
        return false;
      }
      
      const data = await response.json();
      
      // Update user state and storage
      setUser(prev => prev ? { ...prev, ...data.user } : null);
      localStorage.setItem('user', JSON.stringify({ ...user, ...data.user }));
      
      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('An error occurred while updating your profile.');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      register,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-50 text-red-800">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

// Custom ErrorBoundary component
class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} resetErrorBoundary={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

// Providers component that wraps the entire app
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppErrorBoundary>
      {/* <SessionProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {isBrowser && <BrowserCompatibilityWarning />}
            {children}
          </AuthProvider>
        </ThemeProvider>
      {/* </SessionProvider> */}
    </AppErrorBoundary>
  );
} 