import { api } from './client.js';

export const loginAdmin = (email, password) =>
  api.post('/api/auth/login', { email, password });

export const fetchAdminStats = () => api.get('/api/admin/stats');
