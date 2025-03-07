<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getCoursesByIds, getCart, deleteCart } from '$lib/api/api.js';
	import type { Course, ApiResponse } from '$lib/api/types.ts';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconClose from '$lib/icons/IconClose.svelte';
	import IconArrow from '$lib/icons/IconArrow.svelte';

	import { user } from '$lib/stores/user';
	import { paymentOption as paymentOptionStore } from '$lib/stores/paymentOption';
	import PaymentOption from '$lib/components/PaymentOption.svelte';
	import { on } from 'svelte/events';
	import Spinner from '$lib/components/Spinner.svelte';
	import { sleep } from '$lib/utils/Utils';

	let data_loading: boolean = $state(false);
	let data_error: string = $state('');
	let loading_deleteCartItem: boolean = $state(false);

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

	onMount(async () => {
		// load cart
		try {
			data_loading = true;
			let cartData = await getCart();
			let cartItems = cartData.courses.map((course: any) => course.documentId);

			if (cartItems.length === 0) {
				data_error = 'No hay articulos en el carrito';
				return;
			}

			// load courses
			let coursesByIds = await getCoursesByIds(cartItems);
			courses = coursesByIds;
		} catch (err: any) {
			data_error = err.message;
		} finally {
			data_loading = false;
		}
	});

	const removeCartItem = async (documentId: string) => {
		// update cart store
		loading_deleteCartItem = true;
		await sleep(50);
		await deleteCart(documentId);
		loading_deleteCartItem = false;
		// update courses
		if (!courses) return;
		courses = {
			data: courses.data.filter((course) => course.documentId !== documentId),
			meta: courses.meta
		};
	};

	/**
	 * Payment
	 */

	let _paypmentOptions = [
		{
			name: 'paypal',
			img: '/img/paypal-logo.png',
			imgDark: '/img/paypal-logo-white.png'
		},
		{
			name: 'pago-movil',
			img: '/img/pago-movil.svg',
			imgDark: '/img/pago-movil-dark.svg'
		}
	];

	let selectedPaymentOption: string = $state('');

	const selectPaymentOption = (_option: string) => {
		selectedPaymentOption = _option;
		paymentOptionStore.set(_option);
	};
</script>

<div class="mb-4 lg:mb-6">
	<h1 class="mt-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
		Carrito de compras
	</h1>
	<h2 class="mb-4 text-productbase font-bold italic text-blue-400 dark:text-blue-100 lg:text-lg">
		{courses?.data?.length} articulos
	</h2>
</div>

{#if data_error}
	<p class="text-red-500">{data_error}</p>
{:else if data_loading}
	<div class="flex items-center justify-center">
		<Spinner classes="border-blue-500 dark:border-grey-0" size="24px"></Spinner>
	</div>
{:else if courses && courses.data.length > 0}
	{#each courses.data as course}
		<div
			class="relative mb-4 grid grid-cols-[100px,1fr,50px] items-start gap-2 border-b border-blue-100 pb-4 dark:border-grey-900 md:grid-cols-[100px,1fr,50px,50px] lg:grid-cols-[200px,1fr,1fr,1fr]"
			class:opacity-50={loading_deleteCartItem}
			class:pointer-events-none={loading_deleteCartItem}
		>
			<a
				class="overflow-hidden group-hover:opacity-80 dark:bg-grey-900"
				href={'/courses/' + course.documentId}
			>
				<ImageDisplay
					provider={course.videoPreview?.provider}
					src={course.videoPreview?.url}
					alt={course.title}
					classes={'rounded-lg shadow-md inset-0 w-full object-cover'}
				></ImageDisplay>
			</a>
			<a class="ml-2 sm:ml-4" href={'/courses/' + course.documentId}>
				<h2 class="mb-1 font-semibold text-blue-500 dark:text-grey-0">{course.title}</h2>
				<p class="font-normal text-grey-300">{course.category}</p>
				<p class="hidden text-right md:block"></p>
			</a>
			<a class="text-right" href={'/courses/' + course.documentId}>
				<p class="mt-1 text-base font-medium text-green-300 dark:text-green-100">
					$ {course.price}
				</p>
			</a>
			<div class="absolute bottom-2 right-0 flex justify-end md:relative md:bottom-0 md:right-0">
				<button
					class="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-500 bg-opacity-5"
					class:pointer-events-none={loading_deleteCartItem}
					onclick={() => removeCartItem(course.documentId)}
				>
					{#if loading_deleteCartItem}
						<Spinner
							classes={'relative left-[4px] top-[0px] border-blue-500 dark:border-grey-0'}
							size="16px"
						/>
					{:else}
						<IconClose classes="text-blue-500 dark:text-white w-5 h-5"></IconClose>
					{/if}
				</button>
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

	<div class="mb-8">
		<h2 class="mb-4 text-productbase font-bold italic text-blue-500 dark:text-blue-100 lg:text-lg">
			Informacion de Usario
		</h2>

		{#if currentUser}
			<div class="text-grey-300">
				<p>{currentUser?.user?.username}</p>
				<p>{currentUser?.user?.email}</p>
			</div>
		{/if}
	</div>

	<div class="mb-8">
		<h2 class="mb-4 text-productbase font-bold italic text-blue-500 dark:text-blue-100 lg:text-lg">
			Opcion de Pago
		</h2>

		{#each _paypmentOptions as option}
			<PaymentOption
				active={selectedPaymentOption === option.name}
				controlled={false}
				img={option.img}
				imgDark={option.imgDark}
				onClick={() => {
					selectPaymentOption(option.name);
				}}
			></PaymentOption>
		{/each}
	</div>

	<div class="mb-12 mt-12 flex h-[40px] items-center justify-center">
		<div class="ml-4">
			<Button
				disabled={selectedPaymentOption == ''}
				onclick={() => {
					goto('/cart/checkout');
				}}
				>Continuar a pagar
				<IconArrow direction="right" classes="ml-2"></IconArrow>
			</Button>
		</div>
	</div>
{/if}
