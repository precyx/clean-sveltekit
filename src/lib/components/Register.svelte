<script lang="ts">
	import { register } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import { sleep } from '$lib/utils/Utils';
	import { user } from '$lib/stores/user';

	import TextInput from '$lib/components/TextInput.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Button from '$lib/components/Button.svelte';

	let username = '';
	let email = '';
	let password = '';
	let error = '';

	let errors: { [key: string]: string } = {};
	let loading = false;
	let submitted = false;

	const validate = () => {
		if (!submitted) return;

		let newErrors: any = {}; // Create a new object

		if (!username) {
			newErrors.username = 'Username is required.';
		} else if (username.length < 2) {
			newErrors.username = 'Username must be at least 2 characters.';
		}

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

	const handleRegister = async () => {
		submitted = true;
		if (!validate()) return;
		try {
			loading = true;
			error = '';
			await sleep(500);
			let res = await register(username, email, password);

			localStorage.setItem('token', res.token);
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
		username;
		email;
		password;
		validate();
	}
</script>

<form on:submit|preventDefault={handleRegister} novalidate class="w-full max-w-md rounded-lg">
	<h2 class="dark:text-grey-0 mb-2 mb-4 text-lg font-extrabold text-blue-500 lg:text-xl">
		Register
	</h2>

	<div class="mb-4">
		<TextInput
			id="username"
			label="Username"
			placeholder="Username"
			type="text"
			bind:value={username}
			required={true}
			error={errors.username}
		/>
	</div>

	<div class="mb-4">
		<TextInput
			id="email"
			label="Email"
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

	{#if loading}
		<p class="mb-4 text-sm text-red-500">{error}</p>
	{/if}

	{#if error}
		<p class="mb-4 text-sm text-red-500">{error}</p>
	{/if}

	<Button type="submit" disabled={loading}>
		{#if loading}
			<Spinner /> Registering...
		{:else}
			Register
		{/if}
	</Button>
</form>
