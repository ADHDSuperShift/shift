-- Update Contact Section Email Address in Supabase
-- Run this in your Supabase SQL Editor to update the contact information

-- First, let's see what's currently stored
SELECT * FROM site_content WHERE section = 'contact';

-- Update the contact section with new email address
UPDATE site_content 
SET content = jsonb_set(
  content,
  '{email}',
  '"admin@supershiftlabs.com"'
)
WHERE section = 'contact';

-- Update the phone number as well
UPDATE site_content 
SET content = jsonb_set(
  content,
  '{phone}',
  '"+27673779676"'
)
WHERE section = 'contact';

-- Add WhatsApp field if it doesn't exist
UPDATE site_content 
SET content = jsonb_set(
  content,
  '{whatsapp}',
  '"+27673779676"',
  true
)
WHERE section = 'contact';

-- Verify the changes
SELECT section, content->>'email' as email, content->>'phone' as phone, content->>'whatsapp' as whatsapp 
FROM site_content 
WHERE section = 'contact';

-- Alternative: If you want to completely reset the contact section to use fallback values,
-- you can delete the record and let the app use the hardcoded fallback:
-- DELETE FROM site_content WHERE section = 'contact';
