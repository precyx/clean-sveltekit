<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount, onDestroy } from 'svelte';
	import type { User } from '$lib/api/types';

	import { browser } from '$app/environment';
	import { logout } from '$lib/api/api';
	import { getUser, getCart } from '$lib/api/api';
	import { user } from '$lib/stores/user';
	import { cart } from '$lib/stores/cart';
	import { theme } from '$lib/stores/theme';
	import { sleep } from '$lib/utils/Utils';
	import { clickOutside } from '$lib/utils/clickOutside';

	import NavLink from '$lib/components/NavLink.svelte';
	import PopupItem from '$lib/components/PopupItem.svelte';
	import IconSun from '$lib/icons/IconSun.svelte';
	import IconMoon from '$lib/icons/IconMoon.svelte';
	import IconUser from '$lib/icons/IconUser.svelte';

	import { isPersonalPage } from '$lib/utils/Utils';
	import IconMenu from '$lib/icons/IconMenu.svelte';
	import CartButton from './CartButton.svelte';

	/* custom classes */
	let { customClasses } = $props();

	let LOGO = '/img/logo-color.png';
	let LOGO_WHITE = '/img/logo-white.png';

	/**
	 * Size Calculation
	 */
	let element: HTMLElement | null = null; // Reference to the HTML element
	let baseWidth = 0;

	onMount(async () => {
		if (!browser) return;

		// Check if the user is already logged in
		const loginToken = localStorage.getItem('loginToken');
		if (loginToken) {
			// load cart
			await getCart();

			try {
				// get user
				let userData = await getUser();
				userData = {
					...userData
				};
				// set user
				$user.user = userData;
				$user.status = 'set';
			} catch (err) {
				console.error('Failed to fetch user:', err);
				localStorage.removeItem('loginToken');

				$user.status = 'error';
			}
		} else {
			$user.status = 'error';
		}

		// width calculation
		if (element) {
			await sleep(100);
			baseWidth = element.offsetHeight + 80;
		}
	});

	/**
	 * User
	 */
	let currentUser: User | null = $state(null);

	$effect(() => {
		user.subscribe((value) => {
			currentUser = value.user;
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

	let mobileNavRef: HTMLElement | null = $state(null);

	const closeMobileNav = () => {
		showMobileNav = false;
	};
	const closeMobileProfile = () => {
		showMobileProfile = false;
	};

	afterNavigate(() => {
		showMobileNav = false;
		showMobileProfile = false;
	});
</script>

<div class="h-[70px] w-full"></div>
<header
	class={`fixed top-0 z-50 w-full text-grey-300 dark:text-grey-100 ${headerClasses} ${customClasses} h-[70px]`}
>
	<!-- Header Gradient-->
	<!--
	<div
		id="header-gradient"
		class="background-grey-300 fixed left-0 top-0 h-[70px] w-full "
	>
		xxx
	</div>
-->

	<div class="lg:hidden">
		<!--
		 ###
		 ### Mobile Nav 
		 ###
		 -->
		<div class="absolute left-2 top-2 z-10">
			<button
				class="z-10 touch-manipulation p-4 active:opacity-60"
				onclick={() => (showMobileNav = !showMobileNav)}
			>
				<IconMenu
					classes={`h-6 w-6 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'}`}
				></IconMenu>
			</button>

			{#if showMobileNav}
				<div
					use:clickOutside={() => {
						showMobileNav = false;
					}}
					class=" absolute left-[-8px] top-[62px] z-10 flex w-screen shadow-lg"
				>
					<nav
						class="flex w-full touch-manipulation select-none flex-col bg-white py-2 text-blue-500 dark:bg-grey-1100 dark:text-white"
					>
						<a class="w-full px-4 py-2 active:opacity-60" href={'/landing'}>Home</a>
						<a class="px-4 py-2 active:opacity-60" href={'/courses'}>Cursos</a>
						<a class="px-4 py-2 active:opacity-60" href={'/products'}>Productos</a>
						<a class="px-4 py-2 active:opacity-60" href={'/contact'}>Contacto</a>
						<a class="px-4 py-2 active:opacity-60" href={'/about-us'}>Sobre Nosotros</a>
					</nav>
				</div>
			{/if}
		</div>

		<div class="absolute inset-x-0 mx-auto flex h-full items-center justify-center space-x-3">
			<NavLink href={'/landing'}>
				<div class="relative top-[-15px] h-[60px] active:opacity-60">
					{#if IS_PERSONAL_PAGE || $theme === 'dark'}
						<img src={LOGO_WHITE} class="w-[90px]" alt="logo" />
					{:else}
						<img src={LOGO} class="w-[90px]" alt="logo" />
					{/if}
				</div>
			</NavLink>
		</div>

		<div class="absolute right-2 top-2 flex flex-row items-center">
			<!-- Cart -->
			{#if $cart?.courses?.length}
				<CartButton {IS_PERSONAL_PAGE} count={$cart?.courses?.length} href={'/cart/overview'}
				></CartButton>
			{/if}

			<button
				class=" touch-manipulation p-4"
				onclick={() => (showMobileProfile = !showMobileProfile)}
			>
				<IconUser
					classes={`h-6 w-6 dark:text-gray-50 active:opacity-60 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'}`}
				></IconUser>
			</button>
		</div>

		{#if showMobileProfile}
			<div
				class="absolute left-[0px] top-[70px] flex w-[250px] w-full bg-black py-2 shadow-lg"
				use:clickOutside={() => {
					showMobileProfile = false;
				}}
			>
				<div class=" flex w-full justify-center bg-black">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<nav class="flex w-full touch-manipulation select-none flex-col">
						{#if !currentUser}
							<a href={'/login'} class="  px-4 py-2">Iniciar sesión</a>
						{:else}
							<a class="px-4 py-2" href={'/my-courses'}>Mis Cursos</a>
							<a class="px-4 py-2" href={'/profile'}>Perfil</a>
							<button class="px-4 py-2 text-left text-red-400 dark:text-red-400" onclick={logout}
								>Cerrar sesión</button
							>
						{/if}
						<button
							onclick={toggleTheme}
							class="flex transform items-center border-t border-blue-400/20 p-4 pb-2 pl-5 active:opacity-60"
						>
							{#if $theme === 'dark'}
								<IconSun classes={`h-6 w-6 text-white pointer-events-none `}></IconSun>
							{:else}
								<IconMoon classes={`h-6 w-6 text-blue-400 pointer-events-none`}></IconMoon>
							{/if}
							<span class="ml-2">{$theme === 'dark' ? 'Claro' : 'Oscurro'}</span>
						</button>
					</nav>
				</div>
			</div>
		{/if}
	</div>

	<div class="container mx-auto flex hidden h-full items-center lg:flex">
		<!--
		 ###
		 ### Desktop Nav 
		 ###
		 -->
		<nav class="absolute inset-x-0 mx-auto flex h-full items-center justify-center space-x-3">
			<NavLink href={'/courses'}>Cursos</NavLink>
			<NavLink href={'/products'}>Productos</NavLink>

			<NavLink href={'/landing'}>
				<div class="relative top-[-15px] h-[60px] active:opacity-60">
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

		<!--
		 ###
		 ### Action Buttons 
		 ###
		 -->
		<div class="relative z-20 ml-auto flex h-full items-center space-x-4" bind:this={element}>
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

			<!-- Cart -->
			{#if $cart?.courses?.length}
				<CartButton {IS_PERSONAL_PAGE} count={$cart?.courses?.length} href={'/cart/overview'}
				></CartButton>
			{/if}

			{#if !currentUser}
				<NavLink href={'/login'}>Iniciar sesión</NavLink>
			{/if}

			{#if currentUser}
				<div class="group relative z-30 flex items-center">
					<button class="  p-2">
						<IconUser
							classes={`h-6 w-6 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'} `}
						></IconUser>
					</button>

					<!-- Popover -->
					<div class="absolute right-0 top-[40px] hidden group-hover:block">
						<div
							class="w-32 rounded-lg border border-gray-300 bg-white p-1 shadow-lg dark:border-grey-700 dark:bg-grey-900"
						>
							<PopupItem href={'/my-courses'}>Mis Cursos</PopupItem>
							<PopupItem href={'/profile'}>Perfil</PopupItem>
							<PopupItem classes="text-red-400 dark:text-red-400" onclick={logout}
								>Cerrar sesión</PopupItem
							>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</header>

<style>
</style>
