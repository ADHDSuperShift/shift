# Storage Upload Error Fix Guide

## Problem
You're getting this error when trying to upload files:
```
StorageApiError: new row violates row-level security policy
```

## Root Cause
The Supabase storage bucket `shift-admin` doesn't have the proper Row Level Security (RLS) policies configured to allow file uploads.

## Solution Options

### Option 1: Manual Fix (Recommended - Immediate)

1. **Go to your Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select your project: `pjhrogdbzpqnxhfxxmsb`

2. **Navigate to Storage:**
   - Click "Storage" in the left sidebar
   - Click on "Policies" tab

3. **Create a new policy for authenticated uploads:**
   - Click "New Policy"
   - Choose "For full customization"
   - Fill in the details:
     ```
     Policy name: Allow authenticated uploads to shift-admin
     Allowed operation: INSERT
     Target roles: authenticated
     USING expression: bucket_id = 'shift-admin'
     WITH CHECK expression: bucket_id = 'shift-admin'
     ```

4. **Create additional policies for full functionality:**
   
   **For reading files (public access for website display):**
   ```
   Policy name: Allow public access to shift-admin
   Allowed operation: SELECT
   Target roles: public
   USING expression: bucket_id = 'shift-admin'
   ```
   
   **For updating files (authenticated only):**
   ```
   Policy name: Allow authenticated updates to shift-admin
   Allowed operation: UPDATE
   Target roles: authenticated
   USING expression: bucket_id = 'shift-admin'
   WITH CHECK expression: bucket_id = 'shift-admin'
   ```
   
   **For deleting files (authenticated only):**
   ```
   Policy name: Allow authenticated deletes from shift-admin
   Allowed operation: DELETE
   Target roles: authenticated
   USING expression: bucket_id = 'shift-admin'
   ```

### Option 2: SQL Migration (For Advanced Users)

If you have admin access to run SQL migrations, use the file:
```
supabase/migrations/002_storage_setup.sql
```

### Option 3: Dashboard Bucket Creation (If bucket doesn't exist)

1. Go to **Storage** in your Supabase dashboard
2. Click **"New bucket"**
3. Name it: `shift-admin`
4. Set it as **Public**
5. Set file size limit to: `10 MB`
6. Allowed file types: `image/jpeg, image/png, image/gif, image/webp`

## Verification

After setting up the policies, you'll need to create an admin account:

1. **Access the admin panel:**
   - On your website, press `Ctrl+Shift+A` to open the admin panel
   - Or navigate to `/admin` directly

2. **Create admin account:**
   - Click "Need an account? Sign up"
   - Use email: `dirkawspy@gmail.com`
   - Create a secure password
   - Check your email for confirmation link

3. **Test file uploads:**
   - Sign in to the admin console
   - Try uploading an image in the projects section
   - The upload should now work without errors

## Security Notes

- The setup now requires **authenticated users** for uploads (more secure)
- Admin user should be: `dirkawspy@gmail.com`
- File uploads are limited to images and 10MB max size
- All uploaded files will be publicly accessible for viewing
- Only authenticated users can upload, update, or delete files

## Troubleshooting

If you still get errors after setting up policies:

1. **Check bucket exists**: Verify `shift-admin` bucket is created
2. **Check policy syntax**: Ensure all policies are properly formatted
3. **Clear cache**: Try refreshing your browser
4. **Check browser console**: Look for specific error messages

## Alternative Approach

If you can't access the dashboard or prefer a different approach, contact your Supabase administrator to run the migration script provided.
