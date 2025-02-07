<script lang="ts">
	import { onMount } from 'svelte';
	//import { createOrder, captureOrder } from '$lib/api/api';

	// Props for the component
	export let createOrder: () => Promise<string>;
	export let onApprove: (data: paypal.ApproveData) => Promise<void>;
	export let onError: (error: any) => void;

	onMount(() => {
		setTimeout(() => {
			renderPayPalButton();
		}, 200); // Delay to ensure the PayPal SDK is fully loaded
	});

	// Function to render the PayPal button
	function renderPayPalButton() {
		if (!paypal) {
			console.error('PayPal SDK not loaded.');
			return;
		}

		paypal
			.Buttons({
				createOrder: async (data: any, actions: paypal.Actions) => {
					return createOrder();
				},
				onApprove: async (data: paypal.ApproveData) => {
					onApprove(data);
				},
				onError: (err) => {
					onError(err);
				}
			})
			.render('#paypal-button');
	}
</script>

<div id="paypal-button"></div>
