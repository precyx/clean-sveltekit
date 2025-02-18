<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';
	import { onMount } from 'svelte';
	import { confirmRegistration } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

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
			//goto('/email-confirmed');

			if (res.confirmed) {
				success = 'Email confirmed successfully';
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
	<h2 class="dark:text-grey-0 mb-2 mb-4 text-lg font-extrabold text-blue-500 lg:text-xl">
		Confirming Email...
	</h2>

	{#if success}
		<div class="text-grey-300 dark:text-grey-100 mb-4">
			{success}
		</div>
		<Button classes="mt-6" onclick={clickMyCourses}>Go to my courses</Button>
	{/if}
	{#if error}
		<p class="mb-4 text-sm text-red-500">{error}</p>
	{/if}
</div>
