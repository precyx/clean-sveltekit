<script lang="ts">
	import { user } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import type { User } from '$lib/api/types';
	import { goto } from '$app/navigation';
	import { getUser } from '$lib/api/api';

	type Country = {
		name: string;
		code: string;
	};

	let error: string = $state('');

	let currentUser: User | null = $state($user.user);
	let country: Country | null = $state(null);

	onMount(async () => {
		let loginToken = localStorage.getItem('loginToken');

		if (!loginToken) {
			goto('/login');
			return;
		}

		try {
			currentUser = await getUser(loginToken);

			let response = await fetch('/data/country.json');
			let _countries: Country[] = await response.json();

			country = _countries.find((c) => c.code === $user?.user?.country) || null;
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
		<div>Error</div>
	{:else}
		<div></div>
	{/if}
</div>
