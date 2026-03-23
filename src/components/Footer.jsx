import siteConfig from '../lib/siteConfig'

const links = [
  { label: 'Privacy', href: `${siteConfig.websiteBaseUrl}/privacy` },
  { label: 'Terms', href: `${siteConfig.websiteBaseUrl}/terms` },
  { label: 'Contact', href: `${siteConfig.websiteBaseUrl}/contact` },
]

export default function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm text-neutral-700">
            Built for apartment associations managing real operational load.
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Focused on billing, approvals, and resident coordination.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-primary-700 transition-colors hover:text-primary-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}