<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { browser } from '$app/environment';
	import { logout } from '$lib/api/api';
	import { getUser } from '$lib/api/api';
	import { user } from '$lib/stores/user';
	import { theme } from '$lib/stores/theme';

	import NavLink from '$lib/components/NavLink.svelte';
	import IconSun from '$lib/icons/IconSun.svelte';
	import IconMoon from '$lib/icons/IconMoon.svelte';
	import IconUser from '$lib/icons/IconUser.svelte';

	/* custom classes */
	let { customClasses } = $props();

	let LOGO =
		'http://localhost:1337/uploads/464160045_521706020573047_6761713450314237728_n_removebg_preview_d8777845b4.png';
	let LOGO_WHITE = 'http://localhost:1337/uploads/logo_white_snaiderclean_788d70db2a.png';

	onMount(async () => {
		if (browser) {
			// Check if the user is already logged in
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
			console.log('theme', value);
			currentTheme = value;
		});
	});

	// Change header background depending on the page
	let headerClasses = $state('');
	let isMyCourses = $state(false);

	$effect(() => {
		if (page.url.pathname === '/my-courses') {
			isMyCourses = true;
			headerClasses =
				'bg-gradient-to-r from-[#8FC04B] to-[#2695C7] dark:from-[#384520] dark:to-[#0C3B56]';
		} else {
			isMyCourses = false;
			headerClasses = '';
		}
	});
</script>

<header
	class={`text-grey-300 dark:text-grey-100 relative z-10 w-full ${headerClasses} ${customClasses}`}
>
	<div class="container mx-auto flex items-center">
		<!-- Logo Section -->
		<div class="mr-auto flex items-center space-x-4">
			{#if currentUser}
				<div class="hidden text-sm font-semibold sm:block">
					Welcome, {currentUser.username}
				</div>
			{/if}
		</div>

		<!-- Navigation -->
		<nav class="mx-auto hidden translate-x-[100px] items-center space-x-3 md:flex">
			<NavLink href={'/courses'}>Courses</NavLink>
			<NavLink href={'/products'}>Products</NavLink>

			<NavLink href={'/landing'}>
				<div class="relative top-[-15px] h-[60px]">
					{#if isMyCourses || $theme === 'dark'}
						<img src={LOGO_WHITE} class="w-[90px]" />
					{:else}
						<img src={LOGO} class="w-[90px]" />
					{/if}
				</div>
			</NavLink>

			<NavLink href={'/contact'}>Contacto</NavLink>
			<NavLink href={'/about-us'}>Sobre Nosotros</NavLink>
		</nav>

		<!-- Action Buttons -->
		<div class="ml-auto flex items-center space-x-4">
			<button on:click={toggleTheme} class="transform rounded p-2">
				{#if $theme === 'dark'}
					<IconSun
						classes={`h-6 w-6 dark:text-gray-50 ${isMyCourses ? ' text-grey-0' : ' text-blue-500'}`}
					></IconSun>
				{:else}
					<IconMoon
						classes={`h-6 w-6 dark:text-gray-50 ${isMyCourses ? ' text-grey-0' : ' text-blue-500'}`}
					></IconMoon>
				{/if}
			</button>

			{#if !currentUser}
				<NavLink href={'/login'}>Login</NavLink>
			{:else}
				<NavLink href={'/my-courses'}>Mis Cursos</NavLink>
				<div>
					<IconUser
						classes={`h-6 w-6 dark:text-gray-50 ${isMyCourses ? ' text-grey-0' : ' text-blue-500'} `}
					></IconUser>
				</div>
				<button on:click={logout}>
					<NavLink href="">Logout</NavLink>
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
