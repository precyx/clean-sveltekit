import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class', // Enables dark mode using a class

	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				raleway: ['Raleway', 'sans-serif'] // Add Raleway font
			},
			colors: {
				grey: {
					1000: '#26282B',
					900: '#2D3434',
					700: '#50595F',
					500: '#6F767F',
					300: '#B2C1CA',
					200: '#C7D2D7',
					100: '#CECECE',
					50: '#F6F6F6',
					0: '#FFFFFF'
				},
				blue: {
					600: '#0A4760',
					500: '#2793CE',
					400: '#75B8DC',
					300: '#9BDAFF',
					200: '#B8CFEC',
					100: '#C8DEE9'
				},
				green: {
					600: '#3D5A20',
					400: '#7B965F',
					300: '#7CA340',
					200: '#8FC04B',
					100: '#CDEB9F'
				}
			},
			fontSize: {
				xxl: '55px',
				xl: '45px',
				lg: '26px',
				base: '16px',
				productxl: '30px',
				productlg: '22px',
				productbase: '18px',
				productsm: '14px',
				productxs: '12px'
			}

			/**
			 * primary-light
			 * blue-500
			 *
			 * primary-dark
			 * grey-50
			 *
			 * secondary-light
			 * blue-400
			 *
			 * secondary-dark
			 * blue-100
			 *
			 * tertiary-light
			 * blue-200
			 *
			 * tertiary-dark
			 * blue-300
			 *
			 * quartiary-light
			 * grey-300
			 *
			 * quartiary-dark
			 * grey-200
			 *
			 * background-light
			 * grey-200
			 *
			 * background-dark
			 * grey-1000
			 *
			 * text-light
			 * grey-300
			 *
			 * text-dark
			 * grey-100
			 *
			 * landing-blue
			 * blue-600
			 *
			 * price-light
			 * green-300
			 *
			 * price-dark
			 * green-100
			 */
		}
	},

	plugins: [forms]
} satisfies Config;
