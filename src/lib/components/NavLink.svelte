<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
</script>

<a
	{href}
	class="dark:text-grey-0 font-medium text-blue-500 hover:text-blue-600 aria-[current='page']:text-blue-600
    aria-[current='page']:underline dark:hover:text-link-dark
    aria-[current='page']:dark:text-link-dark"
	aria-current={$page.url.pathname === href ? 'page' : undefined}
>
	<slot />
</a>
