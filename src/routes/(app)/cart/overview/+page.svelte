<script lang="ts">
	import { goto } from '$app/navigation';
	import { cart, removeFromCart } from '$lib/stores/cart.js';
	import { onMount } from 'svelte';
	import { getCoursesByIds } from '$lib/api/api.js';
	import type { Course, ApiResponse } from '$lib/api/types.ts';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconClose from '$lib/icons/IconClose.svelte';

	import { user } from '$lib/stores/user';
	import PaymentOption from '$lib/components/PaymentOption.svelte';

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

	/**
	 * Payment
	 */

	let paypalActive: boolean = $state(false);
</script>

<div class="mb-4 lg:mb-6">
	<h1 class="dark:text-grey-0 mt-4 text-lg font-extrabold text-blue-500 lg:text-xl">
		Carrito de compras
	</h1>
	<h2 class="text-productbase mb-4 font-bold italic text-blue-400 dark:text-blue-100 lg:text-lg">
		{$cart.items.length} articulos
	</h2>
</div>

{#if courses && courses.data.length > 0}
	{#each courses.data as course}
		<div
			class="mb-4 grid grid-cols-1 items-start gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[200px,1fr,1fr,1fr]"
		>
			<a
				class="dark:bg-grey-900 overflow-hidden group-hover:opacity-80"
				href={'/courses/' + course.documentId}
			>
				<ImageDisplay
					provider={course.videoPreview?.provider}
					src={course.videoPreview?.url}
					alt={course.title}
					classes={'rounded-lg shadow-md inset-0 w-full object-cover'}
				></ImageDisplay>
			</a>
			<a class="ml-4" href={'/courses/' + course.documentId}>
				<h2 class="dark:text-grey-0 mb-1 font-semibold text-blue-500">{course.title}</h2>
				<p class="text-grey-300 font-normal">{course.category}</p>
			</a>
			<a class="text-right" href={'/courses/' + course.documentId}>
				<p class="mt-1 text-base font-medium text-green-300 dark:text-green-100">
					$ {course.price}
				</p>
			</a>
			<div class="flex justify-end">
				<button
					class="ml-4 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-500 bg-opacity-15"
					onclick={() => removeCartItem(course.documentId)}
				>
					<IconClose classes="text-blue-500 dark:text-white w-5 h-5"></IconClose>
				</button>
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

	<div class="mb-8">
		<h2 class="text-productbase mb-4 font-bold italic text-blue-500 dark:text-blue-100 lg:text-lg">
			Informacion de Usario
		</h2>

		{#if currentUser}
			<div class="text-grey-300">
				<p>{currentUser.username}</p>
				<p>{currentUser.email}</p>
			</div>
		{/if}
	</div>

	<div class="mb-8">
		<h2 class="text-productbase mb-4 font-bold italic text-blue-500 dark:text-blue-100 lg:text-lg">
			Opcion de Pago
		</h2>

		<PaymentOption bind:active={paypalActive}></PaymentOption>
	</div>

	<div class="mb-12 mt-12 flex h-[40px] items-center justify-center">
		<div class="ml-4">
			<Button
				disabled={!paypalActive}
				onclick={() => {
					goto('/cart/checkout');
				}}>Continuar a pagar</Button
			>
		</div>
	</div>
{:else}
	<p class="text-red-500">No hay cursos en el carrito</p>
{/if}
