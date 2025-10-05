import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from '../components/ui/sonner'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shift-f5a5ynmd1-adhdsupershifts-projects.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SuperShift Labs - Digital Innovation Agency | Web Development, Mobile Apps & Cloud Solutions',
    template: '%s | SuperShift Labs'
  },
  description: 'Transform your digital presence with SuperShift Labs. We specialize in cutting-edge web development, mobile app creation, cloud solutions, and custom software that drives business growth and innovation.',
  keywords: ['web development', 'mobile apps', 'cloud solutions', 'digital agency', 'software development', 'UI/UX design', 'custom software', 'South Africa', 'Centurion'],
  authors: [{ name: 'SuperShift Labs' }],
  creator: 'SuperShift Labs',
  publisher: 'SuperShift Labs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'SuperShift Labs',
    title: 'SuperShift Labs - Digital Innovation Agency',
    description: 'Transform your digital presence with cutting-edge web development, mobile apps, and cloud solutions. Expert software development services in South Africa.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SuperShift Labs - Digital Innovation Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuperShift Labs - Digital Innovation Agency',
    description: 'Transform your digital presence with cutting-edge web development, mobile apps, and cloud solutions.',
    images: ['/og-image.png'],
    creator: '@supershiftlabs',
    site: '@supershiftlabs',
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SuperShift Labs',
  description: 'Digital Innovation Agency specializing in web development, mobile apps, and cloud solutions',
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  image: `${siteUrl}/og-image.png`,
  email: 'admin@supershiftlabs.com',
  telephone: '+27673779676',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Centurion',
    addressCountry: 'ZA',
  },
  sameAs: [
    'https://facebook.com/supershiftlabs',
    'https://instagram.com/supershiftlabs',
    'https://x.com/supershiftlabs',
    'https://linkedin.com/company/supershiftlabs',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+27673779676',
    contactType: 'customer service',
    email: 'admin@supershiftlabs.com',
    availableLanguage: ['English'],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '50',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'ZAR',
    offerCount: '6',
    offers: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development',
          description: 'Custom web applications and responsive websites',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pjhrogdbzpqnxhfxxmsb.supabase.co" />
        <link rel="preconnect" href="https://pjhrogdbzpqnxhfxxmsb.supabase.co" />
        
        {/* JSON-LD Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
