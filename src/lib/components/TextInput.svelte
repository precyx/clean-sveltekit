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
    <label
    for={id}
    class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
  >
    {label}
  </label>
  
    <input
      type={type}
      id={id}
      bind:value
      placeholder={placeholder}
      required={required}
      class="mt-1 block w-full px-4 py-3 rounded-md border
      {error 
      ? 'border-red-400 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 dark:placeholder-white dark:placeholder-opacity-40' 
      : 'border-gray-400 bg-gray-100 dark:bg-gray-700'}"
    />

  
    {#if error}
      <p class="text-red-400 text-sm mt-1">{error}</p>
    {/if}
  </div>