<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { browser } from '$app/environment';
	import { logout } from '$lib/api/api';
	import { getUser } from '$lib/api/api';
	import { user } from '$lib/stores/user';
	import { theme } from '$lib/stores/theme';

	import NavLink from '$lib/components/NavLink.svelte';
	import PopupItem from '$lib/components/PopupItem.svelte';
	import IconSun from '$lib/icons/IconSun.svelte';
	import IconMoon from '$lib/icons/IconMoon.svelte';
	import IconUser from '$lib/icons/IconUser.svelte';

	import { isPersonalPage } from '$lib/utils/Utils';
	import IconMenu from '$lib/icons/IconMenu.svelte';

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

	/**
	 * User
	 */
	let currentUser = $state($user);

	$effect(() => {
		user.subscribe((value) => {
			currentUser = value;
		});
	});

	/**
	 * Theme
	 */
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

	/**
	 * Header
	 */
	let headerClasses = $state('');
	let IS_PERSONAL_PAGE = $state(false);

	$effect(() => {
		if (isPersonalPage(page.url.pathname)) {
			IS_PERSONAL_PAGE = true;
			headerClasses =
				'bg-gradient-to-r from-[#8FC04B] to-[#2695C7] dark:from-[#384520] dark:to-[#0C3B56]';
		} else {
			IS_PERSONAL_PAGE = false;
			headerClasses = '';
		}
	});

	/**
	 * Navigation
	 */

	let showMobileNav = $state(false);
	let showMobileProfile = $state(false);
</script>

<header
	class={`text-grey-300 dark:text-grey-100 relative z-50 w-full ${headerClasses} ${customClasses} h-[70px]`}
>
	<div class="lg:hidden">
		<!-- Mobile Nav -->
		<div class="absolute left-2 top-2 z-10">
			<button class="z-10 p-4" onclick={() => (showMobileNav = !showMobileNav)}>
				<IconMenu
					classes={`h-6 w-6 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'}`}
				></IconMenu>
			</button>

			{#if showMobileNav}
				<div class="absolute left-0 top-[60px] z-10 flex w-[250px] bg-black p-4">
					<nav class="flex flex-col space-y-3">
						<a href={'/landing'}>Home</a>
						<a href={'/courses'}>Courses</a>
						<a href={'/products'}>Products</a>
						<a href={'/contact'}>Contacto</a>
						<a href={'/about-us'}>Sobre Nosotros</a>
					</nav>
				</div>
			{/if}
		</div>

		<div class="absolute inset-x-0 mx-auto flex h-full items-center justify-center space-x-3">
			<NavLink href={'/landing'}>
				<div class="relative top-[-15px] h-[60px]">
					{#if IS_PERSONAL_PAGE || $theme === 'dark'}
						<img src={LOGO_WHITE} class="w-[90px]" alt="logo" />
					{:else}
						<img src={LOGO} class="w-[90px]" alt="logo" />
					{/if}
				</div>
			</NavLink>
		</div>

		<div class="absolute right-2 top-2 flex flex-row">
			<button onclick={toggleTheme} class="transform p-2 p-4">
				{#if $theme === 'dark'}
					<IconSun
						classes={`h-6 w-6 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'}`}
					></IconSun>
				{:else}
					<IconMoon
						classes={`h-6 w-6 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'}`}
					></IconMoon>
				{/if}
			</button>

			<button class=" p-4" onclick={() => (showMobileProfile = !showMobileProfile)}>
				<IconUser
					classes={`h-6 w-6 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'}`}
				></IconUser>
			</button>

			{#if showMobileProfile}
				<div class="absolute right-0 top-[60px] flex w-[250px] bg-black p-4">
					<div class=" flex justify-center bg-black">
						<nav class="flex flex-col space-y-3">
							{#if !currentUser}
								<NavLink href={'/login'}>Login</NavLink>
							{:else}
								<a href={'/my-courses'}>Mis Cursos</a>
								<a href={'/profile'}>Profile</a>
								<button onclick={logout}>Logout</button>
							{/if}
						</nav>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="container mx-auto flex hidden h-full items-center lg:flex">
		<!-- Navigation -->
		<nav class="absolute inset-x-0 mx-auto flex h-full items-center justify-center space-x-3">
			<NavLink href={'/courses'}>Courses</NavLink>
			<NavLink href={'/products'}>Products</NavLink>

			<NavLink href={'/landing'}>
				<div class="relative top-[-15px] h-[60px]">
					{#if IS_PERSONAL_PAGE || $theme === 'dark'}
						<img src={LOGO_WHITE} class="w-[90px]" alt="logo" />
					{:else}
						<img src={LOGO} class="w-[90px]" alt="logo" />
					{/if}
				</div>
			</NavLink>

			<NavLink href={'/contact'}>Contacto</NavLink>
			<NavLink href={'/about-us'}>Sobre Nosotros</NavLink>
		</nav>

		<!-- Action Buttons -->
		<div class="relative z-20 ml-auto flex h-full items-center space-x-4">
			<button onclick={toggleTheme} class="transform rounded p-2">
				{#if $theme === 'dark'}
					<IconSun
						classes={`h-6 w-6 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'}`}
					></IconSun>
				{:else}
					<IconMoon
						classes={`h-6 w-6 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'}`}
					></IconMoon>
				{/if}
			</button>

			{#if !currentUser}
				<NavLink href={'/login'}>Login</NavLink>
			{:else}
				<NavLink href={'/my-courses'}>Mis Cursos</NavLink>
				<div class="group relative z-30 flex items-center">
					<button class="  p-2">
						<IconUser
							classes={`h-6 w-6 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'} `}
						></IconUser>
					</button>

					<!-- Popover -->
					<div class="absolute right-0 top-[40px] hidden group-hover:block">
						<div
							class="dark:bg-grey-900 dark:border-grey-700 w-32 rounded-lg border border-gray-300 bg-white p-1 shadow-lg"
						>
							<PopupItem href={'/profile'}>Profile</PopupItem>
							<PopupItem onclick={logout}>Logout</PopupItem>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</header>

<style>
</style>
