# SuperShift Labs - Supabase & Vercel Setup Guide

## 🚀 Your Next.js app is now running with Supabase integration!

**Current Status:**
- ✅ Next.js development server running on http://localhost:3005
- ✅ Contact form connected to Supabase database
- ✅ Admin dashboard with project management
- ✅ All navigation buttons functional
- ⏳ Supabase configuration needed
- ⏳ Vercel deployment setup needed

## 📋 Next Steps

### 1. Set up Supabase Project

1. **Create a Supabase account**: Go to [supabase.com](https://supabase.com) and sign up
2. **Create a new project**: 
   - Click "New Project"
   - Choose organization and project name
   - Set a database password (save this!)
   - Select a region close to your users

3. **Get your project credentials**:
   - Go to Settings → API
   - Copy your Project URL and anon public key

4. **Run the database migration**:
   - Go to SQL Editor in Supabase dashboard
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run the SQL to create your tables

### 2. Configure Environment Variables

Update your `.env.local` file with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

**Current Status**: The app is using demo/placeholder values and will show a warning message until you configure your actual Supabase credentials.

### 3. Test the Integration

1. **Test Contact Form**:
   - Fill out the contact form on your website
   - Check the `contacts` table in Supabase to see the submission

2. **Test Admin Dashboard**:
   - Go to `/admin` 
   - Add a new project
   - Check the `projects` table in Supabase

### 4. Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Supabase integration"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Configure Domain** (optional):
   - Add your custom domain in Vercel settings
   - Update DNS records as instructed

## 🔧 Troubleshooting

### If contact form shows errors:
1. Check browser console for errors
2. Verify Supabase credentials in `.env.local`
3. Ensure Supabase project is active

### If admin dashboard shows "Failed to load projects":
1. Check that the database migration ran successfully
2. Verify table permissions in Supabase (RLS policies)
3. Check network tab in browser devtools

### If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify Next.js configuration is correct

## 📁 Project Structure

```
app/                    # Next.js app directory
├── page.tsx           # Homepage with all sections
├── admin/page.tsx     # Admin dashboard page
└── globals.css        # Global styles

src/components/        # React components
├── Contact.tsx        # Contact form with Supabase
├── AdminDashboard.tsx # Project management dashboard
├── Navigation.tsx     # Site navigation
└── ...               # Other UI components

supabase/             # Database configuration
└── migrations/       # Database schema
```

## 🎯 Features Implemented

- **Contact Form**: Saves submissions to Supabase `contacts` table
- **Admin Dashboard**: Manage projects with full CRUD operations
- **Navigation**: Smooth scrolling between sections
- **Responsive Design**: Works on desktop and mobile
- **Dark/Light Theme**: Theme switching capability
- **SEO Checker**: Built-in SEO analysis tool

## 🔐 Security Notes

- Environment variables are properly configured
- Database has Row Level Security (RLS) enabled
- API keys are scoped to public operations only
- Form validation prevents empty submissions

---

**Need help?** The setup is designed to be straightforward, but if you encounter issues, check the troubleshooting section above or review the Supabase and Vercel documentation.
