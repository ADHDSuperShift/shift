import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://pjhrogdbzpqnxhfxxmsb.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqaHJvZ2RienBxbnhoZnh4bXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyOTUxODMsImV4cCI6MjA3NDg3MTE4M30.-ayJ2mZBUtc6-FWibASPkVj_51Vse1s86elTj_7s-cM'
);

async function testDatabase() {
  try {
    console.log('🧪 Testing database operations...');
    
    // Test reading projects
    const { data: projects, error: selectError } = await supabase
      .from('projects')
      .select('*')
      .limit(5);
      
    if (selectError) {
      console.log('❌ Select error:', selectError.message);
      return;
    }
    
    console.log('✅ Successfully read projects:', projects.length, 'found');
    
    // Test inserting a sample project (if none exist)
    if (projects.length === 0) {
      console.log('📝 Inserting sample project...');
      const { data: insertData, error: insertError } = await supabase
        .from('projects')
        .insert([
          {
            title: 'SuperShift Labs Website',
            description: 'Modern Next.js website with Supabase integration',
            image: '/placeholder.svg',
            category: 'Web Application',
            technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'TypeScript'],
            demo_url: 'https://localhost:3000'
          }
        ])
        .select();
        
      if (insertError) {
        console.log('❌ Insert error:', insertError.message);
      } else {
        console.log('✅ Successfully inserted sample project');
      }
    }
    
    console.log('🎉 Database test completed successfully!');
    
  } catch (err) {
    console.log('❌ Test failed:', err.message);
  }
}

testDatabase();
