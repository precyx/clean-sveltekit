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
    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
  >
    {label}
  </label>
  
    <input
      type={type}
      id={id}
      bind:value
      placeholder={placeholder || label}
      required={required}
      class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light dark:bg-gray-700 dark:text-white"
    />

  
    {#if error}
      <p class="text-red-500 text-sm mt-1">{error}</p>
    {/if}
  </div>