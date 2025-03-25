<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';
	import Button from '$lib/components/Button.svelte';

	let loginMode = $state('login');

	const toggleLoginMode = () => {
		loginMode = loginMode === 'login' ? 'register' : 'login';
	};
</script>

<div class="mx-auto flex max-w-[450px] flex-col items-center">
	<div class="border-color-gray-200 mb-10 w-full rounded-xl p-0 sm:border sm:p-10">
		{#if loginMode == 'login'}
			<Login></Login>
		{:else}
			<h2 class="mb-2 mb-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
				Iniciar sesión
			</h2>
			<Button
				onclick={toggleLoginMode}
				type="submit"
				classes="w-full text-center items-center justify-center">Iniciar sesion</Button
			>
		{/if}
	</div>

	<div
		class="border-color-gray-200 mb-5 w-full rounded-none border-t p-0 pt-10 sm:rounded-xl sm:border sm:p-10"
	>
		{#if loginMode == 'register'}
			<Register></Register>
		{:else}
			<h2 class="mb-2 mb-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
				Nuevo Aqui?
			</h2>
			<Button
				onclick={toggleLoginMode}
				type="submit"
				classes="w-full text-center items-center justify-center">Crear Cuenta</Button
			>
		{/if}
	</div>
</div>
