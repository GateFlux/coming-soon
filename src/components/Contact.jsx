/**
 * EnterpriseContact Component
 * 
 * Enterprise contact section with direct email link.
 */
export default function EnterpriseContact() {
  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8"
      aria-label="Enterprise contact"
    >
      <div className="max-w-md mx-auto text-center">
        <p className="text-gray-600 mb-3">
          For enterprise inquiries
        </p>
        <a
          href="mailto:contact@gateflux.co?subject=Enterprise%20Inquiry%20-%20GateFlux"
          className="inline-flex items-center gap-2 text-lg font-semibold text-primary-700 hover:text-accent-500 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          contact@gateflux.co
        </a>
      </div>
    </section>
  )
}
