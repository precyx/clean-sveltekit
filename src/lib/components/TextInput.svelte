<script lang="ts">
	export let id: string;
	export let type: string = 'text';
	export let label: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let error: string = '';
	export let oninput: () => void = () => {};
</script>

<div class="relative w-full">
	<label for={id} class="mb-1 block text-sm font-medium text-blue-500 dark:text-grey-0">
		{label}
	</label>

	<input
		{type}
		{id}
		bind:value
		{placeholder}
		{required}
		{oninput}
		class=" mt-1 block w-full rounded-md border-2 px-4 py-3 focus:ring-0
      {error
			? 'border-red-400 bg-red-50 text-red-400  placeholder-red-400 focus:border-red-400 dark:bg-red-900 dark:bg-opacity-20 dark:placeholder-white dark:placeholder-opacity-40'
			: ' border-grey-300 bg-grey-50 text-grey-500 placeholder-grey-300 focus:border-blue-500 dark:border-grey-700 dark:bg-grey-900 dark:text-grey-200 dark:focus:border-grey-0'}"
	/>

	{#if error}
		<p class="mt-1 text-sm font-medium text-red-400">{error}</p>
	{/if}
</div>
