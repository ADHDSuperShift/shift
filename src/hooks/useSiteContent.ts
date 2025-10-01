"use client";
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export function useSiteContent(section: string, fallback: any = {}) {
  const [content, setContent] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      if (!isSupabaseConfigured) {
        setContent(fallback);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('section', section)
          .single();

        if (error) {
          console.warn(`Failed to load content for ${section}:`, error);
          setContent(fallback);
        } else {
          setContent(data?.content || fallback);
        }
      } catch (err) {
        console.warn(`Content load error for ${section}:`, err);
        setContent(fallback);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [section, fallback, isSupabaseConfigured]);

  return { content, loading };
}

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      if (!isSupabaseConfigured) {
        // Load static projects if no database
        const { staticProjects } = await import('../data/staticProjects');
        setProjects(staticProjects);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Failed to load projects:', error);
          // Fallback to static projects
          const { staticProjects } = await import('../data/staticProjects');
          setProjects(staticProjects);
        } else {
          setProjects(data || []);
        }
      } catch (err) {
        console.warn('Projects load error:', err);
        const { staticProjects } = await import('../data/staticProjects');
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading };
}

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      if (!isSupabaseConfigured) {
        setServices([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (error) {
          console.warn('Failed to load services:', error);
          setServices([]);
        } else {
          setServices(data || []);
        }
      } catch (err) {
        console.warn('Services load error:', err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, loading };
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamMembers = async () => {
      if (!isSupabaseConfigured) {
        setTeamMembers([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (error) {
          console.warn('Failed to load team members:', error);
          setTeamMembers([]);
        } else {
          setTeamMembers(data || []);
        }
      } catch (err) {
        console.warn('Team members load error:', err);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  return { teamMembers, loading };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      if (!isSupabaseConfigured) {
        setTestimonials([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (error) {
          console.warn('Failed to load testimonials:', error);
          setTestimonials([]);
        } else {
          setTestimonials(data || []);
        }
      } catch (err) {
        console.warn('Testimonials load error:', err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return { testimonials, loading };
}
