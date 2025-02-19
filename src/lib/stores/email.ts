import { writable } from 'svelte/store';
import type { EmailStore } from '$lib/api/types.ts';

export const email = writable<EmailStore | null>(null);
