import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import qs from 'qs';

import { PUBLIC_FRONTEND_URL } from '$env/static/public';

/**
 * API Proxy
 */
const API_PROXY = 'api/proxy';

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
 * RichText
 */
export type RichText = {
	type: 'paragraph' | 'text';
	text?: string; // For "text" type
	children?: RichText[]; // For "paragraph" type
};

// Base API instance
const api = axios.create({
	baseURL: `${PUBLIC_FRONTEND_URL}${API_PROXY}`,
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
		// Execute request (token is handled in the proxy)
		const response = await api({
			method,
			url,
			data,
			...config
		});

		return response.data;
	} catch (error) {
		console.log('XXXX');
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
				axiosError.response.data?.details?.error?.message ||
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

/**
 * Auth
 */

export interface AuthResponse {
	jwt: string;
	user: {
		id: number;
		username: string;
		email: string;
	};
}

export const login = (identifier: string, password: string): Promise<AuthResponse> => {
	return apiRequest<AuthResponse>('POST', `/auth/local`, {
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

export interface User {
	id: number;
	username: string;
	email: string;
}

/**
 * User
 */

export const getUser = async (token: string): Promise<User> => {
	return apiRequest<User>('GET', `/users/me`, undefined, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const register = async (
	username: string,
	email: string,
	password: string
): Promise<RegisterResponse> => {
	return apiRequest<RegisterResponse>('POST', `/auth/local/register`, {
		username,
		email,
		password
	});
};

export const logout = () => {
	localStorage.removeItem('token');
	window.location.href = '/login';
};

/**
 * Course
 */

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

	return apiRequest<ApiResponse<Course[]>>('GET', `/courses?${queryString}`);
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
		`/courses/${id}
		?${queryString}
		`
	);
};

/**
 * Product
 */

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
	return apiRequest<ApiResponse<Product[]>>('GET', `/products?populate=*`);
};

export const getProduct = async (id: string): Promise<ApiResponse<Product>> => {
	const queryObject = {
		populate: {
			images: true,
			courses: {
				populate: {
					videoPreview: true
				}
			}
		}
	};
	const queryString = qs.stringify(queryObject, { encode: false });

	return apiRequest<ApiResponse<Product>>('GET', `/products/${id}?${queryString}`);
};

export const getVideo = async (id: string): Promise<ApiResponse<Video>> => {
	return apiRequest<ApiResponse<Video>>('GET', `/videos/${id}?populate=*`);
};

type PayPalOrder = {
	id: string;
	status: string;
	links: {
		href: string;
		rel: string;
		method: string;
	}[];
};

/**
 * Payment
 */

export const createOrder = async (amount: string): Promise<PayPalOrder> => {
	return await apiRequest('POST', '/payment/create-order', {
		amount: amount
	});
};

export const captureOrder = async (orderId: string): Promise<any> => {
	return await apiRequest('POST', '/payment/capture-order', { orderId });
};
