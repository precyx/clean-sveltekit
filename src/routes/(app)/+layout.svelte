<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../../app.postcss';

	import { loadScript } from '@paypal/paypal-js';
	import type { PayPalNamespace, PayPalScriptOptions } from '@paypal/paypal-js';

	import { paypal } from '$lib/stores/paypal';
	import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';
	import { onMount } from 'svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	onMount(async () => {
		// Load PayPal
		const _paypal: PayPalNamespace | null = await loadScript({
			clientId: PUBLIC_PAYPAL_CLIENT_ID,
			environment: 'sandbox',
			sdkBaseUrl: `https://www.paypal.com/sdk/js`
		});

		paypal.set(_paypal);

		// Inject Vercel Insights
		injectSpeedInsights();
	});
</script>

<Header customClasses="dark:bg-grey-1000 bg-white" />
<main class="mx-auto mt-0 w-full max-w-5xl flex-1 flex-grow px-5 lg:mt-12">
	<slot />
</main>
<Footer></Footer>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,800,700,600&display=swap"
		rel="stylesheet"
	/>

	<style>
		html,
		body {
			@apply dark:bg-grey-1000 flex min-h-screen flex-col bg-white font-raleway;
			button {
				touch-action: manipulation;
			}
		}
	</style>
</svelte:head>
