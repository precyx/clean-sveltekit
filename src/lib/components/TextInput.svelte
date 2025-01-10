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
	<label for={id} class="text-title mb-1 block text-sm font-semibold dark:text-title-dark">
		{label}
	</label>

	<input
		{type}
		{id}
		bind:value
		{placeholder}
		{required}
		class="mt-1 block w-full rounded-md border-2 px-4 py-3
      {error
			? 'border-red-400 bg-red-50  text-red-400 placeholder-red-400 dark:bg-red-900 dark:bg-opacity-20 dark:placeholder-white dark:placeholder-opacity-40'
			: ' border-form-border bg-form-bg text-form-text placeholder-form-text dark:border-form-borderDark dark:bg-form-bgDark dark:text-form-textDark'}"
	/>

	{#if error}
		<p class="mt-1 text-sm font-semibold text-red-400">{error}</p>
	{/if}
</div>
