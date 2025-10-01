"use client";
import React, { useState, useEffect } from 'react';
import { useTestimonials } from '../hooks/useSiteContent';

const ClientsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { testimonials, loading } = useTestimonials();
  
  // Fallback data in case database is not available
  const fallbackClients = [
    {
      client_image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958839362_88f2f015.webp',
      client_company: 'TechCorp Solutions',
      testimonial: 'SuperShift Labs transformed our digital presence with an incredible web platform.',
      client_name: 'Sarah Johnson',
      client_role: 'CEO'
    },
    {
      client_image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958841219_639411ea.webp',
      client_company: 'InnovateTech',
      testimonial: 'Their mobile app development exceeded our expectations in every way.',
      client_name: 'Michael Chen',
      client_role: 'CTO'
    },
    {
      client_image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958843237_e35a677e.webp',
      client_company: 'CloudFirst Inc',
      testimonial: 'Exceptional cloud architecture and seamless AWS integration.',
      client_name: 'Emily Rodriguez',
      client_role: 'VP Engineering'
    },
    {
      client_image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958844917_bc5807c2.webp',
      client_company: 'StartupLab',
      testimonial: 'From concept to launch, they delivered a world-class product.',
      client_name: 'David Kim',
      client_role: 'Founder'
    },
    {
      client_image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958846898_49d5b508.webp',
      client_company: 'DigitalFlow',
      testimonial: 'Outstanding design and development work that drove real business results.',
      client_name: 'Lisa Wang',
      client_role: 'Marketing Director'
    }
  ];

  // Use database testimonials or fallback to hardcoded ones
  const clients = testimonials.length > 0 ? testimonials : fallbackClients;

  useEffect(() => {
    if (clients.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % clients.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [clients.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
          <p className="mt-2 text-blue-200">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (clients.length === 0) {
    return null;
  }

  const currentClient = clients[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            We've partnered with amazing companies to deliver exceptional digital solutions
          </p>
        </div>
        
        <div className="relative">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src={currentClient.client_image || '/placeholder.svg'}
                  alt={currentClient.client_company}
                  className="w-24 h-24 object-contain rounded-lg"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-xl md:text-2xl text-gray-800 font-medium mb-4 leading-relaxed">
                  "{currentClient.testimonial}"
                </blockquote>
                <div className="text-gray-600">
                  <p className="font-semibold">
                    {currentClient.client_name}
                    {currentClient.client_role && `, ${currentClient.client_role}`}
                  </p>
                  <p className="text-sm">{currentClient.client_company}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-green-400 w-8 shadow-glow' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-16 opacity-60">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => goToSlide(index)}
            >
              <img 
                src={client.logo}
                alt={client.name}
                className="w-16 h-16 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsCarousel;