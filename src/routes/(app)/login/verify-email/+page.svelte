<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';
	import { onMount } from 'svelte';
	import { confirmRegistration } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { emailState } from '$lib/stores/email.svelte';

	let error = $state('');
	let success = $state('');

	// onMount
	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const confirmToken = urlParams.get('token');

		if (!confirmToken) {
			error = 'No token found';
			return;
		}

		try {
			let res = await confirmRegistration(confirmToken);

			if (res.confirmed) {
				emailState.email = res.email;
				success = 'Email confirmed successfully';
				goto('/login/email-confirmed');
			}
		} catch (err: any) {
			error = err.message;
		}
	});

	const clickMyCourses = () => {
		goto('/my-courses');
	};
</script>

<div class="">
	<h2 class="mb-2 mb-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
		Confirmando Correo Electrónico...
	</h2>

	{#if success}
		<div class="mb-4 text-grey-300 dark:text-grey-100">
			{success}
		</div>
		<Button classes="mt-6" onclick={clickMyCourses}>Go to my courses</Button>
	{/if}
	{#if error}
		<p class="mb-4 text-sm text-red-500">{error}</p>
	{/if}
</div>
