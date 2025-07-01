
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AuthForm from '@/components/auth/AuthForm';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import PageBackground from '@/components/layout/PageBackground';

const Register = () => {
  return (
    <MainLayout>
      <PageBackground>
        <div className="flex items-center justify-center py-12">
          <div className="max-w-md w-full mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-fx-purple/20 shadow-lg shadow-fx-purple/10 backdrop-blur-sm bg-white/90">
                <CardContent className="pt-6 pb-8">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <div className="text-center mb-6">
                      <motion.div 
                        className="inline-block mb-3 bg-gradient-to-r from-fx-purple to-fx-blue p-3 rounded-full"
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </motion.div>
                      <motion.h1 
                        className="text-2xl font-bold bg-gradient-to-r from-fx-purple to-fx-blue bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        Join Our Alumni Network
                      </motion.h1>
                      <motion.p 
                        className="text-gray-600 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        Create an account to connect with the FX community
                      </motion.p>
                    </div>
                    <AuthForm type="register" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </PageBackground>
    </MainLayout>
  );
};

export default Register;
