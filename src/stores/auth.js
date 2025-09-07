import { defineStore } from 'pinia';
import { authAPI } from '@/services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
    loading: false,
    error: null,
  }),

  getters: {
    userRole: (state) => state.user?.role || 'user',
    isAdmin: (state) => state.user?.role === 'admin',
    isManager: (state) => state.user?.role === 'manager',
    isEmployee: (state) => state.user?.role === 'employee',
    userName: (state) => state.user?.name || 'User',
    userPhone: (state) => state.user?.phone || '',
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await authAPI.login(credentials);
        const { user, token } = response.data;
        
        this.user = user;
        this.token = token;
        this.isAuthenticated = true;
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        
        return { success: true, user };
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },



    async logout() {
      try {
        await authAPI.logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.clearAuth();
      }
    },

    async refreshProfile() {
      if (!this.token) return;
      
      try {
        const response = await authAPI.profile();
        const user = response.data;
        
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Profile refresh error:', error);
        if (error.response?.status === 401) {
          this.clearAuth();
        }
      }
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
      
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    },

    setError(error) {
      this.error = error;
    },

    clearError() {
      this.error = null;
    },
  },
});
