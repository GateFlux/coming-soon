'use client'

import { useRef } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import EarlyAccessForm from '../components/EarlyAccessForm'
import EnterpriseContact from '../components/Contact'
import Footer from '../components/Footer'

/**
 * ComingSoon Page
 * 
 * Premium landing page with early access form,
 * animated gradient background, and luxury design.
 */
export default function ComingSoon() {
  const formRef = useRef(null)

  /**
   * Scroll to early access form
   */
  const handleRequestAccess = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="min-h-screen animated-gradient-bg flex flex-col relative">
      {/* Skip to main content - accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-700 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Header with Logo */}
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero onRequestAccess={handleRequestAccess} />

        {/* Early Access Form */}
        <EarlyAccessForm formRef={formRef} />

        {/* Enterprise Contact */}
        <EnterpriseContact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
