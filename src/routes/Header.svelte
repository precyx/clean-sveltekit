<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	import { logout } from '$lib/api/api';

	import { onMount } from 'svelte';

	import { browser } from '$app/environment';
	import { getUser } from '$lib/api/api';
	import { user } from '$lib/stores/user';
	import { theme } from '$lib/stores/theme';

	import NavLink from '$lib/components/NavLink.svelte';

	onMount(async () => {
		if (browser) {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					const userData = await getUser(token);
					user.set(userData);
				} catch (err) {
					console.error('Failed to fetch user:', err);
					localStorage.removeItem('token');
				}
			}
		}
	});

	let currentUser = $state($user);

	// Automatically update currentUser whenever the user store changes
	$effect(() => {
		user.subscribe((value) => {
			currentUser = value;
		});
	});

	function toggleTheme() {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		theme.set(newTheme);
	}

	let currentTheme: string;

	$effect(() => {
		theme.subscribe((value) => {
			currentTheme = value;
		});
	});
</script>

<header
	class="w-full bg-background-light text-text-light shadow-md dark:bg-background-dark dark:text-text-dark"
>
	<div class="container mx-auto flex items-center justify-between p-4">
		<!-- Logo Section -->
		<div class="flex items-center space-x-4">
			<a href="https://svelte.dev/docs/kit">
				<img src={logo} alt="SvelteKit" class="h-10 w-auto" />
			</a>
			{#if currentUser}
				<div class="hidden text-sm font-semibold sm:block">
					Welcome, {currentUser.username}
				</div>
			{/if}
		</div>

		<!-- Navigation -->
		<nav class="hidden items-center space-x-6 md:flex">
			<NavLink href={'/'}>Home</NavLink>
			{#if currentUser}
				<NavLink href={'/courses'}>Courses</NavLink>
			{/if}
			<NavLink href={'/products'}>Products</NavLink>
			<NavLink href={'/register'}>Register</NavLink>
			<NavLink href={'/login'}>Login</NavLink>
		</nav>

		<!-- Action Buttons -->
		<div class="flex items-center space-x-4">
			<button
				on:click={toggleTheme}
				class="transform rounded bg-gray-200 p-2 transition hover:scale-110 dark:bg-gray-700 dark:text-white"
			>
				{$theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
			</button>

			{#if currentUser}
				<button
					on:click={logout}
					class="bg-primary-light dark:bg-primary-dark transform rounded p-2 text-white transition hover:scale-110"
				>
					Logout
				</button>
			{/if}
		</div>
	</div>

	<!-- Mobile Nav -->
	<div class="flex justify-center py-4 md:hidden">
		<nav class="flex flex-col space-y-3">
			<a href="/" class="hover:underline">Home</a>
			{#if currentUser}
				<a href="/courses" class="hover:underline">Courses</a>
			{/if}
			<a href="/register" class="hover:underline">Register</a>
			<a href="/login" class="hover:underline">Login</a>
		</nav>
	</div>
</header>

<style>
</style>
