<script lang="ts">
	import { login } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user';
	import { sleep } from '$lib/utils/Utils';

	import TextInput from '$lib/components/TextInput.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Button from '$lib/components/Button.svelte';

	let email = '';
	let password = '';
	let error = '';

	let errors: { [key: string]: string } = {};
	let loading = false;
	let submitted = false;

	const validate = () => {
		if (!submitted) return;

		let newErrors: any = {}; // Create a new object

		if (!email) {
			newErrors.email = 'Email is required.';
		} else if (!/^\S+@\S+\.\S+$/.test(email)) {
			newErrors.email = 'Invalid email format.';
		}

		if (!password) {
			newErrors.password = 'Password is required.';
		} else if (password.length < 2) {
			newErrors.password = 'Password must be at least 2 characters.';
		}

		errors = { ...newErrors };

		return Object.keys(errors).length === 0;
	};

	const handleLogin = async () => {
		submitted = true;
		if (!validate()) return;
		try {
			loading = true;
			error = '';
			await sleep(200);
			const res = await login(email, password);
			localStorage.setItem('token', res.jwt);
			user.set(res.user); // Update user store with logged-in user data

			goto('/my-courses');
		} catch (err: any) {
			error = err.message;
		} finally {
			loading = false;
		}
	};

	// revalidate on field change
	$: {
		email;
		password;
		validate();
	}
</script>

<form on:submit|preventDefault={handleLogin} novalidate class="w-full max-w-md rounded-lg">
	<h2 class="dark:text-grey-0 mb-2 mb-4 text-lg font-extrabold text-blue-500 lg:text-xl">Login</h2>

	<div class="mb-4">
		<TextInput
			id="email"
			label="Email Address"
			placeholder="Email"
			type="email"
			bind:value={email}
			required={true}
			error={errors.email}
		/>
	</div>

	<div class="mb-6">
		<TextInput
			id="password"
			label="Password"
			placeholder="Password"
			type="password"
			bind:value={password}
			required={true}
			error={errors.password}
		/>
	</div>

	{#if error}
		<p class="mb-4 text-sm text-red-500">{error}</p>
	{/if}

	<Button type="submit" disabled={loading}>
		{#if loading}
			<Spinner /> Loggin in...
		{:else}
			Login
		{/if}
	</Button>
</form>
