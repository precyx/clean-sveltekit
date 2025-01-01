import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_API_URL;


export async function fetchAPI(endpoint: string, fetchOverride?: typeof fetch) {

    const fetchFn = fetchOverride || fetch;  // Use custom fetch if provided
    const response = await fetchFn(`${API_URL}/api/${endpoint}`);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    
    return response.json();
  }

  /* Auth */
  
  export interface AuthResponse {
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
  }
  
  export const login = async (identifier: string, password: string): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>(`${API_URL}/api/auth/local`, {
      identifier,
      password
    });
    return res.data;
  };


  export interface RegisterResponse {
    user: {
      id: number;
      username: string;
      email: string;
    };
  }
  
  export const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> => {
    const res = await axios.post<RegisterResponse>(`${API_URL}/api/auth/local/register`, {
      username,
      email,
      password
    });
    return res.data;
  };


  export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export const getUser = async (token: string): Promise<User> => {
    const res = await axios.get<User>(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  };


  export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };


  /* Course */

  export interface Course {
    id: number;
    title: string;
    description: string;
    publicContent: string;
    fullContent?: string | null;
    price: number;
  }

  export const getCourses = async (): Promise<{data: Course[]}> => {
    const res = await axios.get<{data: Course[]}>(`${API_URL}/api/courses`, {});
    return res.data;
  };