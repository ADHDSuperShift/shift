# SuperShift Labs - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Connect GitHub Repository to Vercel

1. **Sign in to Vercel**: Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. **Import Project**: Click "New Project" → "Import Git Repository"
3. **Select Repository**: Choose `ADHDSuperShift/shift` from your repositories
4. **Framework Detection**: Vercel will automatically detect Next.js

### 2. Configure Environment Variables

**CRITICAL**: Add these environment variables in Vercel project settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://pjhrogdbzpqnxhfxxmsb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqaHJvZ2RienBxbnhoZnh4bXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyOTUxODMsImV4cCI6MjA3NDg3MTE4M30.-ayJ2mZBUtc6-FWibASPkVj_51Vse1s86elTj_7s-cM
```

### 3. Deploy Settings

Vercel will automatically use these settings from `vercel.json`:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Deploy & Test

1. **Click Deploy**: Vercel will build and deploy automatically
2. **Get URL**: You'll receive a URL like `https://shift-xxx.vercel.app`
3. **Test Features**:
   - ✅ Main website functionality
   - ✅ Admin panel: `/admin`
   - ✅ File uploads in admin
   - ✅ Content editing capabilities

## 📋 What's Deployed

### Complete CMS Features
- **6-Tab Admin Dashboard**:
  - Projects management
  - Services management  
  - Team members
  - Testimonials
  - Site content editor
  - Contact form submissions

### Database Integration
- **7 Supabase Tables**: projects, services, team_members, testimonials, site_content, contacts, seo_analyses
- **File Storage**: Image uploads with `shift-admin` bucket
- **Security**: Row Level Security (RLS) policies configured

### Editable Sections
- **Hero**: Title, subtitle, description, CTA button
- **About**: Mission, story, values, team info
- **Services**: Complete service management
- **Projects**: Portfolio management
- **Contact**: Contact info and social links

## 🔧 Post-Deployment Checklist

1. **Test Admin Access**: Visit `https://your-domain.vercel.app/admin`
2. **Test File Uploads**: Upload images in admin dashboard
3. **Test Content Editing**: Modify hero section text
4. **Test Database**: Add new project or service
5. **Test Contact Form**: Submit contact form on main site

## 🌐 Custom Domain (Optional)

After successful deployment:
1. Go to Vercel project settings
2. Navigate to "Domains" section
3. Add your custom domain
4. Update DNS records as instructed

## 🔒 Security Features

- Security headers configured in `vercel.json`
- Supabase RLS policies protect database
- Environment variables securely stored
- HTTPS automatically enabled

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Ensure Supabase credentials are correct
4. Test local build: `npm run build`

---

**Repository**: https://github.com/ADHDSuperShift/shift
**Tech Stack**: Next.js 14 + Supabase + Vercel
**CMS Ready**: Full content management system included
