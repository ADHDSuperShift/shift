-- Insert current projects from the website into the database
INSERT INTO projects (title, description, image, category, technologies, demo_url) VALUES 
('E-Commerce Platform', 'A comprehensive online marketplace with advanced filtering, payment processing, and inventory management features.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', 'web', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://demo-ecommerce.supershiftlabs.com'),

('FinTech Mobile App', 'Secure banking application with biometric authentication, real-time transactions, and investment tracking.', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80', 'mobile', ARRAY['React Native', 'Node.js', 'MongoDB', 'AWS'], 'https://apps.apple.com/app/fintech-demo'),

('Healthcare Dashboard', 'Real-time patient monitoring system with analytics, appointment scheduling, and telemedicine integration.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80', 'web', ARRAY['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'], 'https://demo-healthcare.supershiftlabs.com'),

('Restaurant Management System', 'Complete restaurant solution with online ordering, inventory tracking, and staff management.', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', 'web', ARRAY['Angular', 'Firebase', 'TypeScript', 'Stripe'], 'https://demo-restaurant.supershiftlabs.com'),

('Real Estate Platform', 'Property listing platform with virtual tours, mortgage calculators, and agent management.', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', 'web', ARRAY['Next.js', 'Supabase', 'TypeScript', 'Mapbox'], 'https://demo-realestate.supershiftlabs.com'),

('IoT Dashboard', 'Smart home control center with device monitoring, automation rules, and energy analytics.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80', 'web', ARRAY['React', 'Python', 'InfluxDB', 'MQTT'], 'https://demo-iot.supershiftlabs.com');

-- Insert current testimonials/clients from the website into the database
INSERT INTO testimonials (client_name, client_company, client_role, testimonial, client_image, rating, is_featured, display_order) VALUES 
('Sarah Johnson', 'TechCorp Solutions', 'CEO', 'SuperShift Labs transformed our digital presence with an incredible web platform.', 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958839362_88f2f015.webp', 5, true, 1),

('Michael Chen', 'InnovateTech', 'CTO', 'Their mobile app development exceeded our expectations in every way.', 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958841219_639411ea.webp', 5, true, 2),

('Emily Rodriguez', 'CloudFirst Inc', 'VP Engineering', 'Exceptional cloud architecture and seamless AWS integration.', 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958843237_e35a677e.webp', 5, true, 3),

('David Kim', 'StartupLab', 'Founder', 'From concept to launch, they delivered a world-class product.', 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958844917_bc5807c2.webp', 5, true, 4),

('Lisa Wang', 'DigitalFlow', 'Marketing Director', 'Outstanding design and development work that drove real business results.', 'https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958846898_49d5b508.webp', 5, true, 5);

-- Insert default services that should be editable
INSERT INTO services (title, description, icon, features, price_range, display_order) VALUES 
('Web Development', 'Custom web applications built with modern frameworks and scalable architecture.', '🌐', ARRAY['React/Next.js Development', 'Backend API Development', 'Database Design', 'Cloud Deployment', 'Performance Optimization'], '$5,000 - $50,000', 1),

('Mobile App Development', 'Native and cross-platform mobile applications for iOS and Android.', '📱', ARRAY['React Native Development', 'Native iOS/Android', 'App Store Deployment', 'Push Notifications', 'In-App Purchases'], '$8,000 - $75,000', 2),

('Cloud Solutions', 'Scalable cloud infrastructure and DevOps automation on AWS, Azure, and GCP.', '☁️', ARRAY['AWS/Azure/GCP Setup', 'CI/CD Pipelines', 'Containerization', 'Monitoring & Logging', 'Security Implementation'], '$3,000 - $25,000', 3),

('UI/UX Design', 'User-centered design that creates intuitive and engaging digital experiences.', '🎨', ARRAY['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Usability Testing', 'Design Systems'], '$2,000 - $15,000', 4),

('E-Commerce Solutions', 'Complete online store development with payment processing and inventory management.', '🛒', ARRAY['Shopify/WooCommerce', 'Custom E-commerce', 'Payment Integration', 'Inventory Management', 'Analytics & Reporting'], '$4,000 - $40,000', 5),

('Consulting & Strategy', 'Technical consulting to help you make the right technology decisions for your business.', '💡', ARRAY['Technology Assessment', 'Architecture Planning', 'Team Training', 'Code Reviews', 'Strategic Planning'], '$150 - $300/hour', 6);

-- Add some team members
INSERT INTO team_members (name, role, bio, image, linkedin_url, display_order) VALUES 
('Alex Rodriguez', 'Founder & Lead Developer', 'Full-stack developer with 10+ years of experience building scalable web applications and leading development teams.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 'https://linkedin.com/in/alex-rodriguez', 1),

('Sarah Kim', 'Senior Frontend Developer', 'React and Vue.js specialist focused on creating beautiful, performant user interfaces and exceptional user experiences.', 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?auto=format&fit=crop&w=400&q=80', 'https://linkedin.com/in/sarah-kim', 2),

('Michael Johnson', 'DevOps Engineer', 'Cloud infrastructure expert specializing in AWS, Docker, and Kubernetes for scalable, reliable deployments.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', 'https://linkedin.com/in/michael-johnson', 3),

('Emma Chen', 'UI/UX Designer', 'Creative designer with a passion for user-centered design and creating intuitive digital experiences that users love.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', 'https://linkedin.com/in/emma-chen', 4);
