<script lang="ts">
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cart.js';
	import { onMount } from 'svelte';
	import { getCoursesByIds, getCart, createOrder, captureOrder } from '$lib/api/api.js';
	import type { Course, ApiResponse } from '$lib/api/types.ts';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import ArrowIcon from '$lib/icons/IconArrow.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconClose from '$lib/icons/IconClose.svelte';

	import type { CreateOrderData, OnApproveData } from '@paypal/paypal-js';
	import type { ServiceError } from '$lib/api/types';
	import { user } from '$lib/stores/user';
	import PaymentOption from '$lib/components/PaymentOption.svelte';
	import PayPalButton from '$lib/components/PayPalButton.svelte';
	import { sleep } from '$lib/utils/Utils';

	let courses: ApiResponse<Course[]> | undefined = $state(undefined);

	let data_loading: boolean = $state(false);
	let data_error: string = $state('');
	let loading: boolean = $state(false);
	let error: string = $state('');

	/**
	 * User
	 */

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

	onMount(async () => {
		// load cart
		let cartData = await getCart();
		let cartItems = cartData.courses.map((course: any) => course.documentId);

		if (cartItems.length === 0) {
			data_error = 'No hay articulos en el carrito';
			return;
		}

		// load courses
		getCoursesByIds(cartItems).then((data) => {
			courses = data;
		});
	});

	const goBack = () => {
		goto('/cart/overview'); // Navigate back to course list
	};

	/**
	 * Payment
	 */

	const _createOrder = async () => {
		try {
			loading = true;

			console.log('Paypal Payment');
			let cartIds: string[] = $cart?.courses.map((course: any) => course.documentId) || [];
			if (cartIds.length === 0) return;

			// Step 1: Create Order
			const orderResponse = await createOrder(cartIds);
			const orderId = orderResponse.id;

			return orderId;
		} catch (err) {
			console.log('🤖🤖🤖 CREATE ORDER ERROR 2', err.message);
			loading = false;
			error = err.message;
		}
	};
	const _onApprove = async (data: OnApproveData) => {
		try {
			let orderId = data.orderID;
			const captureResponse = await captureOrder(orderId);

			await sleep(1000);
			loading = false;
			goto(`/cart/success?orderId=${orderId}`);
		} catch (err) {
			console.log('🤖🤖🤖 APPROVE ORDER ERROR 2', error.message);
			loading = false;
			error = err.message;
		}
	};
	const _onCancel = (data: Record<string, unknown>) => {
		console.log('CANCEL', data);
		loading = false;
	};
	const _onError = (err: any) => {
		console.log('ERRR', err);
		loading = false;

		// show paypal error, if there is no api error
		if (!error) {
			error = err.message;
		}
	};
</script>

<div class="text-productsm lg:text-base">
	<button onclick={goBack} class="flex items-center text-blue-500 hover:underline dark:text-grey-0">
		<!-- Back Arrow Icon -->
		<ArrowIcon direction="left" classes="text-blue-200 dark:text-grey-500 mr-2" />
		<div class="text-blue-500 dark:text-blue-300">Volver al resumen</div>
	</button>
</div>

<div class="mb-4 lg:mb-6">
	<h1 class="text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
		Resumen del Pedido
	</h1>
	<h2 class="mb-4 text-productbase font-bold italic text-blue-400 dark:text-blue-100 lg:text-lg">
		{$cart?.courses?.length} articulos
	</h2>
</div>

{#if courses && courses.data.length > 0}
	{#each courses.data as course}
		<div
			class="relative mb-4 grid grid-cols-[100px,1fr,50px] items-start gap-2 border-b border-blue-100 pb-4 dark:border-grey-900 md:grid-cols-[100px,1fr,50px] lg:grid-cols-[200px,1fr,1fr]"
		>
			<div class="overflow-hidden group-hover:opacity-80 dark:bg-grey-900">
				<ImageDisplay
					provider={course.videoPreview?.provider}
					src={course.videoPreview?.url}
					alt={course.title}
					classes={'rounded-lg shadow-md inset-0 w-full object-cover'}
				></ImageDisplay>
			</div>
			<div class="ml-2 sm:ml-4">
				<h2 class="mb-1 font-semibold text-blue-500 dark:text-grey-0">{course.title}</h2>
				<p class="font-normal text-grey-300">{course.category}</p>
				<p class="hidden text-right md:block"></p>
			</div>
			<div class="text-right">
				<p class="mt-1 text-base font-medium text-green-300 dark:text-green-100">
					$ {course.price}
				</p>
			</div>
		</div>
	{/each}

	<div
		class="mb-10 flex h-[50px] items-center justify-center rounded-md bg-grey-50 text-productlg dark:bg-grey-900"
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
				class="mb-4 text-productbase font-bold italic text-blue-500 dark:text-blue-100 lg:text-lg"
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
				class="mb-4 text-productbase font-bold italic text-blue-500 dark:text-blue-100 lg:text-lg"
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

	<div
		class="flex items-center justify-center"
		class:pointer-events-none={loading}
		class:opacity-50={loading}
	>
		<div class="w-[300px]">
			<PayPalButton
				createOrder={_createOrder}
				onApprove={_onApprove}
				onError={_onError}
				onCancel={_onCancel}
			></PayPalButton>
		</div>
	</div>
	{#if error}
		<div class="text-red-500">{error}</div>
	{/if}
{:else}
	<p class="text-red-500">{data_error}</p>
{/if}
