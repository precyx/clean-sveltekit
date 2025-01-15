<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	let { onclick, href }: { onclick?: any; href: string } = $props();

	let classes =
		'cursor flex w-full rounded p-2 text-base dark:text-grey-0 text-blue-500 hover:bg-blue-200 hover:bg-opacity-30 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-100';
</script>

{#if href}
	<a {href} class={classes}>
		<slot />
	</a>
{:else if onclick}
	<button on:click={onclick} class={classes}>
		<slot />
	</button>
{/if}
