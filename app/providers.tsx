'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Check if we're in the browser environment to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

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

// Browser compatibility warning
function BrowserCompatibilityWarning() {
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
}

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
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
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

  // Simulate checking for stored auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check for a stored token and validate it
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your auth endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // For demo purposes, we'll accept any login with the test credentials
      // or use the mock user credentials
      if ((email === 'test@example.com' && password === 'password123') || 
          (email === MOCK_USER.email)) {
        const loggedInUser = MOCK_USER;
        
        // Store the user in local storage
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        
        toast.success('Successfully logged in!');
        return true;
      } else {
        toast.error('Invalid email or password.');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Successfully logged out!');
    router.push('/');
  };

  // Register function
  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your registration endpoint
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // For demo purposes, just return success
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
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

// Providers component that wraps the entire app
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppErrorBoundary>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <BrowserCompatibilityWarning />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </SessionProvider>
    </AppErrorBoundary>
  );
} 