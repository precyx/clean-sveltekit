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
    class="block mb-1 text-sm font-semibold text-title dark:text-title-dark"
  >
    {label}
  </label>
  
    <input
      type={type}
      id={id}
      bind:value
      placeholder={placeholder}
      required={required}
      class="mt-1 border-2 block w-full px-4 py-3 rounded-md  
      {error 
      ? 'border-red-400 placeholder-red-400  text-red-400 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 dark:placeholder-white dark:placeholder-opacity-40' 
      : ' bg-form-bg border-form-border text-form-text placeholder-form-text dark:text-form-textDark dark:bg-form-bgDark dark:border-form-borderDark'}"
    />

  
    {#if error}
      <p class="text-red-400 text-sm font-semibold mt-1">{error}</p>
    {/if}
  </div>