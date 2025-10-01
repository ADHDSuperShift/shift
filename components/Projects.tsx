'use client'

import React, { useState } from 'react'

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all')
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'Full-stack e-commerce solution with React and AWS',
      image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958821241_6aeaa8b3.webp',
      technologies: ['React', 'Node.js', 'AWS'],
      demo: 'https://demo.com'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'mobile',
      description: 'Cross-platform productivity app with real-time sync',
      image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958830143_f7e169e6.webp',
      technologies: ['React Native', 'Firebase'],
      demo: 'https://demo.com'
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      category: 'web',
      description: 'Real-time data visualization and reporting platform',
      image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958823277_b3bae0ed.webp',
      technologies: ['Next.js', 'D3.js', 'PostgreSQL'],
      demo: 'https://demo.com'
    },
    {
      id: 4,
      title: 'Fitness Tracker',
      category: 'mobile',
      description: 'Health and fitness tracking with wearable integration',
      image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958831831_36622e71.webp',
      technologies: ['Flutter', 'HealthKit'],
      demo: 'https://demo.com'
    }
  ]

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="py-20 bg-gray-900 border-t border-green-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-green-400 glow-green">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Explore our portfolio of successful digital solutions and innovative applications
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            {['all', 'web', 'mobile'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-green-500 text-black shadow-glow-green'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-green-500/30'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-glow-green transition-all duration-300 transform hover:-translate-y-2 border border-green-500/20"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors font-semibold"
                  >
                    View Demo
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full font-medium border border-green-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
