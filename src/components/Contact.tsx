"use client";
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useSiteContent } from '../hooks/useSiteContent';

const Contact: React.FC = () => {
  const { content, loading } = useSiteContent('contact', {
    title: "Let's Build Something Amazing",
    description: "Ready to transform your digital presence? Get in touch and let's discuss your project.",
    email: 'hello@supershiftlabs.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Try Supabase first if configured, otherwise log locally
      if (isSupabaseConfigured) {
        // Save to Supabase
        const { error: supabaseError } = await supabase
          .from('contacts')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              message: `Company: ${formData.company}\n\n${formData.message}`
            }
          ]);

        if (supabaseError) {
          throw supabaseError;
        }
        console.log('Form submitted to database successfully');
      } else {
        // Frontend-only mode - just log the submission
        const formSubmission = {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          timestamp: new Date().toISOString()
        };

        console.log('Contact form submitted (frontend-only mode):', formSubmission);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to submit form. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
          <p className="mt-2 text-gray-300">Loading...</p>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-green-900 border border-green-700 rounded-2xl p-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-3xl font-bold text-green-300 mb-4">Message Sent!</h3>
            <p className="text-green-400 text-lg">
              Thanks for reaching out! We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            {error && (
              <div className="mb-6 bg-red-900 border border-red-700 rounded-lg p-4">
                <p className="text-red-300">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your project, goals, and timeline..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-green-500/25"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-900 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-gray-300">{content.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-900 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📱</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <p className="text-gray-300">{content.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-900 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📍</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-gray-300">{content.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {content.socialLinks?.map((social: any, index: number) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 hover:bg-green-900 rounded-lg flex items-center justify-center transition-colors"
                    title={social.name}
                  >
                    <span className="text-sm font-medium text-gray-300">{social.name[0]}</span>
                  </a>
                )) || ['LinkedIn', 'Twitter', 'GitHub', 'Dribbble'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 hover:bg-green-900 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-300">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;