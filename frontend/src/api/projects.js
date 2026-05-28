import { api } from './client.js';

export const fetchProjects = () => api.get('/api/projects');
export const fetchProject = (id) => api.get(`/api/projects/${id}`);

export const createProject = (formData) => api.post('/api/projects', formData);

export const updateProject = (id, formData) => api.put(`/api/projects/${id}`, formData);

export const deleteProject = (id) => api.delete(`/api/projects/${id}`);
