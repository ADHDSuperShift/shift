-- Storage Bucket and Policies Setup for SuperShift Labs
-- This file should be executed by a Supabase administrator or through the dashboard

-- =================================================================
-- STORAGE BUCKET SETUP
-- =================================================================

-- Create the storage bucket (if not already created)
-- Note: This might need to be done through the Supabase Dashboard > Storage section
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'shift-admin',
  'shift-admin',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- =================================================================
-- ROW LEVEL SECURITY POLICIES
-- =================================================================

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads to shift-admin" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to shift-admin" ON storage.objects;

-- Policy 1: Allow authenticated users to upload to shift-admin bucket
-- This is more secure than public access
CREATE POLICY "Allow authenticated uploads to shift-admin"
ON storage.objects
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'shift-admin');

-- Policy 2: Allow public viewing of files (for website display)
CREATE POLICY "Allow public access to shift-admin"
ON storage.objects
FOR SELECT
USING (bucket_id = 'shift-admin');

-- Policy 3: Allow authenticated users to update files in shift-admin bucket
CREATE POLICY "Allow authenticated updates to shift-admin"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'shift-admin')
WITH CHECK (bucket_id = 'shift-admin');

-- Policy 4: Allow authenticated users to delete files from shift-admin bucket
CREATE POLICY "Allow authenticated deletes from shift-admin"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'shift-admin');

-- =================================================================
-- VERIFICATION QUERIES
-- =================================================================

-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'shift-admin';

-- Check if policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' AND policyname LIKE '%shift-admin%';

-- =================================================================
-- ALTERNATIVE: AUTHENTICATED USER ONLY POLICIES (More Secure)
-- =================================================================

-- If you prefer to restrict uploads to authenticated users only, 
-- uncomment and use these policies instead:

/*
-- Drop the public policies first
DROP POLICY IF EXISTS "Allow public uploads to shift-admin" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to shift-admin" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates to shift-admin" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from shift-admin" ON storage.objects;

-- Create authenticated-only policies
CREATE POLICY "Allow authenticated uploads to shift-admin"
ON storage.objects
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'shift-admin');

CREATE POLICY "Allow authenticated access to shift-admin"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'shift-admin');

CREATE POLICY "Allow authenticated updates to shift-admin"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'shift-admin')
WITH CHECK (bucket_id = 'shift-admin');

CREATE POLICY "Allow authenticated deletes from shift-admin"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'shift-admin');
*/
