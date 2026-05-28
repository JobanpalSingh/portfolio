import { api } from './client.js';

export const submitContact = (payload) => api.post('/api/contact', payload);

/** Admin only — requires Bearer token */
export const fetchContactMessages = () => api.get('/api/contact');
