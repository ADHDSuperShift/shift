import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://pjhrogdbzpqnxhfxxmsb.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqaHJvZ2RienBxbnhoZnh4bXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyOTUxODMsImV4cCI6MjA3NDg3MTE4M30.-ayJ2mZBUtc6-FWibASPkVj_51Vse1s86elTj_7s-cM'
);

async function testConnection() {
  try {
    console.log('🔗 Testing Supabase connection...');
    const { data, error } = await supabase.from('projects').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log('❌ Error:', error.message);
      if (error.message.includes('relation "projects" does not exist')) {
        console.log('🔧 Database tables not created yet. Need to run migration.');
        return false;
      }
    } else {
      console.log('✅ Connection successful!');
      console.log('📊 Projects table exists');
      return true;
    }
  } catch (err) {
    console.log('❌ Connection failed:', err.message);
    return false;
  }
}

testConnection();
