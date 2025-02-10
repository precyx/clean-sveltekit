<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { user } from '$lib/stores/user';
	import PaymentOption from '$lib/components/PaymentOption.svelte';
	import PayPalButton from '$lib/components/PayPalButton.svelte';
	import IconCheckBig from '$lib/icons/IconCheckBig.svelte';
	import Button from '$lib/components/Button.svelte';

	let currentUser = $state($user);

	$effect(() => {
		user.subscribe((value) => {
			currentUser = value;
		});
	});

	onMount(() => {});

	const goBack = () => {
		goto('/cart/overview'); // Navigate back to course list
	};

	const gotoMyCourses = () => {
		goto('/my-courses');
	};
</script>

<div class="mb-6 mt-12 flex justify-center">
	<div class="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-green-200">
		<IconCheckBig classes="w-[100px] h-[100px] text-white"></IconCheckBig>
	</div>
</div>

<div class="mb-10 w-full">
	<div class="w-full text-center">
		<h1
			class="dark:text-grey-0 mb-2 mt-4 text-center text-lg font-extrabold text-blue-500 lg:text-xl"
		>
			Gracias {$user?.username}!
		</h1>
		<h2
			class="text-productbase mb-8 font-medium italic text-blue-400 dark:text-blue-100 lg:text-lg"
		>
			Pago de <span class="font-bold">50$</span> fue exitoso
		</h2>
	</div>
</div>

<div class="mb-12 mt-12 flex justify-center">
	<Button onclick={gotoMyCourses}>Ver mis cursos</Button>
</div>
