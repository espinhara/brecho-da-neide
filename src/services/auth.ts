// auth.ts (serviço de autenticação)
import axios from 'axios';
import { getApiUrl } from '../providers/api';

export const login = async (credentials: { email: string; password: string }): Promise<string> => {
  const response = await axios.post(getApiUrl() + '/api/login', credentials);
  const token = response.data.token; // Supondo que a API retorna um campo "token"
  localStorage.setItem('authToken', token); // Salva o token no localStorage
  return token;
};

// Configuração do Axios com interceptador
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));