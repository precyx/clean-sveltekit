<script lang="ts">
	import { onMount } from 'svelte';
	//import { createOrder, captureOrder } from '$lib/api/api';

	import { paypal } from '$lib/stores/paypal';
	import type { PayPalNamespace, CreateOrderData, OnApproveData } from '@paypal/paypal-js';

	// Props for the component
	export let createOrder: () => Promise<string>;
	export let onApprove: (data: OnApproveData) => Promise<void>;
	export let onError: (error: unknown) => void;
	export let onCancel: (data: Record<string, unknown>) => void;

	onMount(() => {
		setTimeout(async () => {
			renderPayPalButton();
		}, 200); // Delay to ensure the PayPal SDK is fully loaded
	});

	// Function to render the PayPal button
	function renderPayPalButton() {
		if (!$paypal || !$paypal.Buttons) {
			console.error('PayPal SDK not loaded.');
			return;
		}

		$paypal
			.Buttons({
				createOrder: async (data: CreateOrderData) => {
					return createOrder();
				},
				onApprove: async (data: OnApproveData) => {
					onApprove(data);
				},
				onCancel: (data: Record<string, unknown>) => {
					onCancel(data);
				},
				onError: (err: Record<string, unknown>) => {
					onError(err);
				}
			})
			.render('#paypal-button');
	}
</script>

<div id="paypal-button"></div>
