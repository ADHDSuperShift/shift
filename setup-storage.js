import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  'https://pjhrogdbzpqnxhfxxmsb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqaHJvZ2RienBxbnhoZnh4bXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyOTUxODMsImV4cCI6MjA3NDg3MTE4M30.-ayJ2mZBUtc6-FWibASPkVj_51Vse1s86elTj_7s-cM'
);

async function setupStorage() {
  try {
    console.log('Setting up storage bucket...');
    
    // First, try to create the bucket if it doesn't exist
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }
    
    console.log('Existing buckets:', buckets.map(b => b.name));
    
    const bucketExists = buckets.some(bucket => bucket.name === 'shift-admin');
    
    if (!bucketExists) {
      console.log('Creating shift-admin bucket...');
      const { data, error } = await supabase.storage.createBucket('shift-admin', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 1024 * 1024 * 10 // 10MB limit
      });
      
      if (error) {
        console.error('Error creating bucket:', error);
      } else {
        console.log('✅ Bucket created successfully:', data);
      }
    } else {
      console.log('✅ Bucket already exists');
    }
    
    // Test upload to see current permissions
    console.log('Testing upload permissions...');
    const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('shift-admin')
      .upload(`test-${Date.now()}.txt`, testFile);
    
    if (uploadError) {
      console.error('❌ Upload test failed:', uploadError);
      console.log('\n📋 Manual Steps Required:');
      console.log('1. Go to your Supabase Dashboard');
      console.log('2. Navigate to Storage > Policies');
      console.log('3. Create a new policy for the shift-admin bucket');
      console.log('4. Set policy to allow INSERT operations');
      console.log('5. Use this policy definition:');
      console.log('   - Target roles: public');
      console.log('   - USING expression: true');
      console.log('   - WITH CHECK expression: true');
    } else {
      console.log('✅ Upload test successful:', uploadData);
      
      // Clean up test file
      await supabase.storage.from('shift-admin').remove([uploadData.path]);
      console.log('✅ Test file cleaned up');
    }
    
  } catch (error) {
    console.error('Setup error:', error);
  }
}

setupStorage();
