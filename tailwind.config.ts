import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',  // Enables dark mode using a class

	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
		  colors: {
			primary: {
			  light: '#4f46e5',
			  dark: '#818cf8'
			},
			background: {
			  light: '#f3f4f6',
			  dark: '#111827'
			},
			text: {
			  light: '#1f2937',
			  dark: '#e5e7eb'
			}
		  }
		}
	  },

	plugins: [forms]
} satisfies Config;
