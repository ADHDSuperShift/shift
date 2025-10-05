"use client";
import Navigation from '../src/components/Navigation'
import Hero from '../src/components/Hero'
import Services from '../src/components/Services'
import Projects from '../src/components/Projects'
import About from '../src/components/About'
import Contact from '../src/components/Contact'
import Footer from '../src/components/Footer'
import AdminButton from '../src/components/AdminButton'
import WhatsAppButton from '../src/components/WhatsAppButton'
import SEOChecker from '../src/components/SEOChecker'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />
      <main>
        {/* Hidden SEO content for search engines */}
        <h1 className="sr-only">SuperShift Labs - Digital Innovation Agency</h1>
        <Hero />
        <Services />
        <Projects />
        <About />
        <SEOChecker />
        <Contact />
      </main>
      <Footer />
      <AdminButton />
      <WhatsAppButton />
    </div>
  )
}
