<script>
	import { theme } from '$lib/stores/theme';
	import IconCheck from '$lib/icons/IconCheck.svelte';

	/*type Props = {
		active?: boolean;
		controlled?: boolean;
		img?: string;
		imgDark?: string;
	};*/

	let {
		active = $bindable(),
		controlled = false,
		img = '',
		imgDark = '',
		onClick = () => {}
	} = $props();

	const toggle = () => {
		onClick();
		return;
	};
</script>

<button
	class="group mb-2 flex w-full cursor-pointer items-center rounded-md border-2 border-blue-400 border-opacity-0 bg-grey-50 p-3 dark:border-blue-300 dark:bg-grey-900 sm:p-6"
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
			<img src={imgDark} alt="paymentimg" class=" max-w-[70px] sm:max-w-[100px]" />
		{:else}
			<img src={img} alt="paymentimg" class="max-w-[70px] sm:max-w-[100px]" />
		{/if}
	</div></button
>
