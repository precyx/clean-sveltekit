import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';

import qs from 'qs';

const API_URL = import.meta.env.VITE_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// For list responses
export type ApiResponse<T> = {
	data: T;
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
};

export type BaseEntity = {
	id: number;
	documentId?: string; // Optional external/unique reference
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
};

/**
 * Course
 */
export interface Course extends BaseEntity {
	slug: string;
	title: string;
	description: RichText[];
	category: string;
	publicContent: string;
	fullContent?: string | null;
	price: number;
	videoPreview: Image;
	videos: Video[];
	products: Product[];
}

/**
 * Product
 */
export interface Product extends BaseEntity {
	title: string;
	images: Image[];
	category: string;
	subcategory: string;
	description: string;
	courses: Course[];
	formulas: Formula[];
}

/**
 * Formula
 */
export interface Formula extends BaseEntity {
	title: string;
	description: string | null;
	locale: string; // Language locale
	FormulaItem: FormulaItem[]; // Array of FormulaItem
}

/**
 * FormulaItem
 */
export interface FormulaItem extends BaseEntity {
	title: string;
	percentage: string; // Represented as a string since percentages include "%"
	value: string; // Represented as a string to accommodate units like "g", "ml", etc.
	image: Image;
}

/**
 * Video
 */
export interface Video extends BaseEntity {
	title: string;
	courses: Course[];
	description: string | null;
	lessonNumber: string;
	video: Image;
}

/**
 * ImageFormat
 */
export interface ImageFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number;
}

/**
 * Image
 */
export interface Image extends BaseEntity {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		large?: ImageFormat;
		small?: ImageFormat;
		medium?: ImageFormat;
		thumbnail?: ImageFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: any | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

/**
 * TextNode
 */
export type RichText = {
	type: 'paragraph' | 'text';
	text?: string; // For "text" type
	children?: RichText[]; // For "paragraph" type
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

export const getCourses = async (): Promise<ApiResponse<Course[]>> => {
	const queryObject = {
		populate: {
			videos: {
				populate: 'video'
			},
			videoPreview: true,
			products: {
				populate: {
					formulas: {
						populate: {
							FormulaItem: {
								populate: 'image'
							}
						}
					},
					images: true
				}
			}
		}
	};
	const queryString = qs.stringify(queryObject, { encode: false });

	return apiRequest<ApiResponse<Course[]>>('GET', `${API_URL}/api/courses?${queryString}`);
};

export const getCourse = async (id: string): Promise<ApiResponse<Course>> => {
	const queryObject = {
		populate: {
			videos: {
				populate: 'video'
			},
			videoPreview: true,
			products: {
				populate: {
					formulas: {
						populate: {
							FormulaItem: {
								populate: 'image'
							}
						}
					},
					images: true
				}
			}
		}
	};
	const queryString = qs.stringify(queryObject, { encode: false });

	return apiRequest<ApiResponse<Course>>(
		'GET',
		`${API_URL}/api/courses/${id}
		?${queryString}
		`
	);
};

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
	return apiRequest<ApiResponse<Product[]>>('GET', `${API_URL}/api/products?populate=*`);
};

export const getProduct = async (id: string): Promise<ApiResponse<Product>> => {
	return apiRequest<ApiResponse<Product>>('GET', `${API_URL}/api/products/${id}?populate=*`);
};

export const getVideo = async (id: string): Promise<ApiResponse<Video>> => {
	return apiRequest<ApiResponse<Video>>('GET', `${API_URL}/api/videos/${id}?populate=*`);
};
