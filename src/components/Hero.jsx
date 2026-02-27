'use client'

/**
 * Hero Component
 *
 * Premium hero section with animated blur elements,
 * gradient text, and dual CTAs.
 */
export default function Hero({ onRequestAccess }) {
  const handleEnterpriseContact = () => {
    window.location.href = 'mailto:contact@gateflux.co?subject=Enterprise%20Inquiry%20-%20GateFlux'
  }

  return (
    <section 
      className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated background blur elements */}
      <div className="blur-element blur-element-1" aria-hidden="true" />
      <div className="blur-element blur-element-2" aria-hidden="true" />
      <div className="blur-element blur-element-3" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-full border border-primary-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
            </span>
            Launching Soon
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-4 text-balance">
          The Future of{' '}
          <span className="gradient-text">Gated Community</span>{' '}
          Management
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl font-medium text-primary-700 mb-6">
          Intelligent Access. Elevated Living.
        </p>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 text-balance">
          Enterprise-grade visitor and society management platform for modern gated communities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRequestAccess}
            className="btn-primary w-full sm:w-auto"
            aria-label="Request early access"
          >
            Request Early Access
          </button>
          <button
            onClick={handleEnterpriseContact}
            className="btn-secondary w-full sm:w-auto"
            aria-label="Contact enterprise team"
          >
            Contact Enterprise Team
          </button>
        </div>
      </div>
    </section>
  )
}
