
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HeroBanner = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Update the time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Set appropriate greeting based on time of day
    const updateGreeting = () => {
      const hour = currentTime.getHours();
      if (hour < 12) {
        setGreeting('Good morning');
      } else if (hour < 18) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    };

    updateGreeting();
    
    return () => clearInterval(intervalId);
  }, [currentTime]);

  return (
    <div 
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="relative fx-container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-2 text-white/80">
            {greeting}
            {isAuthenticated && user ? `, ${user.name}` : ''}
            {' • '}
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
            Welcome to FX Alma Connect
            {isAuthenticated && user ? `, ${user.name}!` : ''}
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Reconnect with your college friends, find mentors, and discover career opportunities in the FX Engineering College alumni network.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {!isAuthenticated ? (
              <>
                <Link to="/register">
                  <Button size="lg" className="bg-white text-fx-purple hover:bg-gray-100 transition-colors">
                    Join the Network
                  </Button>
                </Link>
                <Link to="/alumni">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-colors">
                    Browse Alumni
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/feed">
                  <Button size="lg" className="bg-white text-fx-purple hover:bg-gray-100 transition-colors">
                    Go to Feed
                  </Button>
                </Link>
                <Link to="/alumni">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-colors">
                    Browse Alumni
                  </Button>
                </Link>
              </>
            )}
          </div>
          {!isAuthenticated && (
            <p className="mt-6 text-white/70 text-sm animate-fade-up" style={{ animationDelay: '0.3s' }}>
              Already a member? <Link to="/login" className="underline hover:text-white">Log in here</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
