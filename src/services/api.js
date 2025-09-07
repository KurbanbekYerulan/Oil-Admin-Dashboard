import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8088/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token and language
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add Accept-Language header
    const language = localStorage.getItem('language') || 'en';
    config.headers['Accept-Language'] = language;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
  profile: () => api.get('/me'),
};

// Auto Change API endpoints
export const autoChangeAPI = {
  getAll: () => api.get('/auto-change'),
  getById: (id) => api.get(`/auto-change/${id}`),
  create: (data) => api.post('/auto-change', data),
  update: (id, data) => api.post(`/auto-change/${id}`, data),
  delete: (id) => api.delete(`/auto-change/${id}`),
};

// Users API endpoints (for employees/admin users)
export const usersAPI = {
  getAll: () => api.get('/admin/users'),
  create: (data) => api.post('/admin/new-user', data),
};

// Branches API endpoints
export const branchesAPI = {
  getAll: () => api.get('/branches'),
  getById: (id) => api.get(`/branches/${id}`),
  getUserBranches: () => api.get('/admin/branches'),
  getUserBranchById: (id) => api.get(`/admin/branches/${id}`),
  create: (data) => api.post('/admin/branches', data),
  update: (id, data) => api.patch(`/admin/branches/${id}`, data),
  delete: (id) => api.delete(`/admin/branches/${id}`),
};

// Services API endpoints
export const servicesAPI = {
  getAll: () => api.get('/service'),
  getById: (id) => api.get(`/service/${id}`),
  create: (data) => api.post('/service', data),
  update: (id, data) => api.post(`/service/${id}`, data),
  delete: (id) => api.delete(`/service/${id}`),
};

// Product Types API endpoints
export const productTypesAPI = {
  getAll: () => api.get('/product-types'),
  getById: (id) => api.get(`/product-types/${id}`),
  create: (data) => api.post('/product-types', data),
  update: (id, data) => api.patch(`/product-types/${id}`, data),
  delete: (id) => api.delete(`/product-types/${id}`),
};

// Cars API endpoints
export const carsAPI = {
  getAll: () => api.get('/cars'),
  getById: (id) => api.get(`/cars/${id}`),
  // Admin car endpoints
  getAdminCars: () => api.get('/admin/cars'),
  getAdminCarById: (id) => api.get(`/admin/cars/${id}`),
  create: (data) => api.post('/admin/cars', data),
  update: (id, data) => api.patch(`/admin/cars/${id}`, data),
  delete: (id) => api.delete(`/admin/cars/${id}`),
  // Helper endpoints
  getBrands: () => api.get('/admin/car-brands'),
  getModels: () => api.get('/admin/car-models'),
  getDriveTypes: () => api.get('/admin/car-drive-types'),
  getEngineTypes: () => api.get('/admin/car-engine-types'),
};

// Car Brands API endpoints
export const carBrandsAPI = {
  getAll: () => api.get('/car-brand'),
  getById: (id) => api.get(`/car-brand/${id}`),
  create: (data) => api.post('/car-brand', data),
  update: (id, data) => api.post(`/car-brand/${id}`, data),
  delete: (id) => api.delete(`/car-brand/${id}`),
};

// Car Models API endpoints
export const carModelsAPI = {
  getAll: () => api.get('/car-model'),
  getById: (id) => api.get(`/car-model/${id}`),
  create: (data) => api.post('/car-model', data),
  update: (id, data) => api.post(`/car-model/${id}`, data),
  delete: (id) => api.delete(`/car-model/${id}`),
};

// Service Categories API endpoints
export const serviceCategoriesAPI = {
  getAll: () => api.get('/service-category'),
  getById: (id) => api.get(`/service-category/${id}`),
  create: (data) => api.post('/service-category', data),
  update: (id, data) => api.post(`/service-category/${id}`, data),
  delete: (id) => api.delete(`/service-category/${id}`),
};

// Auto Repairment API endpoints
export const autoRepairmentAPI = {
  getAll: () => api.get('/auto-repairment'),
  getById: (id) => api.get(`/auto-repairment/${id}`),
  create: (data) => api.post('/auto-repairment', data),
  update: (id, data) => api.post(`/auto-repairment/${id}`, data),
  delete: (id) => api.delete(`/auto-repairment/${id}`),
};

// Brands API endpoints
export const brandsAPI = {
  getAll: () => api.get('/brand'),
  getById: (id) => api.get(`/brand/${id}`),
  create: (data) => api.post('/brand', data),
  update: (id, data) => api.patch(`/brand/${id}`, data),
  delete: (id) => api.delete(`/brand/${id}`),
};

// Cities API endpoints
export const citiesAPI = {
  getAll: () => api.get('/city'),
  getById: (id) => api.get(`/city/${id}`),
  create: (data) => api.post('/city', data),
  update: (id, data) => api.patch(`/city/${id}`, data),
  delete: (id) => api.delete(`/city/${id}`),
};

// Countries API endpoints
export const countriesAPI = {
  getAll: () => api.get('/country'),
  getById: (id) => api.get(`/country/${id}`),
  create: (data) => api.post('/country', data),
  update: (id, data) => api.patch(`/country/${id}`, data),
  delete: (id) => api.delete(`/country/${id}`),
};

export default api;
