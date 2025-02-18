<script lang="ts">
	import { page } from '$app/state';

	type Props = {
		children: any;
		onclick?: any;
		href?: string;
	};

	let { children, onclick, href }: Props = $props();
	let classes = `cursor flex w-full rounded p-2 text-base dark:text-grey-0 text-blue-500 hover:bg-blue-200 hover:bg-opacity-30 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-100
          aria-[current='page']:underline`;
</script>

{#if href}
	<a {href} class={classes} aria-current={page.url.pathname === href ? 'page' : undefined}>
		{@render children?.()}
	</a>
{:else if onclick}
	<button {onclick} class={classes}>
		{@render children?.()}
	</button>
{/if}
