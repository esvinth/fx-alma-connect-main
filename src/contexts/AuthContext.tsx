
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'alumni' | 'student' | 'admin';
  department?: string;
  batch?: string;
  currentJob?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'alumni' | 'student', batch?: string, department?: string, currentJob?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to convert Firebase user to our app's User type
const formatUser = (firebaseUser: FirebaseUser): User => {
  // Get additional data from localStorage if available
  const userData = localStorage.getItem(`userData_${firebaseUser.uid}`);
  let additionalData = {};
  
  if (userData) {
    try {
      additionalData = JSON.parse(userData);
    } catch (error) {
      console.error('Failed to parse user data from localStorage', error);
    }
  }
  
  // Default role is alumni if not specified
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    email: firebaseUser.email || '',
    role: 'alumni',
    ...additionalData
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const formattedUser = formatUser(firebaseUser);
        setUser(formattedUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const formattedUser = formatUser(result.user);
      
      // Special case for admin email
      if (email === 'admin@fxec.edu') {
        formattedUser.role = 'admin';
        // Save admin role to localStorage
        localStorage.setItem(`userData_${result.user.uid}`, JSON.stringify({ role: 'admin' }));
      }
      
      setUser(formattedUser);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${formattedUser.name}!`,
      });
      
      // Instead of using navigate, we'll update the URL directly
      // This will be handled by React Router
      if (formattedUser.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/feed';
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'alumni' | 'student', batch?: string, department?: string, currentJob?: string) => {
    setIsLoading(true);
    try {
      // Create the user with Firebase
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with their name
      await updateProfile(result.user, { displayName: name });
      
      // Store additional user data in localStorage
      const additionalData = { role, batch, department, currentJob };
      localStorage.setItem(`userData_${result.user.uid}`, JSON.stringify(additionalData));
      
      // Format and set the user
      const formattedUser = formatUser(result.user);
      formattedUser.role = role;
      formattedUser.batch = batch;
      formattedUser.department = department;
      formattedUser.currentJob = currentJob;
      
      setUser(formattedUser);
      
      toast({
        title: "Registration Successful",
        description: "Welcome to FX Alma Connect!",
      });
      
      window.location.href = '/feed';
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login, 
        register,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
