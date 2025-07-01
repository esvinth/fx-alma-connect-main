
import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
  return (
    <div className="bg-gradient-to-r from-fx-purple/10 to-fx-blue/10 py-8 mb-8 border-b border-fx-purple/10">
      <div className="fx-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-fx-purple to-fx-blue bg-clip-text text-transparent">{title}</h1>
            {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
          </motion.div>
          {children && (
            <motion.div 
              className="mt-4 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
