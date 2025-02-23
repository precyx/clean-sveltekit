import { writable } from 'svelte/store';
import type { Cart } from '$lib/api/types.ts';

export const cart = writable<Cart | null>(null);
