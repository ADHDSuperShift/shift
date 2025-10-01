'use client'

import React, { useState, useEffect } from 'react'

const ClientsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
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
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [clients.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-950 border-t border-green-500/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by <span className="text-green-400 glow-green">Industry Leaders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We've partnered with amazing companies to deliver exceptional digital solutions
          </p>
        </div>
        
        <div className="relative">
          <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 shadow-lg border border-green-500/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src={clients[currentIndex].logo}
                  alt={clients[currentIndex].name}
                  className="w-24 h-24 object-contain rounded-lg"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-xl md:text-2xl text-white font-medium mb-4 leading-relaxed">
                  "{clients[currentIndex].testimonial}"
                </blockquote>
                <div className="text-gray-400">
                  <p className="font-semibold text-green-400">{clients[currentIndex].author}</p>
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
                    ? 'bg-green-400 w-8 glow-green' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientsCarousel
