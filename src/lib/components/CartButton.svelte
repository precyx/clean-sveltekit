<script>
	import IconCart from '$lib/icons/iconCart.svelte';

	export let IS_PERSONAL_PAGE = true;
	export let count = 0;
	export let href = '';
</script>

<a class="flex p-2 active:opacity-60" {href}>
	<div
		class=" mr-2 text-base font-medium text-blue-500 dark:text-gray-50 ${IS_PERSONAL_PAGE
			? ' text-grey-0'
			: ' text-blue-500'}"
	>
		{count}
	</div>
	<IconCart
		classes={`h-6 w-6 text-blue-500 dark:text-gray-50 ${IS_PERSONAL_PAGE ? ' text-grey-0' : ' text-blue-500'} `}
	></IconCart>
</a>
