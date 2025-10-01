# 🚀 Supabase & Vercel Setup Instructions

## **Step 1: Create Supabase Proje3. Click "Run" to execute the migration
4. You should see "Success. No rows returned" - this is normal

## **Step 3: Setup Storage Bucket**

### 3.1 Create Storage Bucket
1. In your Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. **Name**: `shift-admin`
4. **Public bucket**: ✅ **Check this box** (allows public file access)
5. Click "Create bucket"

### 6.2 Push to GitHub
1. Click on your `shift-admin` bucket
2. Go to **Policies** tab
3. Click "New Policy" and add these policies:

**Policy 1: Allow public uploads**
```sql
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'shift-admin');
```

**Policy 2: Allow public downloads**
```sql
CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT USING (bucket_id = 'shift-admin');
```

**Policy 3: Allow public updates**
```sql
CREATE POLICY "Allow public updates" ON storage.objects
FOR UPDATE USING (bucket_id = 'shift-admin');
```

**Policy 4: Allow public deletes**
```sql
CREATE POLICY "Allow public deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'shift-admin');
```

### 3.3 Configure MIME Types (Optional)
In the bucket settings, you can restrict file types:
- **Allowed MIME types**: `image/*,application/pdf` (for images and PDFs)
- **File size limit**: `50MB` (adjust as needed)

## **Step 4: Configure Environment Variables****

### 1.1 Sign up for Supabase
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" and sign up with GitHub (recommended)
3. Verify your email if prompted

### 1.2 Create a New Project
1. Click "New Project" in your dashboard
2. **Organization**: Select your organization (or create one)
3. **Name**: `supershift-labs` (or your preferred name)
4. **Database Password**: Create a strong password and **SAVE IT SECURELY**
5. **Region**: Choose closest to your users (e.g., `US East (N. Virginia)`)
6. Click "Create new project"

⏱️ *Wait 2-3 minutes for project setup to complete*

### 1.3 Get Your Credentials
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJ`)

## **Step 2: Run Database Migration**

### 2.1 Access SQL Editor
1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"

### 2.2 Copy and Execute Migration
Copy this entire SQL script and paste it into the editor:

\`\`\`sql
-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  demo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create seo_analyses table
CREATE TABLE IF NOT EXISTS seo_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  score INTEGER NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON seo_analyses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON seo_analyses FOR SELECT USING (true);
\`\`\`

3. Click **"Run"** to execute the migration
4. You should see "Success. No rows returned" message

### 2.3 Verify Tables Created
1. Go to **Database** → **Tables** in Supabase
2. You should see 3 tables: `projects`, `contacts`, `seo_analyses`

## **Step 5: Test Your Setup**

### 5.1 Run Development Server

When you have your Supabase credentials, update your `.env.local` file:

\`\`\`env
# Replace these with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

**🔄 After updating:** Restart your development server to load new environment variables.

## **Step 4: Prepare for Vercel Deployment**

### 4.1 Initialize Git Repository ✅ **COMPLETED**
Your code has been pushed to: **https://github.com/ADHDSuperShift/dirk**

The repository is ready for Vercel deployment!

## **Step 6: Deploy to Vercel**

### 6.1 Prepare for Deployment
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### 5.2 Import Your Project
1. Click "New Project" in Vercel dashboard
2. Find your `dirk` repository (ADHDSuperShift/dirk)
3. Click "Import"

### 6.3 Deploy on Vercel
1. In the deployment setup, expand **"Environment Variables"**
2. Add these variables:
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL` **Value**: Your Supabase Project URL
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` **Value**: Your Supabase anon key
3. Click "Deploy"

⏱️ *Wait 2-3 minutes for deployment to complete*

### 6.4 Configure Environment Variables in Vercel
1. After deployment, you'll get a URL like `https://your-project.vercel.app`
2. Test all functionality:
   - Contact form submission
   - Admin dashboard (go to `/admin`)
   - Project management features

## **Step 6: Optional Domain Setup**

### 6.1 Add Custom Domain (Optional)
1. In Vercel project settings, go to **Domains**
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## **🔧 Troubleshooting**

### If contact form doesn't work:
1. Check browser console for errors
2. Verify environment variables in Vercel
3. Check Supabase table permissions

### If admin dashboard shows errors:
1. Verify database migration ran successfully
2. Check that all 3 tables exist in Supabase
3. Verify RLS policies are applied

### If deployment fails:
1. Check build logs in Vercel
2. Ensure all dependencies are in package.json
3. Verify Next.js configuration

---

## **📋 Quick Checklist**

- [ ] Supabase account created
- [ ] Database migration executed
- [ ] Storage bucket created and configured
- [ ] Environment variables updated locally
- [ ] Local testing successful
- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project deployed to Vercel
- [ ] Environment variables configured in Vercel
- [ ] Live website tested and working
- [ ] File upload functionality tested

**🎉 Once complete, your SuperShift Labs website will be live with full database functionality!**
