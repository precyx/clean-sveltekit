<script lang="ts">
	import { onMount } from 'svelte';
	import { register, getCart } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import { sleep } from '$lib/utils/Utils';
	import { user } from '$lib/stores/user';

	import TextInput from '$lib/components/TextInput.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Button from '$lib/components/Button.svelte';
	import CountryPicker from '$lib/components/CountryPicker.svelte';
	import PhonePicker from './PhonePicker.svelte';
	import { getGeoInfo } from '$lib/api/external';

	let username = '';
	let email = '';
	let country = '';
	let phone = '';
	let password = '';
	let error = '';

	let errors: { [key: string]: string } = {};
	let loading = false;
	let submitted = false;

	let phoneIsValid = false;

	let geoDataLoaded = false;

	const removeEmptyStrings = <T extends Record<string, any>>(obj: T): T => {
		for (const key in obj) {
			if (obj[key] === '') {
				delete obj[key]; // Remove the key if its value is an empty string
			}
		}
		return obj;
	};

	const validate = () => {
		if (!submitted) return;

		let newErrors: any = {}; // Create a new object

		if (!username) {
			newErrors.username = 'El nombre es obligatorio.';
		} else if (username.length < 2) {
			newErrors.username = 'El nombre debe tener al menos 2 caracteres.';
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

		if (!country) {
			newErrors.country = 'El país es obligatorio.';
		}

		if (!phoneIsValid) {
			newErrors.phone = 'El teléfono es obligatorio.';
		}

		errors = { ...newErrors };

		return Object.keys(errors).length === 0;
	};

	const handleRegister = async () => {
		console.log('vals', removeEmptyStrings({ username, email, country, phone, password }));
		submitted = true;
		if (!validate()) return;
		try {
			loading = true;
			error = '';
			await sleep(500);
			let data = removeEmptyStrings({ username, email, country, phone, password });
			let res = await register(data);
			localStorage.setItem('loginToken', res.loginToken);
			// get cart
			await getCart();
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
		username;
		email;
		password;
		validate();
	}

	/**
	 * Mount
	 */
	onMount(async () => {
		try {
			const geoInfo = await getGeoInfo();
			if (geoInfo) {
				country = geoInfo.country;
				phone = geoInfo.phone;
			}
		} catch (err: any) {
			console.log('Geo Data Error', err);
		} finally {
			geoDataLoaded = true;
		}
	});
</script>

{#if geoDataLoaded}
	<form on:submit|preventDefault={handleRegister} novalidate class="w-full max-w-md rounded-lg">
		<h2 class="mb-2 mb-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
			Registrarse
		</h2>

		<div class="mb-4">
			<TextInput
				id="username"
				label="Nombre *"
				placeholder="Nombre *"
				type="text"
				bind:value={username}
				required={true}
				error={errors.username}
			/>
		</div>

		<div class="mb-4">
			<TextInput
				id="email"
				label="Correo electrónico *"
				placeholder="Correo electrónico *"
				type="email"
				bind:value={email}
				required={true}
				error={errors.email}
			/>
		</div>

		<div class="mb-4">
			<TextInput
				id="password"
				label="Contraseña *"
				placeholder="Contraseña *"
				type="password"
				bind:value={password}
				required={true}
				error={errors.password}
			/>
		</div>

		<div class="mb-4">
			<CountryPicker
				error={errors.country}
				required={true}
				id="country"
				bind:value={country}
				label="Pais *"
				searchText="Buscar Pais"
				selectText="Seleccionar Pais"
			></CountryPicker>
		</div>

		<div class="mb-4">
			<PhonePicker
				error={errors.phone}
				required={true}
				label="Telefono *"
				id="phone"
				bind:value={phone}
				bind:isValid={phoneIsValid}
			/>
		</div>
		<div class="mt-6">
			{#if loading}
				<p class="mb-4 text-sm text-red-500">{error}</p>
			{/if}

			{#if error}
				<p class="mb-4 text-sm text-red-500">{error}</p>
			{/if}

			<Button
				type="submit"
				disabled={loading}
				classes="w-full text-center items-center justify-center"
			>
				{#if loading}
					<Spinner classes="border-white" /> Registrándose...
				{:else}
					Registrarse
				{/if}
			</Button>
		</div>
	</form>
{/if}
