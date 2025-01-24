import type { PageLoad } from './$types';
import { getProduct } from '$lib/api/api';

export const load: PageLoad = async ({ params, fetch }) => {
	const { productId } = params;

	let product;
	let error;

	try {
		product = await getProduct(productId);
	} catch (err: any) {
		error = err.message;
	}
	return {
		product: product,
		error: error,
		productId: productId
	};
};
