# SuperShift Labs - Next.js Website

A modern cyberpunk-themed digital agency website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎨 Cyberpunk neon green theme with dark mode
- 🔍 SEO Checker tool for clients
- 📊 Admin dashboard for content management
- 💾 Supabase backend integration
- 🚀 Deployed on Vercel
- ⚡ Server-side rendering with Next.js 14

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Deployment**: Vercel
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Vercel account (for deployment)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

### Database Setup

Run the migration in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor to set up the database tables.

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── seo-checker/       # SEO checker page
│   └── admin/             # Admin dashboard
├── components/            # React components
├── lib/                   # Utilities and configs
│   └── supabase.ts       # Supabase client
└── supabase/             # Database migrations
```

## License

MIT
