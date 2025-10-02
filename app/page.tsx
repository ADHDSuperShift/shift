"use client";
import Navigation from '../src/components/Navigation'
import Hero from '../src/components/Hero'
import Services from '../src/components/Services'
import Projects from '../src/components/Projects'
import About from '../src/components/About'
import Contact from '../src/components/Contact'
import Footer from '../src/components/Footer'
import AdminButton from '../src/components/AdminButton'
import SEOChecker from '../src/components/SEOChecker'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <SEOChecker />
        <Contact />
      </main>
      <Footer />
      <AdminButton />
    </div>
  )
}
