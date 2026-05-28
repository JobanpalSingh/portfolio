import { api } from './client.js';

export const fetchTestimonials = () => api.get('/api/testimonials');

export const createTestimonial = (formData) => api.post('/api/testimonials', formData);

export const updateTestimonial = (id, formData) =>
  api.put(`/api/testimonials/${id}`, formData);

export const deleteTestimonial = (id) => api.delete(`/api/testimonials/${id}`);
