import Image from 'next/image'

/**
 * Header Component
 *
 * Minimal header with logo for branding.
 */
export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="inline-block" aria-label="GateFlux Home">
          <Image
            src="/logo-dark.svg"
            alt="GateFlux"
            width={160}
            height={40}
            className="h-8 sm:h-10 w-auto"
          />
        </a>
      </div>
    </header>
  )
}
