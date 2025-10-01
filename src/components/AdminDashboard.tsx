"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import FileUpload from './FileUpload';

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  demo_url?: string | null;
  created_at?: string;
};
type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price_range?: string;
  display_order: number;
  is_active: boolean;
};



type Testimonial = {
  id: string;
  client_name: string;
  client_company: string;
  client_role?: string;
  testimonial: string;
  client_image?: string;
  rating: number;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
};

type SiteContent = {
  id: string;
  section: string;
  content: any;
  updated_at: string;
};

const LOCAL_KEYS = {
  projects: 'sslabs_projects_v1',
  services: 'sslabs_services_v1',
  testimonials: 'sslabs_testimonials_v1',
  content: 'sslabs_content_v1',
  contacts: 'sslabs_contacts_v1'
};

function loadFromLocal<T>(key: string): T[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function saveToLocal<T>(key: string, items: T[]) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(items));
    }
  } catch {}
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'testimonials' | 'content' | 'contacts'>('projects');
  
  // State for all content types
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [newProject, setNewProject] = useState({
    title: '', category: 'Web Application', description: '', technologies: '', image: '/placeholder.svg', demo_url: ''
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editProjectForm, setEditProjectForm] = useState({
    title: '', category: '', description: '', technologies: '', image: '', demo_url: ''
  });

  const [newService, setNewService] = useState({
    title: '', description: '', icon: '💻', features: '', price_range: '', display_order: 0
  });

  const [newTestimonial, setNewTestimonial] = useState({
    client_name: '', client_company: '', client_role: '', testimonial: '', client_image: '/placeholder.svg', rating: 5, is_featured: false, display_order: 0
  });

  const [editingContent, setEditingContent] = useState<{[key: string]: any}>({});

  const usingDb = useMemo(() => isSupabaseConfigured, []);

  useEffect(() => {
    loadAllData();
  }, [usingDb]);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);

    if (usingDb) {
      try {
        // Load all data from Supabase
        const [projectsRes, servicesRes, testimonialsRes, contentRes, contactsRes] = await Promise.all([
          supabase.from('projects').select('*').order('created_at', { ascending: false }),
          supabase.from('services').select('*').order('display_order'),
          supabase.from('testimonials').select('*').order('display_order'),
          supabase.from('site_content').select('*'),
          supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(50)
        ]);

        if (projectsRes.error) console.warn('Projects load error:', projectsRes.error);
        else setProjects(projectsRes.data || []);

        if (servicesRes.error) console.warn('Services load error:', servicesRes.error);
        else setServices(servicesRes.data || []);

        if (testimonialsRes.error) console.warn('Testimonials load error:', testimonialsRes.error);
        else setTestimonials(testimonialsRes.data || []);

        if (contentRes.error) console.warn('Content load error:', contentRes.error);
        else {
          setSiteContent(contentRes.data || []);
          const contentObj: {[key: string]: any} = {};
          (contentRes.data || []).forEach((item: SiteContent) => {
            contentObj[item.section] = item.content;
          });
          setEditingContent(contentObj);
        }

        if (contactsRes.error) console.warn('Contacts load error:', contactsRes.error);
        else setContacts(contactsRes.data || []);

      } catch (err) {
        console.warn('Database unavailable, using local storage');
        loadFromLocalStorage();
      }
    } else {
      loadFromLocalStorage();
    }
    setLoading(false);
  };

  const loadFromLocalStorage = () => {
    setProjects(loadFromLocal<Project>(LOCAL_KEYS.projects));
    setServices(loadFromLocal<Service>(LOCAL_KEYS.services));
    setTestimonials(loadFromLocal<Testimonial>(LOCAL_KEYS.testimonials));
    const content = loadFromLocal<SiteContent>(LOCAL_KEYS.content);
    setSiteContent(content);
    const contentObj: {[key: string]: any} = {};
    content.forEach(item => {
      contentObj[item.section] = item.content;
    });
    setEditingContent(contentObj);
  };

  // Project functions
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: Omit<Project, 'id'> = {
      title: newProject.title.trim(),
      category: newProject.category,
      description: newProject.description.trim(),
      technologies: newProject.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      image: newProject.image,
      demo_url: newProject.demo_url || null,
    };

    if (!payload.title || !payload.description || payload.technologies.length === 0) {
      setError('Please fill in title, description, and at least one technology.');
      return;
    }

    if (usingDb) {
      const { error } = await supabase.from('projects').insert([payload]);
      if (error) {
        setError('Failed to add project: ' + error.message);
        return;
      }
    } else {
      const local = loadFromLocal<Project>(LOCAL_KEYS.projects);
      const item: Project = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...payload };
      const next = [item, ...local];
      saveToLocal(LOCAL_KEYS.projects, next);
      setProjects(next);
    }

    setNewProject({ title: '', category: 'Web Application', description: '', technologies: '', image: '/placeholder.svg', demo_url: '' });
    if (usingDb) loadAllData();
  };

  const handleDeleteProject = async (id: string) => {
    if (usingDb) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        setError('Failed to delete project: ' + error.message);
        return;
      }
      loadAllData();
    } else {
      const next = projects.filter(p => p.id !== id);
      saveToLocal(LOCAL_KEYS.projects, next);
      setProjects(next);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setEditProjectForm({
      title: project.title,
      category: project.category,
      description: project.description,
      technologies: project.technologies.join(', '),
      image: project.image,
      demo_url: project.demo_url || ''
    });
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    
    setError(null);

    const payload = {
      title: editProjectForm.title.trim(),
      category: editProjectForm.category.trim(),
      description: editProjectForm.description.trim(),
      technologies: editProjectForm.technologies.split(',').map(t => t.trim()).filter(Boolean),
      image: editProjectForm.image,
      demo_url: editProjectForm.demo_url || null,
    };

    if (!payload.title || !payload.description || payload.technologies.length === 0) {
      setError('Please fill in title, description, and at least one technology.');
      return;
    }

    if (usingDb) {
      const { error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', editingProject.id);
      
      if (error) {
        setError('Failed to update project: ' + error.message);
        return;
      }
      loadAllData();
    } else {
      const updatedProject: Project = { ...editingProject, ...payload };
      const next = projects.map(p => p.id === editingProject.id ? updatedProject : p);
      saveToLocal(LOCAL_KEYS.projects, next);
      setProjects(next);
    }

    setEditingProject(null);
    setEditProjectForm({ title: '', category: '', description: '', technologies: '', image: '', demo_url: '' });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setEditProjectForm({ title: '', category: '', description: '', technologies: '', image: '', demo_url: '' });
  };

  // Service functions
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: Omit<Service, 'id'> = {
      title: newService.title.trim(),
      description: newService.description.trim(),
      icon: newService.icon,
      features: newService.features.split(',').map(f => f.trim()).filter(Boolean),
      price_range: newService.price_range || null,
      display_order: newService.display_order,
      is_active: true
    };

    if (!payload.title || !payload.description) {
      setError('Please fill in title and description.');
      return;
    }

    if (usingDb) {
      const { error } = await supabase.from('services').insert([payload]);
      if (error) {
        setError('Failed to add service: ' + error.message);
        return;
      }
    } else {
      const local = loadFromLocal<Service>(LOCAL_KEYS.services);
      const item: Service = { id: crypto.randomUUID(), ...payload };
      const next = [...local, item];
      saveToLocal(LOCAL_KEYS.services, next);
      setServices(next);
    }

    setNewService({ title: '', description: '', icon: '💻', features: '', price_range: '', display_order: 0 });
    if (usingDb) loadAllData();
  };

  // Content update function
  const handleUpdateContent = async (section: string) => {
    if (!editingContent[section]) return;

    if (usingDb) {
      const { error } = await supabase
        .from('site_content')
        .upsert({ section, content: editingContent[section] }, { onConflict: 'section' });
      
      if (error) {
        setError('Failed to update content: ' + error.message);
        return;
      }
      loadAllData();
    } else {
      const local = loadFromLocal<SiteContent>(LOCAL_KEYS.content);
      const existingIndex = local.findIndex(item => item.section === section);
      const item: SiteContent = {
        id: crypto.randomUUID(),
        section,
        content: editingContent[section],
        updated_at: new Date().toISOString()
      };
      
      if (existingIndex >= 0) {
        local[existingIndex] = item;
      } else {
        local.push(item);
      }
      
      saveToLocal(LOCAL_KEYS.content, local);
      setSiteContent(local);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management System</h1>
          <p className="text-gray-600">Manage all aspects of your SuperShift Labs website</p>
          {!usingDb && (
            <p className="mt-2 text-xs text-amber-700 bg-amber-50 inline-block px-2 py-1 rounded border border-amber-200">
              Running in frontend-only mode. Connect Supabase to persist data across browsers.
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {(['projects', 'services', 'testimonials', 'content', 'contacts'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize whitespace-nowrap ${
                    activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading...</p>
              </div>
            )}

            {!loading && (
              <>
                {/* Projects Tab */}
                {activeTab === 'projects' && (
                  <div>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Project</h2>
                      <form onSubmit={handleAddProject} className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                          required
                        />
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                        >
                          <option value="Web Application">Web Application</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="Desktop App">Desktop App</option>
                          <option value="AI/ML">AI/ML</option>
                        </select>
                        <textarea
                          placeholder="Project Description"
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 md:col-span-2 text-gray-900 bg-white"
                          rows={3}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Technologies (comma-separated)"
                          value={newProject.technologies}
                          onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                          required
                        />
                        <input
                          type="url"
                          placeholder="Demo URL (optional)"
                          value={newProject.demo_url}
                          onChange={(e) => setNewProject({ ...newProject, demo_url: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                        />
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Image
                          </label>
                          <FileUpload
                            onFileUploaded={(url) => setNewProject({ ...newProject, image: url })}
                            folder="projects"
                            currentImage={newProject.image !== '/placeholder.svg' ? newProject.image : undefined}
                            className="w-full"
                          />
                        </div>
                        <button
                          type="submit"
                          className="md:col-span-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                          Add Project
                        </button>
                      </form>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Current Projects ({projects.length})</h2>
                      
                      {/* Edit Project Form */}
                      {editingProject && (
                        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Project</h3>
                          <form onSubmit={handleUpdateProject} className="grid md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Project Title"
                              value={editProjectForm.title}
                              onChange={(e) => setEditProjectForm({ ...editProjectForm, title: e.target.value })}
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                              required
                            />
                            <select
                              value={editProjectForm.category}
                              onChange={(e) => setEditProjectForm({ ...editProjectForm, category: e.target.value })}
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                            >
                              <option value="Web Application">Web Application</option>
                              <option value="Mobile App">Mobile App</option>
                              <option value="Desktop App">Desktop App</option>
                              <option value="API">API</option>
                              <option value="Other">Other</option>
                            </select>
                            <textarea
                              placeholder="Project Description"
                              value={editProjectForm.description}
                              onChange={(e) => setEditProjectForm({ ...editProjectForm, description: e.target.value })}
                              className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-vertical text-gray-900 bg-white"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Technologies (comma-separated)"
                              value={editProjectForm.technologies}
                              onChange={(e) => setEditProjectForm({ ...editProjectForm, technologies: e.target.value })}
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                              required
                            />
                            <input
                              type="url"
                              placeholder="Demo URL (optional)"
                              value={editProjectForm.demo_url}
                              onChange={(e) => setEditProjectForm({ ...editProjectForm, demo_url: e.target.value })}
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                            />
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                              <FileUpload
                                onFileUploaded={(url) => setEditProjectForm({ ...editProjectForm, image: url })}
                                folder="projects"
                                currentImage={editProjectForm.image !== '/placeholder.svg' ? editProjectForm.image : undefined}
                                className="w-full"
                              />
                            </div>
                            <div className="md:col-span-2 flex gap-4">
                              <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                              >
                                Update Project
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {projects.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-600">No projects found. Add your first project above!</p>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {projects.map((project) => (
                            <div key={project.id} className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{project.category}</p>
                              <p className="text-gray-700 mb-3">{project.description}</p>
                              {project.demo_url && (
                                <p className="text-sm text-blue-600 mb-2">
                                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    🔗 View Demo
                                  </a>
                                </p>
                              )}
                              <div className="mb-3">
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {project.technologies.map((tech, index) => (
                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditProject(project)}
                                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Service</h2>
                      <form onSubmit={handleAddService} className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Service Title"
                          value={newService.title}
                          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Icon (emoji or text)"
                          value={newService.icon}
                          onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                        />
                        <textarea
                          placeholder="Service Description"
                          value={newService.description}
                          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 md:col-span-2 text-gray-900 bg-white"
                          rows={3}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Features (comma-separated)"
                          value={newService.features}
                          onChange={(e) => setNewService({ ...newService, features: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Price Range (optional)"
                          value={newService.price_range}
                          onChange={(e) => setNewService({ ...newService, price_range: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                        />
                        <button
                          type="submit"
                          className="md:col-span-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Add Service
                        </button>
                      </form>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Current Services ({services.length})</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {services.map((service) => (
                          <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl">{service.icon}</span>
                              <h3 className="font-bold text-lg">{service.title}</h3>
                            </div>
                            <p className="text-gray-700 mb-3">{service.description}</p>
                            {service.features.length > 0 && (
                              <div className="mb-3">
                                <p className="text-sm font-medium text-gray-900 mb-1">Features:</p>
                                <ul className="text-sm text-gray-600 list-disc list-inside">
                                  {service.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {service.price_range && (
                              <p className="text-sm text-green-600 font-medium mb-3">Price: {service.price_range}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Site Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-bold text-gray-900">Edit Site Content</h2>
                    
                    {/* Hero Section */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Main Title"
                          value={editingContent.hero?.title || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            hero: { ...editingContent.hero, title: e.target.value }
                          })}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Subtitle"
                          value={editingContent.hero?.subtitle || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            hero: { ...editingContent.hero, subtitle: e.target.value }
                          })}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <textarea
                          placeholder="Description"
                          value={editingContent.hero?.description || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            hero: { ...editingContent.hero, description: e.target.value }
                          })}
                          className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2"
                          rows={3}
                        />
                        <input
                          type="text"
                          placeholder="CTA Button Text"
                          value={editingContent.hero?.cta_text || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            hero: { ...editingContent.hero, cta_text: e.target.value }
                          })}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                          onClick={() => handleUpdateContent('hero')}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Update Hero
                        </button>
                      </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">About Section</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="About Title"
                          value={editingContent.about?.title || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            about: { ...editingContent.about, title: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <textarea
                          placeholder="About Description"
                          value={editingContent.about?.description || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            about: { ...editingContent.about, description: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          rows={4}
                        />
                        <input
                          type="text"
                          placeholder="Mission Statement"
                          value={editingContent.about?.mission || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            about: { ...editingContent.about, mission: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                          onClick={() => handleUpdateContent('about')}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Update About
                        </button>
                      </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Contact Section</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Contact Title"
                          value={editingContent.contact?.title || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            contact: { ...editingContent.contact, title: e.target.value }
                          })}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={editingContent.contact?.email || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            contact: { ...editingContent.contact, email: e.target.value }
                          })}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={editingContent.contact?.phone || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            contact: { ...editingContent.contact, phone: e.target.value }
                          })}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={editingContent.contact?.location || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            contact: { ...editingContent.contact, location: e.target.value }
                          })}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <textarea
                          placeholder="Contact Description"
                          value={editingContent.contact?.description || ''}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            contact: { ...editingContent.contact, description: e.target.value }
                          })}
                          className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2"
                          rows={3}
                        />
                        <button
                          onClick={() => handleUpdateContent('contact')}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Update Contact
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contacts Tab */}
                {activeTab === 'contacts' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Form Submissions ({contacts.length})</h2>
                    {contacts.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600">No contact submissions yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {contacts.map((contact) => (
                          <div key={contact.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{contact.name}</h3>
                              <span className="text-sm text-gray-500">
                                {new Date(contact.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{contact.email}</p>
                            <p className="text-gray-700">{contact.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Testimonials Tab */}
                {activeTab === 'testimonials' && (
                  <div className="text-center py-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Testimonials Management</h2>
                    <p className="text-gray-600">Testimonial management interface coming soon...</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;