-- Remove testimonials table and related policies
-- This migration removes the testimonials feature from the database

-- Drop all policies first
DROP POLICY IF EXISTS "Allow public read" ON testimonials;
DROP POLICY IF EXISTS "Allow public insert" ON testimonials;
DROP POLICY IF EXISTS "Allow public update" ON testimonials;
DROP POLICY IF EXISTS "Allow public delete" ON testimonials;

-- Drop the testimonials table
DROP TABLE IF EXISTS testimonials;
