import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import siteConfig from '../src/lib/siteConfig'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const viewport = {
  themeColor: '#1c153e',
}

export const metadata = {
  metadataBase: new URL(siteConfig.websiteBaseUrl),
  applicationName: 'GateFlux',
  authors: [{ name: 'GateFlux' }],
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png?v=2" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png?v=2" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png?v=2" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png?v=2" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png?v=2" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png?v=2" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png?v=2" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png?v=2" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png?v=2" />
        <link rel="manifest" href="/favicon/manifest.json?v=2" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#1c153e" />
        <Script id="strip-heading-tag-attrs" strategy="beforeInteractive">
          {`
            (function () {
              function stripAttrs(root) {
                if (!root || !root.querySelectorAll) return;
                var nodes = root.querySelectorAll('[data-heading-tag]');
                for (var index = 0; index < nodes.length; index += 1) {
                  nodes[index].removeAttribute('data-heading-tag');
                }
              }

              function startObserver() {
                if (!document || !document.documentElement || !window.MutationObserver) return;

                stripAttrs(document);

                var observer = new MutationObserver(function (mutations) {
                  for (var index = 0; index < mutations.length; index += 1) {
                    var mutation = mutations[index];

                    if (mutation.type === 'attributes' && mutation.target && mutation.target.removeAttribute) {
                      mutation.target.removeAttribute('data-heading-tag');
                    }

                    if (mutation.type === 'childList' && mutation.addedNodes && mutation.addedNodes.length) {
                      for (var childIndex = 0; childIndex < mutation.addedNodes.length; childIndex += 1) {
                        var node = mutation.addedNodes[childIndex];
                        if (!node || node.nodeType !== 1) continue;
                        if (node.hasAttribute && node.hasAttribute('data-heading-tag')) {
                          node.removeAttribute('data-heading-tag');
                        }
                        stripAttrs(node);
                      }
                    }
                  }
                });

                observer.observe(document.documentElement, {
                  subtree: true,
                  childList: true,
                  attributes: true,
                  attributeFilter: ['data-heading-tag'],
                });

                window.addEventListener('load', function () {
                  stripAttrs(document);
                  setTimeout(function () {
                    observer.disconnect();
                  }, 4000);
                }, { once: true });
              }

              startObserver();
            })();
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen bg-neutral-50 text-neutral-900 antialiased`} suppressHydrationWarning>
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
