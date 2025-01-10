import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { getProducts } from '$lib/api/api';

export const load = async () => {
	let products;
	let error;

	try {
		products = await getProducts();
	} catch (err: any) {
		error = err.message;
	}
	return {
		products: products,
		error: error
	};
};
