
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-fx-dark text-white pt-12 pb-6">
      <div className="fx-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-fx-purple">FX</span>
              <span className="ml-1 text-xl font-semibold">Alma Connect</span>
            </Link>
            <p className="mt-3 text-sm text-gray-300">
              Connecting Francis Xavier Engineering College alumni and students for networking, mentorship, and career opportunities.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/alumni" className="text-sm text-gray-300 hover:text-white transition-colors">Alumni Directory</Link></li>
              <li><Link to="/feed" className="text-sm text-gray-300 hover:text-white transition-colors">News Feed</Link></li>
              <li><Link to="/jobs" className="text-sm text-gray-300 hover:text-white transition-colors">Jobs & Internships</Link></li>
              <li><Link to="/events" className="text-sm text-gray-300 hover:text-white transition-colors">Events</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-fx-purple" />
                <span className="text-sm text-gray-300">Francis Xavier Engineering College, Tirunelveli, Tamil Nadu</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-fx-purple" />
                <span className="text-sm text-gray-300">+91 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-fx-purple" />
                <span className="text-sm text-gray-300">alumni@fxec.edu</span>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} FX Alma Connect. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
