// apiClient.js
import axios from 'axios';

// Create an Axios instance with custom configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api/v1', // Adjust as needed
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    // You can add common headers here
  },
});

// Request interceptor for adding auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Or your token storage method
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (e.g., redirect to login)
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          // Handle other errors
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API routes object
const api = {
  // Auth routes
  auth: {
    // register new account
    register: (userData) => apiClient.post('/auth/register', userData),

    // login to your existing account
    login: (credentials) => apiClient.post('/auth/login', credentials),

    // logout from your account
    logout: () => apiClient.post('/auth/logout'),
  },


 appointment: {
    // Get all appointments
    getAll: (params) => apiClient.get('/appointments', { params }),
    
    // Get available providers
    getProviders: () => apiClient.get('/appointments/providers'),
    
    // Create a new appointment
    create: (appointmentData) => apiClient.post('/appointments', appointmentData),
    
    // Update an existing appointment
    update: (id, appointmentData) => apiClient.put(`/appointments/${id}`, appointmentData),
    
    // Delete an appointment
    delete: (id) => apiClient.delete(`/appointments/${id}`),

  },

  // Product routes
  products: {
    getAll: (params) => apiClient.get('/products', { params }),
    getById: (id) => apiClient.get(`/products/${id}`),
    create: (productData) => apiClient.post('/products', productData),
    update: (id, productData) => apiClient.put(`/products/${id}`, productData),
    delete: (id) => apiClient.delete(`/products/${id}`),
    search: (query) => apiClient.get('/products/search', { params: { q: query } }),
  },

  // Order routes
  orders: {
    getAll: (params) => apiClient.get('/orders', { params }),
    getById: (id) => apiClient.get(`/orders/${id}`),
    create: (orderData) => apiClient.post('/orders', orderData),
    updateStatus: (id, status) => apiClient.patch(`/orders/${id}/status`, { status }),
    getUserOrders: (userId) => apiClient.get(`/users/${userId}/orders`),
  },

  // File upload
  upload: {
    single: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return apiClient.post('/upload/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    multiple: (files) => {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      return apiClient.post('/upload/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  },
};

export default api;