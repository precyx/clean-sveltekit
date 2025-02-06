<script>
	import { theme } from '$lib/stores/theme';
	import IconCheck from '$lib/icons/IconCheck.svelte';

	let { active = $bindable(), controlled = false } = $props();

	const toggle = () => {
		if (controlled) return;
		active = !active;
	};
</script>

<button
	class="bg-grey-50 dark:bg-grey-900 group flex w-full cursor-pointer items-center rounded-md border-2 border-blue-400 border-opacity-0 p-6 dark:border-blue-300"
	class:border-opacity-100={active}
	class:border-opacity-0={!active}
	class:dark:border-opacity-100={active}
	class:dark:border-opacity-0={!active}
	onclick={toggle}
>
	<div>
		<div
			class="bg-grey-400 flex h-[25px] w-[25px] items-center justify-center rounded-full border border-blue-500 dark:border-blue-300"
		>
			{#if active}
				<IconCheck classes="w-4 h-4 text-blue-500 dark:text-blue-300"></IconCheck>
			{/if}
		</div>
	</div>
	<div class="ml-6">
		{#if $theme === 'dark'}
			<img src={'/img/paypal-logo-white.png'} alt="Paypal" class="w-32" />
		{:else}
			<img src={'/img/paypal-logo.png'} alt="Paypal" class="w-32" />
		{/if}
	</div></button
>
