import ComingSoon from '../src/views/ComingSoon'
import siteConfig from '../src/lib/siteConfig'

const title = 'GateFlux | Society Management Platform'
const description = 'GateFlux helps apartment association admins reduce missed payments, track approvals, and keep society operations under control.'
const socialImage = `${siteConfig.websiteBaseUrl}/logo-dark.svg`

export const metadata = {
  title,
  description,
  alternates: {
    canonical: siteConfig.comingSoonUrl,
  },
  openGraph: {
    type: 'website',
    url: siteConfig.comingSoonUrl,
    title,
    description,
    siteName: 'GateFlux',
    images: [
      {
        url: socialImage,
        alt: 'GateFlux logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [socialImage],
  },
}

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GateFlux',
    url: siteConfig.websiteBaseUrl,
    logo: `${siteConfig.websiteBaseUrl}/logo-dark.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.supportEmail,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GateFlux',
    url: siteConfig.websiteBaseUrl,
    description,
  },
]

export default function Home() {
  return (
    <>
      <ComingSoon />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
