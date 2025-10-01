"use client";
import React, { useState, useEffect } from 'react';

const ClientsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const clients = [
    {
      logo: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958839362_88f2f015.webp',
      name: 'TechCorp Solutions',
      testimonial: 'SuperShift Labs transformed our digital presence with an incredible web platform.',
      author: 'Sarah Johnson, CEO'
    },
    {
      logo: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958841219_639411ea.webp',
      name: 'InnovateTech',
      testimonial: 'Their mobile app development exceeded our expectations in every way.',
      author: 'Michael Chen, CTO'
    },
    {
      logo: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958843237_e35a677e.webp',
      name: 'CloudFirst Inc',
      testimonial: 'Exceptional cloud architecture and seamless AWS integration.',
      author: 'Emily Rodriguez, VP Engineering'
    },
    {
      logo: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958844917_bc5807c2.webp',
      name: 'StartupLab',
      testimonial: 'From concept to launch, they delivered a world-class product.',
      author: 'David Kim, Founder'
    },
    {
      logo: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958846898_49d5b508.webp',
      name: 'DigitalFlow',
      testimonial: 'Outstanding design and development work that drove real business results.',
      author: 'Lisa Wang, Marketing Director'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [clients.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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
                  src={clients[currentIndex].logo}
                  alt={clients[currentIndex].name}
                  className="w-24 h-24 object-contain rounded-lg"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-xl md:text-2xl text-gray-800 font-medium mb-4 leading-relaxed">
                  "{clients[currentIndex].testimonial}"
                </blockquote>
                <div className="text-gray-600">
                  <p className="font-semibold">{clients[currentIndex].author}</p>
                  <p className="text-sm">{clients[currentIndex].name}</p>
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