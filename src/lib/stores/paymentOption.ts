import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedPaymentOption = browser ? localStorage.getItem('paymentOption') || '' : '';
export const paymentOption = writable<string>(storedPaymentOption);

paymentOption.subscribe((value: string) => {
	if (browser) {
		localStorage.setItem('paymentOption', value);
	}
});
