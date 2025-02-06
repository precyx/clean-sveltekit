import { writable } from 'svelte/store';
import type { Cart } from '$lib/api/types.ts';

export const cart = writable<Cart>(getStoredCart()); // { items: [] }

function getStoredCart() {
	if (typeof localStorage !== 'undefined') {
		const stored = localStorage.getItem('cart');
		return stored ? JSON.parse(stored) : { items: [] };
	}
	return { items: [] };
}

// Subscribe to store updates and save to localStorage
cart.subscribe((cartData) => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('cart', JSON.stringify(cartData));
	}
});

export const addToCart = (documentId: string) => {
	cart.update((data) => {
		const updatedItems = new Set([...(data?.items || []), documentId]);
		return { items: Array.from(updatedItems) }; // Convert Set back to array
	});
};

export const removeFromCart = (documentId: string) => {
	cart.update((data) => {
		const updatedItems = data.items.filter((item) => item !== documentId);
		return { items: updatedItems };
	});
};
