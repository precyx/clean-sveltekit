<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { captureOrder, createOrder } from '$lib/api/api';

	let paypalLoaded = false;

	onMount(() => {
		setTimeout(() => {
			renderPayPalButton();
		}, 200); // use timeout for waiting for the paypal script to load
	});

	function renderPayPalButton() {
		paypal
			.Buttons({
				createOrder: async () => {
					const response = await createOrder('10');
					return response.id;
				},
				onApprove: async (data) => {
					console.log('on approve data', data);
					const response = await captureOrder(data.orderID);
					alert('Payment Successful!');
				},
				onError: (err) => {
					console.error('PayPal Checkout error', err);
					alert('Payment failed!');
				}
			})
			.render('#paypal-button');
	}
</script>

<div id="paypal-button"></div>
