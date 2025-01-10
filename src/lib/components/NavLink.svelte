<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
</script>

<a
	{href}
	class="font-medium text-link-light hover:text-link-active aria-[current='page']:text-link-active
    dark:hover:text-link-dark
    aria-[current='page']:dark:text-link-dark"
	aria-current={$page.url.pathname === href ? 'page' : undefined}
>
	<slot />
</a>
