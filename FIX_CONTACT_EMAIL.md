# 🔧 Fix "Get In Touch" Email Address

## Problem
The "Get In Touch" section still shows the old email address (`dirkawspy@gmail.com`) instead of the new one (`admin@supershiftlabs.com`).

## Why This Happens
Your Supabase database has stored contact information that overrides the default fallback values in the code. The database content takes priority over the hardcoded values.

## Solution: Update Database Content

### Option 1: Update via Supabase SQL Editor (Recommended)

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select your project: `pjhrogdbzpqnxhfxxmsb`

2. **Open SQL Editor:**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run This SQL:**
   ```sql
   -- Update email address
   UPDATE site_content 
   SET content = jsonb_set(
     content,
     '{email}',
     '"admin@supershiftlabs.com"'
   )
   WHERE section = 'contact';
   
   -- Update phone number
   UPDATE site_content 
   SET content = jsonb_set(
     content,
     '{phone}',
     '"+27673779676"'
   )
   WHERE section = 'contact';
   
   -- Add WhatsApp field
   UPDATE site_content 
   SET content = jsonb_set(
     content,
     '{whatsapp}',
     '"+27673779676"',
     true
   )
   WHERE section = 'contact';
   ```

4. **Click "Run"** to execute the update

5. **Refresh your website** - The email should now show correctly!

### Option 2: Delete Database Record (Use Fallback)

If you want the site to use the hardcoded fallback values instead of database values:

```sql
-- Delete the contact section from database
DELETE FROM site_content WHERE section = 'contact';
```

This will make the app use the fallback values defined in the code:
- Email: admin@supershiftlabs.com
- Phone: +27673779676
- WhatsApp: +27673779676

### Option 3: Update via Admin Dashboard

1. Go to your site: `/admin`
2. Click the "Content" tab
3. Find "Contact" section
4. Update the email field to: `admin@supershiftlabs.com`
5. Update the phone field to: `+27673779676`
6. Click "Save Changes"

## Verification

After running the SQL update, verify on your live site:

1. Visit: https://shift-akirnfmjc-adhdsupershifts-projects.vercel.app
2. Scroll to "Contact" section
3. Check "Get In Touch" sidebar
4. Email should show: **admin@supershiftlabs.com**
5. Phone should show: **+27673779676**

## What Gets Updated

✅ Email in "Get In Touch" section  
✅ Phone in "Get In Touch" section  
✅ WhatsApp button linking  
✅ Contact form submission (if configured)

## Files Reference

- Migration SQL: `supabase/migrations/004_update_contact_email.sql`
- Contact Component: `src/components/Contact.tsx` (line 40)
- Footer Component: `src/components/Footer.tsx` (already updated)

---

**Quick Fix:** Run the SQL update in Supabase, then refresh your site! 🚀
