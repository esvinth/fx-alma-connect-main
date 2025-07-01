
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Navbar />
      {isAuthenticated && user && (
        <div className="bg-gradient-to-r from-fx-purple/10 to-fx-blue/10 py-2 text-center border-b border-fx-purple/10">
          <p className="text-sm text-fx-purple">
            Welcome back, <span className="font-bold">{user.name}</span>! 
            {user.role === 'admin' && <span className="ml-1 bg-fx-purple text-white text-xs px-2 py-0.5 rounded-full">Admin</span>}
          </p>
        </div>
      )}
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;
