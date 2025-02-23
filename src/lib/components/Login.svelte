<script lang="ts">
	import { login, getCart } from '$lib/api/api';
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

	const handleLogin = async () => {
		submitted = true;
		if (!validate()) return;
		try {
			loading = true;
			error = '';
			await sleep(200);
			const res = await login(email, password);
			localStorage.setItem('loginToken', res.loginToken);
			// load cart
			const cartData = await getCart();
			// set user
			$user.user = res.user;
			$user.status = 'set';
			goto('/profile');
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
	<h2 class="mb-2 mb-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
		Iniciar sesión
	</h2>

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

	{#if error}
		<p class="mb-4 text-sm text-red-500">{error}</p>
	{/if}

	<Button type="submit" disabled={loading}>
		{#if loading}
			<Spinner /> Iniciando sesión...
		{:else}
			Iniciar sesión
		{/if}
	</Button>
</form>
