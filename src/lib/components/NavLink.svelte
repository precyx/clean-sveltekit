<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
</script>

<a
	{href}
	class="text-primary-light dark:text-primary-dark hover:text-primary-active aria-[current='page']:text-primary-active font-medium
    aria-[current='page']:underline dark:hover:text-link-dark
    aria-[current='page']:dark:text-link-dark"
	aria-current={$page.url.pathname === href ? 'page' : undefined}
>
	<slot />
</a>
