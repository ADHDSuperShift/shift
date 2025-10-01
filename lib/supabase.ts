import { createClient } from '@supabase/supabase-js'

// Supabase configuration with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

// Check if we're using demo/placeholder values
const isConfigured = supabaseUrl !== 'https://demo.supabase.co' && 
                     supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

if (!isConfigured) {
  console.warn('⚠️  Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export { isConfigured as isSupabaseConfigured }

// Database types
export type Project = {
  id: string
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  demo_url?: string
  created_at: string
}

export type Contact = {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export type SEOAnalysis = {
  id: string
  url: string
  score: number
  results: any
  created_at: string
}
