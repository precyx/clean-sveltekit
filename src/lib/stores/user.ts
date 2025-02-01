import { writable } from 'svelte/store';
import type { User } from '$lib/api/types.ts';

export const user = writable<User | null>(null);
