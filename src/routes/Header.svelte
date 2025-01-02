<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	import {logout} from "$lib/api/api";

	import { onMount } from 'svelte';

	import { browser } from '$app/environment';
	import { getUser } from '$lib/api/api';
	import { user } from '$lib/stores/user';
	import { theme } from '$lib/stores/theme';

	import NavLink from "$lib/components/NavLink.svelte";


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
			console.log("user", value)
			currentUser = value;
		});
	});

	function toggleTheme() {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		console.log("theme", newTheme)
		theme.set(newTheme);
	}

	let currentTheme: string;

	$effect(() => {
		theme.subscribe((value) => {
			currentTheme = value;
			console.log("cc", value)
		});
	});

</script>


<header
  class="w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark shadow-md"
>
  <div class="container mx-auto flex justify-between items-center p-4">
    <!-- Logo Section -->
    <div class="flex items-center space-x-4">
      <a href="https://svelte.dev/docs/kit">
        <img src={logo} alt="SvelteKit" class="h-10 w-auto" />
      </a>
      {#if currentUser}
        <div class="hidden sm:block text-sm font-semibold">
          Welcome, {currentUser.username}
        </div>
      {/if}
    </div>

    <!-- Navigation -->
    <nav class="hidden md:flex items-center space-x-6">
		<NavLink href={"/"}>
			Home
		</NavLink>
		{#if currentUser}

			<NavLink href={"/dashboard"}>
				Dashboard
			</NavLink>
		{/if}
		<NavLink href={"/register"}>
			Register
		</NavLink>
		<NavLink href={"/login"}>
			Login
		</NavLink>
    </nav>

    <!-- Action Buttons -->
    <div class="flex items-center space-x-4">
      <button
        on:click={toggleTheme}
        class="p-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white hover:scale-110 transform transition"
      >
        {$theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>

      {#if currentUser}
        <button
          on:click={logout}
          class="p-2 rounded bg-primary-light dark:bg-primary-dark text-white hover:scale-110 transform transition"
        >
          Logout
        </button>
      {/if}
    </div>
  </div>

  <!-- Mobile Nav -->
  <div class="md:hidden flex justify-center py-4">
    <nav class="flex flex-col space-y-3">
      <a href="/" class="hover:underline">Home</a>
      {#if currentUser}
        <a href="/dashboard" class="hover:underline">Dashboard</a>
      {/if}
      <a href="/register" class="hover:underline">Register</a>
      <a href="/login" class="hover:underline">Login</a>
    </nav>
  </div>
</header>


<style>


</style>
