const websiteBaseUrl = (process.env.NEXT_PUBLIC_WEBSITE_BASE_URL || 'https://gateflux.co').replace(/\/$/, '')

const siteConfig = {
  websiteBaseUrl,
  comingSoonUrl: `${websiteBaseUrl}/coming-soon/`,
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'hello@gateflux.co',
}

export default siteConfig