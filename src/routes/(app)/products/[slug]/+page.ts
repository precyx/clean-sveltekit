import type { PageLoad } from './$types';
import { getProduct } from '$lib/api/api';

export const load: PageLoad = async ({ params, fetch }) => {
	const { slug } = params;

	let product;
	let error;

	try {
		product = await getProduct(slug);
	} catch (err: any) {
		error = err.message;
	}
	return {
		product: product,
		error: error,
		slug: slug
	};
};
