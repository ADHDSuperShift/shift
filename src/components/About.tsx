import React from 'react';
import { useSiteContent } from '../hooks/useSiteContent';

const About: React.FC = () => {
  const { content } = useSiteContent('about');


  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {content.subtitle || 'We believe in the power of transformation through technology'}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">The Super<span className="text-green-400">Shift</span> Philosophy</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>{content.description}</p>
              {content.mission && (
                <p>
                  <strong className="text-white">Our Mission:</strong> {content.mission}
                </p>
              )}
              {content.story && <p>{content.story}</p>}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700">
            <h4 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h4>
            <div className="space-y-4">
              {(content.values || [
                'Skilled & Passionate Team – We bring diverse expertise and fresh thinking to every project.',
                'Proven Results – Successful projects delivered across different industries.',
                'Full-Stack Approach – From design to deployment, we handle the entire build.',
                'Agile & Collaborative – Flexible process with clear communication at every stage.',
                'Ongoing Partnership – Continuous support and optimization beyond launch.'
              ]).map((point: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0 shadow-glow"></div>
                  <p className="text-gray-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;