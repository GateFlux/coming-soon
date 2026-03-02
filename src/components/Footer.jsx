import Image from 'next/image'

/**
 * Footer Component
 *
 * Minimal premium footer with logo and copyright.
 */
export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/logo-dark.svg"
            alt="GateFlux"
            width={80}
            height={24}
            className="h-6 w-auto"
          />
          <span className="text-gray-500 text-sm">
            © 2026
          </span>
        </div>
      </div>
    </footer>
  )
}
