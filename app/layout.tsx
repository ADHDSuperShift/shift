import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from '../components/ui/sonner'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://shift-labs.vercel.app'),
  title: {
    default: 'SuperShift Labs | Web & Mobile Development',
    template: '%s | SuperShift Labs'
  },
  description: 'Expert web & mobile app development in Cape Town. We build high-performance websites, mobile apps, and cloud solutions that drive results.',
  keywords: [
    'web development Cape Town',
    'mobile app development South Africa', 
    'custom software development',
    'e-commerce development',
    'cloud solutions',
    'digital transformation',
    'React development',
    'Next.js development',
    'API development',
    'UI/UX design',
    'software consulting',
    'Cape Town tech agency',
    'South Africa web agency',
    'business automation',
    'enterprise software'
  ],
  authors: [{ name: 'SuperShift Labs' }],
  creator: 'SuperShift Labs',
  publisher: 'SuperShift Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://shift-labs.vercel.app',
    siteName: 'SuperShift Labs',
    title: 'SuperShift Labs | Web & Mobile Development',
    description: 'Expert web & mobile app development in Cape Town. We build high-performance websites, mobile apps, and cloud solutions that drive results.',
    images: [
      {
        url: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958817530_82b6efd2.webp',
        width: 1200,
        height: 630,
        alt: 'SuperShift Labs - Web Development & Digital Solutions in Cape Town',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuperShift Labs | Web & Mobile Development',
    description: 'Expert web & mobile app development in Cape Town. High-performance websites, apps, and cloud solutions that drive results.',
    images: ['https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958817530_82b6efd2.webp'],
  },
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://shift-labs.vercel.app',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SuperShift Labs',
  url: 'https://shift-labs.vercel.app',
  logo: 'https://shift-labs.vercel.app/favicon.svg',
  description: 'Expert web development, mobile app development, and cloud solutions in Cape Town, South Africa.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cape Town',
    addressRegion: 'Western Cape',
    addressCountry: 'ZA'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+27-82-XXX-XXXX',
    contactType: 'customer service',
    email: 'hello@supershiftlabs.com',
    availableLanguage: ['English']
  },
  sameAs: [
    'https://twitter.com/supershiftlabs',
    'https://linkedin.com/company/supershiftlabs',
    'https://github.com/supershiftlabs'
  ]
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SuperShift Labs',
  image: 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958817530_82b6efd2.webp',
  '@id': 'https://shift-labs.vercel.app',
  url: 'https://shift-labs.vercel.app',
  telephone: '+27-82-XXX-XXXX',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Cape Town',
    addressLocality: 'Cape Town',
    addressRegion: 'Western Cape',
    postalCode: '8000',
    addressCountry: 'ZA'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -33.9249,
    longitude: 18.4241
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00'
  },
  sameAs: [
    'https://twitter.com/supershiftlabs',
    'https://linkedin.com/company/supershiftlabs',
    'https://github.com/supershiftlabs'
  ]
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
        <link rel="dns-prefetch" href="https://d64gsuwffb70l.cloudfront.net" />
        <link rel="preconnect" href="https://d64gsuwffb70l.cloudfront.net" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
