<script lang="ts">
	import { goto } from '$app/navigation';
	import { cart, removeFromCart } from '$lib/stores/cart.js';
	import { onMount } from 'svelte';
	import { getCoursesByIds } from '$lib/api/api.js';
	import type { Course, ApiResponse } from '$lib/api/types.ts';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import { PUBLIC_STRAPI_API_URL } from '$env/static/public';
	import Button from '$lib/components/Button.svelte';
	import IconClose from '$lib/icons/IconClose.svelte';
	import { createOrder, captureOrder } from '$lib/api/api';

	import { user } from '$lib/stores/user';
	import PaymentOption from '$lib/components/PaymentOption.svelte';
	import PayPalButton from '$lib/components/PayPalButton.svelte';

	let IMAGE_BASE = PUBLIC_STRAPI_API_URL;
	let courses: ApiResponse<Course[]> | undefined = $state(undefined);

	let currentUser = $state($user);

	$effect(() => {
		user.subscribe((value) => {
			currentUser = value;
		});
	});

	let totalPrice = $derived.by(() => {
		let total = 0;
		courses?.data.forEach((course) => {
			total += course.price;
		});
		return total;
	});

	onMount(() => {
		if ($cart.items.length === 0) return;
		getCoursesByIds($cart.items).then((data) => {
			courses = data;
		});
	});

	const goBack = () => {
		goto('/cart/overview'); // Navigate back to course list
	};

	/**
	 * Payment
	 */

	/*
	const handlePaypalPayment = async () => {
		let cartIds = $cart.items;

		if (cartIds.length === 0) return;
		console.log('Paypal Payment');

		try {
			//debugger;
			// Step 1: Create Order
			const orderResponse = await createOrder(cartIds);
			const orderId = orderResponse.id;

			// Step 2: Find the approval URL
			const approvalUrl = orderResponse.links.find((link) => link.rel === 'approve')?.href;

			// Step 3: Open a mini PayPal popup
			const width = 600,
				height = 700;
			const left = (window.innerWidth - width) / 2;
			const top = (window.innerHeight - height) / 2;

			const paypalWindow = window.open(
				approvalUrl,
				'PayPal Checkout',
				`width=${width},height=${height},top=${top},left=${left}`
			);

			// Step 4: Detect when the popup window closes
			const checkPopupClosed = setInterval(async () => {
				if (paypalWindow?.closed) {
					clearInterval(checkPopupClosed);
					// After closing, check if the order was approved
					_capturePaypalOrder(orderId);
				}
			}, 500);
		} catch (err) {
			console.error('PayPal Payment error:', err);
			alert('Payment failed!');
		}
	};

	const _capturePaypalOrder = async (orderId: string) => {
		const captureResponse = await captureOrder(orderId);
		debugger;
		alert('Payment Successful!');
	};
	*/

	const _createOrder = async () => {
		console.log('Paypal Payment');
		let cartIds = $cart.items;
		if (cartIds.length === 0) return;

		// Step 1: Create Order
		const orderResponse = await createOrder(cartIds);
		const orderId = orderResponse.id;

		return orderId;
	};
	const _onApprove = async (data: paypal.ApproveData) => {
		let orderId = data.orderID;

		const captureResponse = await captureOrder(orderId);

		alert('Payment Successful!');
	};
	const _onError = (err: any) => {
		console.log('ERRR', err);
	};
</script>

<div class="">
	<button onclick={goBack} class="dark:text-grey-0 flex items-center text-blue-500 hover:underline">
		<!-- Back Arrow Icon -->
		<svg
			class="mr-2 h-5 w-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
			></path>
		</svg>
		Volver al resumen
	</button>
</div>

<div class="mb-10">
	<h1 class="dark:text-grey-0 mb-2 mt-4 text-xl font-extrabold text-blue-500">
		Resumen del Pedido
	</h1>
	<h2 class="text-productbase mb-8 font-bold italic text-blue-400 dark:text-blue-100 lg:text-lg">
		{$cart.items.length} articulos
	</h2>
</div>

{#if courses && courses.data.length > 0}
	{#each courses.data as course}
		<div
			class="mb-4 grid grid-cols-1 items-start gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[120px,1fr,1fr]"
		>
			<div class="dark:bg-grey-900 overflow-hidden group-hover:opacity-80">
				{#if course.videoPreview?.url}
					<ImageDisplay
						src={IMAGE_BASE + course.videoPreview?.url}
						alt={course.title}
						classes={'rounded-lg shadow-md'}
					></ImageDisplay>
				{:else}
					<div class="flex h-40 w-full items-center justify-center bg-gray-300">
						<p class="text-gray-500">No Image Available</p>
					</div>
				{/if}
			</div>
			<div class="ml-4">
				<h2 class="dark:text-grey-0 mb-1 font-semibold text-blue-500">{course.title}</h2>
				<p class="text-grey-300 font-normal">{course.category}</p>
			</div>
			<div class="text-right">
				<p class="mt-1 text-base font-medium text-green-300 dark:text-green-100">
					$ {course.price}
				</p>
			</div>
		</div>
	{/each}

	<div
		class="bg-grey-50 dark:bg-grey-900 text-productlg mb-10 flex h-[50px] items-center justify-center rounded-md"
	>
		<div class="flex">
			<div class="mr-2 font-semibold text-blue-500 dark:text-white">Total:</div>
			<div class="font-semibold text-green-300 dark:text-green-100">
				$ {totalPrice}
			</div>
		</div>
	</div>

	<div class="mb-8 flex justify-between">
		<div>
			<h2
				class="text-productbase mb-4 font-bold italic text-blue-500 dark:text-blue-100 lg:text-lg"
			>
				Informacion de Usario
			</h2>

			{#if currentUser}
				<div class="text-grey-300">
					<p>{currentUser.username}</p>
					<p>{currentUser.email}</p>
				</div>
			{/if}
		</div>
		<div class="ml-20 w-[400px]">
			<h2
				class="text-productbase mb-4 font-bold italic text-blue-500 dark:text-blue-100 lg:text-lg"
			>
				Opcion de Pago
			</h2>

			<PaymentOption active={true} controlled={true}></PaymentOption>
		</div>
	</div>

	<div class=" flex h-[40px] items-center justify-center">
		<div class="ml-4">
			<!-- <Button onclick={handlePaypalPayment}>Pagar</Button> -->
		</div>
	</div>

	<div class="flex items-center justify-center">
		<div class="w-[300px]">
			<PayPalButton createOrder={_createOrder} onApprove={_onApprove} onError={_onError}
			></PayPalButton>
		</div>
	</div>
{:else}
	<p class="text-red-500">No hay cursos en el carrito</p>
{/if}
