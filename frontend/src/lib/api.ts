import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getNotices = async (params?: { category?: string; search?: string }) => {
  const response = await api.get('/notices/', { params });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories/');
  return response.data;
};

export default api;