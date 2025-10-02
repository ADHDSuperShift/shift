"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Navigation from './Navigation';
import Hero from './Hero';
import Services from './Services';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import AdminDashboard from './AdminDashboard';
import AdminAuth from './AdminAuth';
import SEOChecker from './SEOChecker';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [showAdmin, setShowAdmin] = useState(false);

  // Listen for admin access shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Simple admin toggle (in production, this would be behind authentication)
  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
  };

  if (showAdmin) {
    return (
      <AdminAuth>
        <div>
          <button
            onClick={toggleAdmin}
            className="fixed top-4 right-20 z-50 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Site
          </button>
          <AdminDashboard />
        </div>
      </AdminAuth>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Services />
      <Projects />
      <About />
      <SEOChecker />
      <Contact />
      <Footer />
      
      {/* Admin Access Button - Hidden in production */}
      <button
        onClick={toggleAdmin}
        className="fixed bottom-4 right-4 px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors shadow-lg text-sm font-semibold"
      >
        Admin
      </button>
    </div>
  );
};

export default AppLayout;
