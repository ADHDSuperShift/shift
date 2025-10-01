import React from 'react'

const About: React.FC = () => {
  const team = [
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
  ]

  return (
    <section id="about" className="py-20 bg-gray-950 border-t border-green-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-green-400 glow-green">SuperShift Labs</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We believe in the power of transformation through technology
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">The SuperShift Philosophy</h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                At SuperShift Labs, we don't just build applications – we create digital transformations 
                that shift businesses into their next phase of growth.
              </p>
              <p>
                Founded in 2020, we've helped dozens of companies navigate the complex digital landscape 
                with custom solutions that scale.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-2xl p-8 shadow-lg border border-green-500/20">
            <h4 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h4>
            <div className="space-y-4">
              {[
                'Expert team with 50+ combined years of experience',
                'Proven track record with 100+ successful projects',
                'Full-stack capabilities from design to deployment',
                'Agile development process with transparent communication',
                'Post-launch support and continuous optimization'
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0 glow-green"></div>
                  <p className="text-gray-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-gray-900/50 rounded-xl p-6 shadow-lg hover:shadow-glow-green transition-all duration-300 text-center border border-green-500/20"
              >
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-green-500/30"
                />
                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                <p className="text-green-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
