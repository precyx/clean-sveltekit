<script lang="ts">
	export let id: string;
	export let type: string = 'text';
	export let label: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let error: string = '';
</script>

<div class="relative w-full">
	<label for={id} class="text-primary-light dark:text-primary-dark mb-1 block text-sm font-medium">
		{label}
	</label>

	<input
		{type}
		{id}
		bind:value
		{placeholder}
		{required}
		class="focus:border-primary-light dark:focus:border-primary-dark mt-1 block w-full rounded-md border-2 px-4 py-3 focus:ring-0
      {error
			? 'border-red-400 bg-red-50 text-red-400  placeholder-red-400 focus:border-red-400 dark:bg-red-900 dark:bg-opacity-20 dark:placeholder-white dark:placeholder-opacity-40'
			: ' border-quartiary-light dark:border-tertiary-dark dark:text-quartiary-dark placeholder-text-soft bg-background-light text-text-light   dark:bg-background-dark'}"
	/>

	{#if error}
		<p class="mt-1 text-sm font-medium text-red-400">{error}</p>
	{/if}
</div>
