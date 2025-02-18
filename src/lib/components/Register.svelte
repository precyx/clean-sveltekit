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
			newErrors.username = 'El nombre de usuario es obligatorio.';
		} else if (username.length < 2) {
			newErrors.username = 'El nombre de usuario debe tener al menos 2 caracteres.';
		}

		if (!email) {
			newErrors.email = 'El correo electrónico es obligatorio.';
		} else if (!/^\S+@\S+\.\S+$/.test(email)) {
			newErrors.email = 'Formato de correo electrónico inválido.';
		}

		if (!password) {
			newErrors.password = 'La contraseña es obligatoria.';
		} else if (password.length < 2) {
			newErrors.password = 'La contraseña debe tener al menos 2 caracteres.';
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

			localStorage.setItem('loginToken', res.loginToken);
			user.set(res.user); // Update user store with logged-in user data
			goto('/profile');
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
		Registrarse
	</h2>

	<div class="mb-4">
		<TextInput
			id="username"
			label="Nombre de usuario"
			placeholder="Nombre de usuario"
			type="text"
			bind:value={username}
			required={true}
			error={errors.username}
		/>
	</div>

	<div class="mb-4">
		<TextInput
			id="email"
			label="Correo electrónico"
			placeholder="Correo electrónico"
			type="email"
			bind:value={email}
			required={true}
			error={errors.email}
		/>
	</div>

	<div class="mb-6">
		<TextInput
			id="password"
			label="Contraseña"
			placeholder="Contraseña"
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
			<Spinner /> Registrándose...
		{:else}
			Registrarse
		{/if}
	</Button>
</form>
