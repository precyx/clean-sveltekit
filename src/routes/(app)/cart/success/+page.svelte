<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import { user } from '$lib/stores/user';
	import IconCheckBig from '$lib/icons/IconCheckBig.svelte';
	import Button from '$lib/components/Button.svelte';
	import { getOrderByUser } from '$lib/api/api';
	import type { Order } from '$lib/api/types';
	import { formatDate } from '$lib/utils/Utils';

	let currentUser = $state($user);
	let userOrder: Order | null = $state(null);
	let courseTitles: string = $state('');

	let loading: boolean = $state(true);
	let error: string = $state('');

	$effect(() => {
		user.subscribe((value) => {
			currentUser = value;
		});
	});

	/**
	 * Navigation
	 */

	const goBack = () => {
		goto('/cart/overview'); // Navigate back to course list
	};
	const gotoMyCourses = () => {
		goto('/my-courses');
	};
	const gotoMyProfile = () => {
		goto('/profile');
	};

	/**
	 * Mount
	 */

	onMount(async () => {
		loading = true;

		// get user order
		let orderId = page.url.searchParams.get('orderId');
		if (!orderId) {
			error = 'Orden no encontrada';
			loading = false;
			return;
		}

		try {
			let _userOrder = await getOrderByUser(orderId);
			userOrder = _userOrder;
			courseTitles = userOrder?.courses.map((item) => item.title).join(',');
			console.log('userOrder', userOrder);
		} catch (e) {
			error = 'Orden no encontrada';
		} finally {
			loading = false;
		}
	});
</script>

<div class="mb-10 w-full">
	{#if error}
		<div class="text-center text-red-500 dark:text-red-400">{error}</div>
	{:else if loading}
		<div></div>
	{:else}
		<div class="mb-6 mt-4 flex justify-center">
			<div
				class="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-green-200 sm:h-[150px] sm:w-[150px]"
			>
				<IconCheckBig classes="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] text-white"
				></IconCheckBig>
			</div>
		</div>
		<div class="w-full text-center">
			<h1
				class="mb-2 mt-4 text-center text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl"
			>
				Gracias por su Orden {$user?.user?.username}!
			</h1>
			<h2
				class="mb-8 hidden text-productbase font-medium italic text-grey-300 dark:text-grey-500 lg:text-lg"
			>
				Pago de <span class="font-bold">$ {userOrder?.totalPrice}</span> fue exitoso
			</h2>

			<div
				class="mx-auto mt-4 max-w-[400px] rounded-lg bg-white p-5 text-base shadow-lg dark:bg-grey-1000"
			>
				<!-- prettier-ignore -->
				{#each [
					{ value: userOrder?.courses.length, label: 'Cursos' }, 
					{ value: "$ " + userOrder?.totalPrice, label: 'Total' }, 
					{ value: userOrder?.paymentMethod, label: 'Método de Pago' }, 
					{ value: userOrder?.orderDate ? formatDate(new Date(userOrder?.orderDate)) : "", label: 'Fecha' },
					{ value: userOrder?.documentId, label: 'ID de Orden' },
					{ value: userOrder?.paymentStatus, label: 'Estado de Pago', special: true },
				] as item}
				<div class="flex text-base font-medium sm:mb-1 mb-4 sm:flex-row flex-col">
					{#if !item.special}
						<div class="text-left text-grey-500 dark:text-grey-600 w-1/2">
							{item.label}:
						</div>
						<div class="text-grey-300 dark:text-white text-left sm:w-1/2 w-auto break-words overflow-wrap break-word whitespace-normal">{item.value}</div>
					{:else}
						{#if item.label == "Estado de Pago"}
							<div class="text-left text-grey-500 dark:text-grey-600 w-1/2">
								{item.label}:
							</div>
							<div class="text-grey-300 dark:text-white text-left w-1/2">
								{#if item.value == "paid"}
									<div class="inline-flex px-4  bg-green-200 bg-opacity-30 text-green-300 dark:text-green-200 rounded-full">
										Pagado
									</div>
								{:else if item.value == "verifying"}
									<div class="inline-flex px-4 bg-orange-200 bg-opacity-30 text-orange-400 dark:text-orange-300 rounded-full">
										Verificando
									</div>
								{:else}
									<div class="inline-flex px-4 bg-orange-200 bg-opacity-30 text-orange-400 dark:text-orange-300 rounded-full">
										Inconocido
									</div>
								{/if}
								
							</div>
						{/if}
					{/if}
				</div>
				{/each}
			</div>
		</div>
		<div class="mb-8 mt-8 flex flex-col items-center justify-center sm:flex-row">
			<div class="mb-4 mr-0 sm:mb-0 sm:mr-4">
				<Button secondary={true} onclick={gotoMyProfile}>Ver mis Pedidos</Button>
			</div>
			<div>
				<Button onclick={gotoMyCourses}>Ver mis cursos</Button>
			</div>
		</div>
	{/if}
</div>
