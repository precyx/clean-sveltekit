import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedTheme = browser ? localStorage.getItem('theme') || 'light' : 'light';
export const theme = writable<string>(storedTheme);

theme.subscribe((value) => {
	if (browser) {
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', value);
			document.documentElement.classList.toggle('dark', value === 'dark');
		}
	}
});
