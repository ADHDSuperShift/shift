import React from 'react'

const Services: React.FC = () => {
  const services = [
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
      title: 'Cloud Backends',
      description: 'Scalable serverless solutions and cloud infrastructure using AWS Amplify and modern DevOps.',
      technologies: ['AWS Amplify', 'Serverless', 'DynamoDB', 'GraphQL']
    },
    {
      icon: '🎨',
      title: 'Design & Branding',
      description: 'Complete brand identity and UI/UX design that creates memorable digital experiences.',
      technologies: ['Figma', 'Adobe Creative', 'Branding', 'UI/UX']
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-950 border-t border-green-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-green-400 glow-green">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We provide comprehensive digital solutions to transform your business ideas into reality
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 rounded-xl p-8 shadow-lg hover:shadow-glow-green transition-all duration-300 transform hover:-translate-y-2 border border-green-500/20"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full font-medium border border-green-500/30"
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
  )
}

export default Services
