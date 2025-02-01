import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import axios from 'axios';

import { PUBLIC_STRAPI_API_URL } from '$env/static/public';
import { STRAPI_API_TOKEN } from '$env/static/private';

/**
 * Generic function to forward API requests to Strapi using Axios
 */
async function proxyToStrapi(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	params: any,
	url: URL,
	request: Request
) {
	if (!params.path) {
		console.log("⚠️__Missing 'path' parameter");
		return json({ error: 'Invalid request' }, { status: 400 });
	}

	const queryString = url.search; // ✅ Preserve query parameters
	const fullPath = params.path.replace(/^\/+/, ''); // ✅ Remove leading '/'
	const apiUrl = `${PUBLIC_STRAPI_API_URL}/api/${fullPath}${queryString}`; // ✅ Append query params

	console.log('🔗__API URL:', apiUrl);

	try {
		// Extract headers from the incoming request
		const headers = {
			Authorization: `Bearer ${STRAPI_API_TOKEN}`,
			'Content-Type': 'application/json',
			...Object.fromEntries(request.headers)
		};

		// Read request body if applicable
		const body = method !== 'GET' ? await request.json() : undefined;

		// Send request using Axios
		const response = await axios({
			method,
			url: apiUrl,
			headers,
			data: body
		});

		// Return the response from Strapi
		return json(response.data, { status: response.status });
	} catch (err) {
		console.error('[ERROR]:', err);

		// ✅ Handle Axios errors and return Strapi's exact error
		if (axios.isAxiosError(err)) {
			const status = err.response?.status || 500;
			const errorData = err.response?.data || { message: 'Unknown error from Strapi' };

			throw error(status, {
				message: errorData.message || 'Strapi Error',
				details: errorData
			});
		}

		// ✅ Default fallback error
		throw error(500, { message: 'Internal Server Error', details: String(err) });
	}
}

// ✅ Handle different HTTP methods using Axios
export const GET: RequestHandler = async (event) =>
	proxyToStrapi('GET', event.params, event.url, event.request);
export const POST: RequestHandler = async (event) =>
	proxyToStrapi('POST', event.params, event.url, event.request);
export const PUT: RequestHandler = async (event) =>
	proxyToStrapi('PUT', event.params, event.url, event.request);
export const DELETE: RequestHandler = async (event) =>
	proxyToStrapi('DELETE', event.params, event.url, event.request);
export const PATCH: RequestHandler = async (event) =>
	proxyToStrapi('PATCH', event.params, event.url, event.request);
