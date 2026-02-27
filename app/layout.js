import './globals.css'
import Script from 'next/script'

export const viewport = {
  themeColor: '#1c153e',
}

export const metadata = {
  metadataBase: new URL('https://gateflux.co'),
  title: 'GateFlux | Enterprise Gated Community Management Platform',
  description: 'GateFlux is an intelligent access and visitor management platform built for modern gated communities and enterprise residential environments.',
  keywords: 'gated community, visitor management, access control, society management, residential community, enterprise security, gate management',
  authors: [{ name: 'GateFlux' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://gateflux.co/',
    title: 'GateFlux | Enterprise Gated Community Management Platform',
    description: 'GateFlux is an intelligent access and visitor management platform built for modern gated communities and enterprise residential environments.',
    images: [{ url: '/og-image.png' }],
    siteName: 'GateFlux',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://gateflux.co/',
    title: 'GateFlux | Enterprise Gated Community Management Platform',
    description: 'GateFlux is an intelligent access and visitor management platform built for modern gated communities and enterprise residential environments.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#1c153e" />
        <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
        <link rel="canonical" href="https://gateflux.co/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8QPSRLQD06"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8QPSRLQD06');
          `}
        </Script>
      </body>
    </html>
  )
}
