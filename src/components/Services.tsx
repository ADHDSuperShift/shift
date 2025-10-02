import React from 'react';
import { useSiteContent, useServices } from '../hooks/useSiteContent';

const Services: React.FC = () => {
  const { content, loading: contentLoading } = useSiteContent('services');
  const { services, loading: servicesLoading } = useServices();

  // Default fallback services data
  const defaultServices = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Modern websites and web applications built with React, Next.js, and cutting-edge technologies.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Modern backend solutions using Supabase and Firebase for real-time databases and authentication.',
      technologies: ['Supabase', 'Firebase', 'PostgreSQL', 'Real-time APIs']
    },
    {
      icon: '🎨',
      title: 'Design & Branding',
      description: 'Complete brand identity and UI/UX design that creates memorable digital experiences.',
      technologies: ['Figma', 'Adobe Creative', 'Branding', 'UI/UX']
    }
  ];


  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title || 'Our Services'}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {content.description || 'We provide comprehensive digital solutions to transform your business ideas into reality'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayServices.map((service: any, index: number) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {(service.technologies || []).map((tech: string, techIndex: number) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-green-900 text-green-300 text-sm rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;