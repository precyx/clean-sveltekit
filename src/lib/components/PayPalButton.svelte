<script lang="ts">
	import { onMount } from 'svelte';

	import { paypal } from '$lib/stores/paypal';
	import type { PayPalNamespace, CreateOrderData, OnApproveData } from '@paypal/paypal-js';
	import { sleep } from '$lib/utils/Utils';

	// Props for the component
	export let createOrder: () => Promise<string>;
	export let onApprove: (data: OnApproveData) => Promise<void>;
	export let onError: (error: unknown) => void;
	export let onCancel: (data: Record<string, unknown>) => void;

	onMount(() => {
		checkPaypal();
	});

	const checkPaypal = async () => {
		for (let i = 0; i < 5; i++) {
			if (renderPayPalButton()) return;
			await sleep(1000);
		}
	};

	// Function to render the PayPal button
	function renderPayPalButton() {
		if (!$paypal || !$paypal.Buttons) {
			console.error('PayPal SDK not loaded.');
			return false;
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

		return true;
	}
</script>

<div id="paypal-button" class="w-full"></div>
