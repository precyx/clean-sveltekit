<script lang="ts">
	import { user } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import type { User } from '$lib/api/types';
	import { goto } from '$app/navigation';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import { getUser, getOrdersByUser } from '$lib/api/api';
	import type { Order } from '$lib/api/types';
	import { formatDate, sleep } from '$lib/utils/Utils';
	import Spinner from '$lib/components/Spinner.svelte';

	type Country = {
		name: string;
		code: string;
	};

	let error: string = $state('');

	let currentUser: User | null = $state(null);
	let country: Country | null = $state(null);

	// order
	let orders: Order[] = $state([]);
	let ordersLoading = $state(false);
	let ordersError: string = $state('');

	onMount(async () => {
		let loginToken = localStorage.getItem('loginToken');

		if (!loginToken) {
			goto('/login');
			return;
		}

		try {
			// get user
			currentUser = await getUser();

			let response = await fetch('/data/country.json');
			let _countries: Country[] = await response.json();

			country = _countries.find((c) => c.code === currentUser?.country) || null;

			// get orders
			ordersLoading = true;
			orders = await getOrdersByUser();
			ordersLoading = false;

			if (orders.length == 0) {
				ordersError = 'No hay pedidos';
			}

			console.log('🐸 Orders', orders);
		} catch (err: any) {
			error = err.message;
		}

		/*
		user.subscribe(async (_user) => {
			console.log('Profile - USER', $user);
			if (_user.status === 'error') {
				goto('/login');
			}
			if (_user.user == null) return;
			

			currentUser = _user.user;

			let response = await fetch('/data/country.json');
			let _countries: Country[] = await response.json();

			country = _countries.find((c) => c.code === $user?.user?.country) || null;
		});
		*/
	});
</script>

<h1 class="mb-2 mt-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">Perfil</h1>

<div class="text-base">
	{#if $user.status == 'set'}
		<div class="mb-4 flex flex-col sm:mb-1 sm:flex-row">
			<div class="w-[300px] text-grey-300">Nombre:</div>
			<div class="text-blue-500 dark:text-white">
				{currentUser?.username}
			</div>
		</div>

		<div class="mb-4 flex flex-col sm:mb-1 sm:flex-row">
			<div class="w-[300px] text-grey-300">Correo electrónico:</div>
			<div class="text-blue-500 dark:text-white">
				{currentUser?.email}
			</div>
		</div>

		<div class="mb-4 flex flex-col sm:mb-1 sm:flex-row">
			<div class="w-[300px] text-grey-300">Pais:</div>
			<div class="flex items-center text-blue-500 dark:text-white">
				{#if country}
					<div class="mr-2">
						<img
							class="w-[24px] rounded-sm"
							alt={country?.name}
							src={`img/flags/4x3/${country?.code}.svg`}
						/>
					</div>
					<span>
						{country?.name || '-'}
					</span>
				{:else}
					<span>-</span>
				{/if}
			</div>
		</div>

		<div class="mb-4 flex flex-col sm:mb-1 sm:flex-row">
			<div class="w-[300px] text-grey-300">Telefono:</div>
			<div class="text-blue-500 dark:text-white">
				{currentUser?.phone || '-'}
			</div>
		</div>

		<div class="mb-4 flex flex-col sm:mb-1 sm:flex-row">
			<div class="w-[300px] text-grey-300">Verificado:</div>
			<div class="text-blue-500 dark:text-white">
				{currentUser?.confirmed ? 'Yes' : 'No'}
			</div>
		</div>
	{:else if $user.status == 'error'}
		<p class="text-red-500">Error</p>
	{:else}
		<div></div>
	{/if}
</div>

<div class="mt-20">
	<h1 class="mb-2 mt-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
		Pedidos
	</h1>

	<div class="mt-4">
		{#if ordersLoading}
			<div class=" flex h-[40px] items-center justify-center">
				<Spinner classes="border-blue-500 dark:border-white"></Spinner>
			</div>
		{:else if ordersError}
			<div class="text-red-500">{ordersError}</div>
		{:else}
			{#each orders as order}
				<div class="mb-12">
					<div class="mb-4 text-productbase font-bold text-blue-400 dark:text-blue-100 lg:text-lg">
						Pedido <span class="font-normal italic text-blue-200">{order.documentId}</span> de {formatDate(
							new Date(order.orderDate)
						)}
					</div>
					<div class="mb-2 border-b border-blue-100 pb-2 dark:border-grey-900">
						<span class="text-grey-300 dark:text-grey-100">Total:</span>
						<span class="text-green-200 dark:text-green-100">$ {order.totalPrice}</span>
					</div>
					{#each order.courses as course}
						<div
							class="relative mb-4 grid grid-cols-[100px,1fr,50px] items-start gap-2 border-b border-blue-100 pb-4 dark:border-grey-900 md:grid-cols-[100px,1fr,50px] lg:grid-cols-[200px,1fr,1fr]"
						>
							<div class=" overflow-hidden group-hover:opacity-80 dark:bg-grey-900">
								<ImageDisplay
									provider={course.videoPreview?.provider}
									src={course.videoPreview?.url}
									alt={course.title}
									classes={'rounded-lg shadow-md inset-0 w-full object-cover h-[80px]'}
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
				</div>
			{/each}
		{/if}
	</div>
</div>
