
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Newspaper, Briefcase, Calendar, 
  MessageCircle, Menu, X, LogIn, User, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  // Don't show navbar on login page
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" />, auth: false },
    { name: 'Alumni', path: '/alumni', icon: <Users className="h-5 w-5" />, auth: true },
    { name: 'Feed', path: '/feed', icon: <Newspaper className="h-5 w-5" />, auth: true },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase className="h-5 w-5" />, auth: true },
    { name: 'Events', path: '/events', icon: <Calendar className="h-5 w-5" />, auth: true },
    { name: 'Mentorship', path: '/mentorship', icon: <MessageCircle className="h-5 w-5" />, auth: true },
  ];
  
  // Filter items based on authentication
  const displayItems = navItems.filter(item => !item.auth || isAuthenticated);

  // If we're on the login or register page, just show the logo
  if (isLoginPage) {
    return (
      <nav className="bg-white/95 backdrop-blur-sm border-b z-10">
        <div className="fx-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-fx-purple">FX</span>
                <span className="ml-1 text-xl font-semibold">Alma Connect</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b z-10">
      <div className="fx-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-fx-purple">FX</span>
              <span className="ml-1 text-xl font-semibold">Alma Connect</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              {displayItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary hover:text-fx-purple transition-colors"
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </div>
          )}

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" className="flex items-center" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm" className="flex items-center bg-fx-purple hover:bg-fx-purple/90">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-fx-purple hover:bg-secondary focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="md:hidden bg-white border-b animate-fade-in">
          <div className="fx-container py-3">
            <div className="flex flex-col space-y-2">
              {displayItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-secondary hover:text-fx-purple transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
              <div className="pt-2 border-t">
                {isAuthenticated ? (
                  <>
                    {user?.role === 'admin' && (
                      <Link 
                        to="/admin"
                        className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-secondary hover:text-fx-purple transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span className="ml-3">Admin</span>
                      </Link>
                    )}
                    <button 
                      className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-secondary hover:text-fx-purple transition-colors w-full text-left"
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="ml-3">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login"
                    className="flex items-center px-3 py-2 text-base font-medium rounded-md bg-fx-purple text-white hover:bg-fx-purple/90 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="ml-3">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
