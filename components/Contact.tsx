'use client'

import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await supabase.from('contacts').insert(formData)
    } catch (err) {
      console.error('Error saving contact:', err)
    }
    
    setSubmitted(true)
    setIsSubmitting(false)
    
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-gray-950 border-t border-green-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gray-900/50 border border-green-500/30 rounded-2xl p-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-3xl font-bold text-green-400 mb-4 glow-green">Message Sent!</h3>
            <p className="text-gray-300 text-lg">
              Thanks for reaching out! We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 bg-gray-950 border-t border-green-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Build Something <span className="text-green-400 glow-green">Amazing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to transform your digital presence? Get in touch and let's discuss your project.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-gray-800 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-white"
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
                  className="w-full px-4 py-3 bg-gray-800 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-white"
                  placeholder="your@email.com"
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
                  className="w-full px-4 py-3 bg-gray-800 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none text-white"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-700 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-glow-green"
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
                  <div className="w-10 h-10 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-gray-400">hello@supershiftlabs.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
