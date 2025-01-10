import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// For list responses
export type ListResponse<T> = {
	data: T[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
};

export type BaseEntity<T> = {
	id: number;
	documentId?: string; // Optional field for external or unique references
	attributes: T & {
		createdAt: string;
		updatedAt: string;
		publishedAt: string | null;
	};
};

// Base API instance
const api = axios.create({
	baseURL: `${API_URL}/api`,
	timeout: 10000
});

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const apiRequest = async <T>(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	url: string,
	data?: object,
	config?: AxiosRequestConfig
): Promise<T> => {
	try {
		// Prepare headers
		const headers: AxiosRequestConfig['headers'] = {
			Authorization: `Bearer ${API_TOKEN}`,
			...config?.headers
		};

		// Execute the request with token
		const response = await api({
			method,
			url,
			data,
			headers,
			...config
		});

		return response.data;
	} catch (error) {
		handleApiError(error);
		throw error; // Re-throw for UI-level handling if necessary
	}
};

// Error handling function
const handleApiError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		const axiosError = error as AxiosError;

		if (axiosError.response) {
			console.error('API Error:', axiosError.response.data);
			throw new Error(
				axiosError.response.data?.message ||
					axiosError.response.data?.error?.message ||
					'Something went wrong.'
			);
		} else if (axiosError.request) {
			console.error('Network Error: No response from server.');
			throw new Error('Unable to connect to the server.');
		} else {
			console.error('Unexpected Error:', axiosError.message);
			throw new Error('An unexpected error occurred.');
		}
	} else {
		console.error('Non-Axios Error:', error);
		throw new Error('An unknown error occurred.');
	}
};

/* Auth */

export interface AuthResponse {
	jwt: string;
	user: {
		id: number;
		username: string;
		email: string;
	};
}

export const login = (identifier: string, password: string): Promise<AuthResponse> => {
	return apiRequest<AuthResponse>('POST', `${API_URL}/api/auth/local`, {
		identifier,
		password
	});
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
	return apiRequest<RegisterResponse>('POST', `${API_URL}/api/auth/local/register`, {
		username,
		email,
		password
	});
};

export interface User {
	id: number;
	username: string;
	email: string;
}

export const getUser = async (token: string): Promise<User> => {
	return apiRequest<User>('GET', `${API_URL}/api/users/me`, undefined, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const logout = () => {
	localStorage.removeItem('token');
	window.location.href = '/login';
};

/* Course */

export interface Course {
	id: number;
	documentId: number;
	slug: string;
	title: string;
	description: string;
	publicContent: string;
	fullContent?: string | null;
	price: number;
}

export const getCourses = async (): Promise<{ data: Course[] }> => {
	return apiRequest<{ data: Course[] }>('GET', `${API_URL}/api/courses`);
};

export const getCourse = async (id: string): Promise<{ data: Course[] }> => {
	return apiRequest<{ data: Course[] }>('GET', `${API_URL}/api/courses/${id}`);
};

/* Product */

export interface Product {
	id: number;
	documentId: number;
	title: string;
	image: string;
	category: string;
	description: string;
	courses: [];
	formulas: [];
}

export const getProducts = async (): Promise<{ data: Product[] }> => {
	return apiRequest<{ data: Product[] }>('GET', `${API_URL}/api/products?populate=*`);
};

export const getProduct = async (id: string): Promise<{ data: Product[] }> => {
	return apiRequest<{ data: Product[] }>('GET', `${API_URL}/api/products/${id}?populate=*`);
};

/* Article */

export interface Article {
	id: number;
	documentId: string;
	slug: string;
	title: string;
	content: string;
	category: string;
}

export const getArticles = async (): Promise<{ data: Article[] }> => {
	return apiRequest<{ data: Article[] }>('GET', `${API_URL}/api/articles`);
};
