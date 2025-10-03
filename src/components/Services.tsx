import React, { useState } from 'react';
import { useSiteContent, useServices } from '../hooks/useSiteContent';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ServiceDetails {
  icon: string;
  title: string;
  description: string;
  technologies: string[];
  fullDescription: string;
  cta: string;
}

const Services: React.FC = () => {
  const { content, loading: contentLoading } = useSiteContent('services');
  const { services, loading: servicesLoading } = useServices();
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default fallback services data with enhanced details
  const defaultServices: ServiceDetails[] = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Modern websites and web applications built with React, Next.js, and cutting-edge technologies.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      fullDescription: 'Craft sleek, high-performing websites that convert. From simple landing pages to complex platforms, we build with speed, scalability, and SEO in mind.',
      cta: "Let's build your next website today."
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
      fullDescription: "Put your business in your customer's pocket. We design intuitive, cross-platform apps that engage, retain, and deliver real value.",
      cta: 'Turn your idea into a mobile app that users love.'
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Modern backend solutions using Supabase and Firebase for real-time databases and authentication.',
      technologies: ['Supabase', 'Firebase', 'PostgreSQL', 'Real-time APIs'],
      fullDescription: 'Scale without limits. We create secure, reliable cloud backends that grow with you — from authentication to real-time data.',
      cta: 'Future-proof your product with our cloud expertise.'
    },
    {
      icon: '🎨',
      title: 'Design & Branding',
      description: 'Complete brand identity and UI/UX design that creates memorable digital experiences.',
      technologies: ['Figma', 'Adobe Creative', 'Branding', 'UI/UX'],
      fullDescription: 'Your brand deserves to stand out. We craft identities and user experiences that are bold, memorable, and built for the digital world.',
      cta: 'Elevate your brand with powerful design.'
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  const handleServiceClick = (service: ServiceDetails) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleContactClick = () => {
    setIsModalOpen(false);
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
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
                onClick={() => handleServiceClick(service)}
                className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 cursor-pointer hover:border-green-500/50"
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
                <div className="mt-6 text-green-400 text-sm font-semibold flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-5xl">{selectedService?.icon}</span>
              <DialogTitle className="text-3xl font-bold text-white">
                {selectedService?.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-300 text-lg leading-relaxed pt-4">
              {selectedService?.fullDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Technologies & Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {(selectedService?.technologies || []).map((tech: string, index: number) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-green-900 text-green-300 text-sm rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Close
            </Button>
            <Button
              onClick={handleContactClick}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold"
            >
              {selectedService?.cta}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Services;
