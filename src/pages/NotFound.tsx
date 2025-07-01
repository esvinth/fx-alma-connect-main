
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import PageBackground from '@/components/layout/PageBackground';

const NotFound = () => {
  return (
    <PageBackground className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md md:p-12 text-center max-w-md mx-auto border border-fx-purple/20"
      >
        <motion.h1 
          className="text-7xl font-bold bg-gradient-to-r from-fx-purple to-fx-blue bg-clip-text text-transparent"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.h2 
          className="mt-4 text-3xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Page Not Found
        </motion.h2>
        <motion.p 
          className="mt-4 text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/">
            <Button className="mt-8 bg-gradient-to-r from-fx-purple to-fx-blue hover:opacity-90 transition-opacity">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </PageBackground>
  );
};

export default NotFound;
