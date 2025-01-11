<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
</script>

<a
	{href}
	class="hover:text-primary-active aria-[current='page']:text-primary-active dark:text-grey-0 font-medium text-blue-500
    aria-[current='page']:underline dark:hover:text-link-dark
    aria-[current='page']:dark:text-link-dark"
	aria-current={$page.url.pathname === href ? 'page' : undefined}
>
	<slot />
</a>
