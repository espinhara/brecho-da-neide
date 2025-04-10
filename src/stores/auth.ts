// stores/auth.ts
import { defineStore } from 'pinia';
import { api } from '../providers/api'; // Importe o cliente HTTP

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async loginUser(credentials: { email: string; password: string }) {
      try {
        const response = await api.post('auth/login', credentials);
        if (response.status === 200) {
          const { token, user } = response.data;
          this.token = token;
          this.user = user;
          this.isAuthenticated = true;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          // Configura o token no cliente HTTP imediatamente
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return true; // Sucesso
        }
        return false;
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        this.isAuthenticated = false;
        return false;
      }
    },
    logout() {
      this.token = '';
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
    },
  },
});