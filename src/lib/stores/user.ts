import { writable } from 'svelte/store';
import type { User } from '$lib/api/api';

export const user = writable<User | null>(null);