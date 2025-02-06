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

	import { user } from '$lib/stores/user';
	import PaymentOption from '$lib/components/PaymentOption.svelte';

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

	const removeCartItem = (documentId: string) => {
		// update cart store
		removeFromCart(documentId);
		// update courses
		if (!courses) return;
		courses = {
			data: courses.data.filter((course) => course.documentId !== documentId),
			meta: courses.meta
		};
	};

	const goBack = () => {
		goto('/cart/overview'); // Navigate back to course list
	};

	/**
	 * Payment
	 */

	let paypalActive: boolean = $state(false);
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

	<div class="mb-8"></div>

	<div class="mb-12 mt-12 flex h-[40px] items-center justify-center">
		<div class="ml-4">
			<Button>Pagar</Button>
		</div>
	</div>
{:else}
	<p class="text-red-500">No hay cursos en el carrito</p>
{/if}
