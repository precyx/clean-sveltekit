<script lang="ts">
	import { page } from '$app/state';

	let { href } = $props();
	let defaultColorClasses =
		"dark:text-grey-0 text-blue-500 hover:text-blue-600 aria-[current='page']:text-blue-600 dark:hover:text-blue-100 dark:aria-[current='page']:text-blue-300";
	let colorClasses = $state(defaultColorClasses);

	// Change color depending on the page
	$effect(() => {
		if (page.url.pathname === '/my-courses') {
			colorClasses =
				"dark:text-grey-0 text-grey-0 hover:text-blue-100 aria-[current='page']:text-blue-100 dark:hover:text-blue-100 dark:aria-[current='page']:text-blue-100";
		} else {
			colorClasses = defaultColorClasses;
		}
	});
</script>

<a
	{href}
	class={`${colorClasses} px-2 py-1 font-medium aria-[current='page']:underline`}
	aria-current={page.url.pathname === href ? 'page' : undefined}
>
	<slot />
</a>
