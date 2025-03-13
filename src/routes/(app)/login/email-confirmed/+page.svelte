<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';
	import IconMailBig from '$lib/icons/IconMailBig.svelte';
	import IconCheckBig from '$lib/icons/IconCheckBig.svelte';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { emailState } from '$lib/stores/email.svelte';

	const gotoProfile = () => {
		goto('/profile');
	};

	let emailSnapshot = emailState.email;

	onMount(async () => {
		emailState.email = '';
	});
</script>

{#if emailSnapshot}
	<div class="">
		<div class="mb-6 mt-12 flex justify-center">
			<div
				class="relative flex h-[150px] w-[150px] items-center justify-center rounded-full bg-blue-500"
			>
				<IconMailBig classes={'w-[100px] h-[100px] text-white'}></IconMailBig>

				<div
					class="absolute bottom-0 right-0 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-green-200"
				>
					<IconCheckBig classes="w-[36px] h-[36px] text-white"></IconCheckBig>
				</div>
			</div>
		</div>

		<h2
			class="mb-2 mb-4 text-center text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl"
		>
			Correo electrónico <br /> confirmada!
		</h2>

		<div
			class="mb-8 text-center text-productbase font-medium italic text-grey-300 dark:text-grey-500 lg:text-lg"
		>
			Tu correo: <span class="font-bold">{emailSnapshot}</span>
		</div>

		<div class="mb-12 mt-12 flex justify-center">
			<Button onclick={gotoProfile}>Regresar al Perfil</Button>
		</div>
	</div>
{:else}
	<p class="mb-4 text-sm text-red-500">No hay correo electronico para verificar.</p>
{/if}
