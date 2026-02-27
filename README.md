# GateFlux - Coming Soon Landing Page

A modern, premium "Coming Soon" landing page for GateFlux, the smart gated community management platform.

## Features

- **Premium Design**: Clean, modern SaaS aesthetic with glassmorphism effects
- **Animated Background**: Subtle gradient animations and floating blur elements
- **Email Capture**: Form with validation, loading states, and duplicate prevention
- **Countdown Timer**: Visual countdown to launch date
- **Fully Responsive**: Mobile-first design
- **Accessible**: WCAG compliant with proper ARIA labels
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML

## Tech Stack

- React.js 18
- Vite 5
- Tailwind CSS 3.4
- Framer Motion 11

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment on Hostinger

1. Run `npm run build` to create production files
2. Upload the contents of `dist` folder to your Hostinger public_html
3. Ensure `.htaccess` redirects all routes to `index.html` (for SPA):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Connecting to Backend

The email capture form is structured for easy backend integration. In `EmailCapture.jsx`, replace the simulated API call:

```javascript
// Replace this:
console.log('📧 Email submitted:', email)
await new Promise((resolve) => setTimeout(resolve, 1500))

// With your API:
await fetch('https://api.gateflux.co/api/v1/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
})
```

## Project Structure

```
coming-soon/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Countdown.jsx
│   │   ├── EmailCapture.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   └── SocialProof.jsx
│   ├── pages/
│   │   └── ComingSoon.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Brand Colors

- **Primary**: Deep Blue `#0f3d9f`
- **Accent**: Indigo `#4f46e5`
- **Background**: Soft light gradient

## License

© 2026 GateFlux. All rights reserved.
