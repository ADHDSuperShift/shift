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

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] NOT NULL,
  price_range TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  linkedin_url TEXT,
  twitter_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_company TEXT NOT NULL,
  client_role TEXT,
  testimonial TEXT NOT NULL,
  client_image TEXT,
  rating INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create site_content table for editable text content
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and admin write access (with IF NOT EXISTS handling)
DROP POLICY IF EXISTS "Allow public read access" ON projects;
DROP POLICY IF EXISTS "Allow public insert" ON projects;
DROP POLICY IF EXISTS "Allow public update" ON projects;
DROP POLICY IF EXISTS "Allow public delete" ON projects;

CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON projects FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON contacts;
DROP POLICY IF EXISTS "Allow public read" ON contacts;

CREATE POLICY "Allow public insert" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON contacts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON seo_analyses;
DROP POLICY IF EXISTS "Allow public read" ON seo_analyses;

CREATE POLICY "Allow public insert" ON seo_analyses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON seo_analyses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON services;
DROP POLICY IF EXISTS "Allow public insert" ON services;
DROP POLICY IF EXISTS "Allow public update" ON services;
DROP POLICY IF EXISTS "Allow public delete" ON services;

CREATE POLICY "Allow public read" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON services FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON services FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read" ON team_members;
DROP POLICY IF EXISTS "Allow public insert" ON team_members;
DROP POLICY IF EXISTS "Allow public update" ON team_members;
DROP POLICY IF EXISTS "Allow public delete" ON team_members;

CREATE POLICY "Allow public read" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON team_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON team_members FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON team_members FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read" ON testimonials;
DROP POLICY IF EXISTS "Allow public insert" ON testimonials;
DROP POLICY IF EXISTS "Allow public update" ON testimonials;
DROP POLICY IF EXISTS "Allow public delete" ON testimonials;

CREATE POLICY "Allow public read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON testimonials FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read" ON site_content;
DROP POLICY IF EXISTS "Allow public insert" ON site_content;
DROP POLICY IF EXISTS "Allow public update" ON site_content;

CREATE POLICY "Allow public read" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON site_content FOR UPDATE USING (true);

-- Insert default site content
INSERT INTO site_content (section, content) VALUES 
('hero', '{
  "title": "SuperShift Labs",
  "subtitle": "Transforming Ideas into Digital Reality",
  "description": "We create cutting-edge web applications, mobile solutions, and AI-powered platforms that drive your business forward.",
  "cta_text": "Start Your Project",
  "background_image": "/placeholder.svg"
}'),
('about', '{
  "title": "About SuperShift Labs",
  "subtitle": "We believe in the power of transformation through technology",
  "description": "At SuperShift Labs, we don''t just build applications – we create digital transformations that shift businesses into their next phase of growth. Our name represents the quantum leap forward that happens when innovative technology meets strategic thinking.",
  "mission": "To empower businesses with innovative technology solutions that drive growth and success.",
  "story": "Founded in 2020, we''ve helped dozens of companies navigate the complex digital landscape with custom solutions that scale. From startups to enterprise clients, we bring the same level of dedication and technical excellence to every project.",
  "values": [
    "Expert team with 50+ combined years of experience",
    "Proven track record with 100+ successful projects", 
    "Full-stack capabilities from design to deployment",
    "Agile development process with transparent communication",
    "Post-launch support and continuous optimization"
  ]
}'),
('services', '{
  "title": "Our Services",
  "description": "We provide comprehensive digital solutions to transform your business ideas into reality"
}'),
('projects', '{
  "title": "Our Projects",
  "description": "Explore our portfolio of successful digital solutions and innovative applications"
}'),
('contact', '{
  "title": "Let''s Build Something Amazing",
  "description": "Ready to transform your digital presence? Get in touch and let''s discuss your project.",
  "email": "hello@supershiftlabs.com",
  "phone": "+1 (555) 123-4567",
  "location": "San Francisco, CA",
  "socialLinks": [
    {"name": "LinkedIn", "url": "https://linkedin.com/company/supershiftlabs"},
    {"name": "Twitter", "url": "https://twitter.com/supershiftlabs"},
    {"name": "GitHub", "url": "https://github.com/supershiftlabs"},
    {"name": "Dribbble", "url": "https://dribbble.com/supershiftlabs"}
  ]
}')
ON CONFLICT (section) DO NOTHING;
