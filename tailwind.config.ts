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
			/*colors: {
				background: {
					light: '#f3f4f6',
					dark: '#111827'
				},
				link: {
					light: '#2793CE',
					active: '#215B88',
					dark: '#FFFFFF'
				},
				title: {
					light: '#2793CE',
					dark: '#FFFFFF'
				},
				subtitle: {
					light: '#75B8DC',
					dark: '#C8DEE9'
				},
				productTitle: {
					light: '#2793CE',
					dark: '#FFFFFF'
				},
				productTitle2: {
					light: '#B8CFEC',
					dark: '#5C6A7D'
				},
				productTitle3: {
					light: '#B2C1CA',
					dark: '#9BDAFF'
				},
				text: {
					light: '#CECECE',
					dark: '#CECECE'
				},
				formula: {
					title: '#3D5A20',
					subtitle: '#7B965F'
				},
				form: {
					bg: '#F6F6F6',
					border: '#C7D2D7',
					text: '#8FA1AB',
					bgDark: '#2D3434',
					borderDark: '#50595F',
					textDark: '8FA1AB'
				}
			},
			fontSize: {
				landing: '55px',
				'title-1': '45px',
				'title-2': '24px',
				'product-title-1': '18px',
				'product-title-2': '14px',
				'product-title-3': '14px',
				'product-detail-1': '36px',
				'product-detail-2': '20px',
				'product-detail-3': '20px',
				'product-price': '42px',
				'course-title-1': '28px',
				'course-title-2': '20px',
				'course-title-3': '20px',
				'form-title': '16px'
			},*/

			colors: {
				primary: {
					light: '#2793CE',
					dark: '#FFFFFF', // Adapted for dark mode
					active: '#215B88'
				},
				secondary: {
					light: '#75B8DC',
					dark: '#C8DEE9' // Adapted for dark mode
				},
				tertiary: {
					light: '#B8CFEC',
					dark: '#5C6A7D' // Adapted for dark mode
				},
				quartiary: {
					light: '#C7D2D7',
					dark: '#9BDAFF' // Adapted for dark mode
				},
				background: {
					light: '#F6F6F6',
					dark: '#26282B'
				},
				form: {
					dark: '#2D3434'
				},
				text: {
					light: '#708590',
					soft: '#CECECE',
					dark: '#CECECE'
				},
				landing: {
					blue: '#0a4760'
				}
			},
			fontSize: {
				base: '16px',
				mid: '18px',
				lg: '24px',
				xl: '45px',
				xxl: '55px',
				productxl: '36px',
				productlg: '22px',
				producttext: '18px',
				productsm: '14px'
			}
		}
	},

	plugins: [forms]
} satisfies Config;
