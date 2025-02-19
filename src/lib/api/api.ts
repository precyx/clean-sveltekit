import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import qs from 'qs';

import type {
	AuthResponse,
	RegisterResponse,
	ConfirmRegistrationResponse,
	User,
	ApiResponse,
	Course,
	Product,
	Video,
	PayPalOrder
} from '$lib/api/types.ts';

import type { ServiceError } from '$lib/api/types';
import { PUBLIC_FRONTEND_URL, PUBLIC_STRAPI_API_URL } from '$env/static/public';
// API Proxy
const API_PROXY = 'api/proxy';

/**
 * Axios Base
 */
const api = axios.create({
	baseURL: `${PUBLIC_STRAPI_API_URL}/api`,
	timeout: 10000
});

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * API Request
 */

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

			throw {
				message:
					axiosError.response.data?.details?.error?.message ||
					axiosError.response.data?.message ||
					axiosError.response.data?.error?.message ||
					'Something went wrong.',
				data: axiosError?.response?.data?.error
			} as ServiceError;
		} else if (axiosError.request) {
			console.error('Network Error: No response from server.');
			throw { message: 'Unable to connect to the server.', data: {} } as ServiceError;
		} else {
			console.error('Unexpected Error:', axiosError.message);
			throw { message: 'An unexpected error occurred.', data: {} } as ServiceError;
		}
	} else {
		console.error('Non-Axios Error:', error);
		throw {
			message: 'An unknown error occurred: ' + error.message,
			data: error.data
		} as ServiceError;
	}
};

/**
 * User
 */

export const getUser = async (loginToken: string): Promise<User> => {
	return apiRequest<User>('POST', `/user-custom/me`, {
		loginToken: loginToken
	});
};

export const login = (email: string, password: string): Promise<AuthResponse> => {
	return apiRequest<AuthResponse>('POST', `/user-custom/login`, {
		email: email,
		password: password
	});
};

export const register = async ({
	username,
	email,
	password,
	country,
	phone
}: {
	username: string;
	email: string;
	password: string;
	country: string;
	phone: string;
}): Promise<RegisterResponse> => {
	return apiRequest<RegisterResponse>('POST', `/user-custom/register`, {
		username,
		email,
		country,
		phone,
		password
	});
};

export const logout = () => {
	localStorage.removeItem('loginToken');
	window.location.href = '/login';
};

export const confirmRegistration = async (
	confirmToken: string
): Promise<ConfirmRegistrationResponse> => {
	return apiRequest<ConfirmRegistrationResponse>('POST', `/user-custom/confirm-registration`, {
		confirmToken
	});
};

/**
 * Course
 */

const BASE_COURSE_QUERY = {
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

export const getCourses = async (): Promise<ApiResponse<Course[]>> => {
	const queryString = qs.stringify(BASE_COURSE_QUERY, { encode: false });
	return apiRequest<ApiResponse<Course[]>>('GET', `/courses?${queryString}`);
};

export const getCoursesByIds = async (ids: string[]): Promise<ApiResponse<Course[]>> => {
	const queryObject = {
		...BASE_COURSE_QUERY,
		filters: { documentId: { $in: ids } }
	};
	// ['sfnop7v7h9m18qu7z62yiras', 'xibkn7g7dpzgr7gfn815u435']

	const queryString = qs.stringify(queryObject, { encode: false });
	return apiRequest<ApiResponse<Course[]>>('GET', `/courses?${queryString}`);
};

export const getCourse = async (id: string): Promise<ApiResponse<Course>> => {
	const queryString = qs.stringify(BASE_COURSE_QUERY, { encode: false });

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

/**
 * Payment
 */

export const createOrder = async (ids: string[]): Promise<PayPalOrder> => {
	return await apiRequest('POST', '/payment/create-order', {
		ids: ids
	});
};

export const captureOrder = async (orderId: string): Promise<any> => {
	return await apiRequest('POST', '/payment/capture-order', { orderId });
};
