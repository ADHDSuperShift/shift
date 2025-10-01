import React from 'react';
import { useSiteContent, useTeamMembers } from '../hooks/useSiteContent';

const About: React.FC = () => {
  const { content, loading: contentLoading } = useSiteContent('about');
  const { teamMembers, loading: teamLoading } = useTeamMembers();

  // Default fallback team data
  const defaultTeam = [
    {
      name: 'Alex Thompson',
      role: 'Founder & Lead Developer',
      image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958855819_734aa605.webp',
      bio: 'Full-stack developer with 10+ years of experience in modern web technologies.'
    },
    {
      name: 'Maya Patel',
      role: 'UI/UX Designer',
      image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958857538_05331ed4.webp',
      bio: 'Creative designer passionate about crafting beautiful and intuitive user experiences.'
    },
    {
      name: 'James Wilson',
      role: 'Cloud Architect',
      image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958859280_df5c9330.webp',
      bio: 'AWS certified architect specializing in scalable serverless solutions.'
    }
  ];

  const loading = contentLoading || teamLoading;

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  const team = teamMembers.length > 0 ? teamMembers : defaultTeam;

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || 'We believe in the power of transformation through technology'}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">The SuperShift Philosophy</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{content.description}</p>
              {content.mission && (
                <p>
                  <strong>Our Mission:</strong> {content.mission}
                </p>
              )}
              {content.story && <p>{content.story}</p>}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h4>
            <div className="space-y-4">
              {(content.values || [
                'Expert team with 50+ combined years of experience',
                'Proven track record with 100+ successful projects',
                'Full-stack capabilities from design to deployment',
                'Agile development process with transparent communication',
                'Post-launch support and continuous optimization'
              ]).map((point: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0 shadow-glow"></div>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member: any, index: number) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <img 
                  src={member.image || '/placeholder.svg'}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-green-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;