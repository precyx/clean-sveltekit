<script lang="ts">
	import Header from './Header.svelte';
	import '../app.postcss';
  </script>
  
<div class="app bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
	<Header />
  
	<main class="flex-1 p-6 mx-auto w-full max-w-5xl">
	  <slot />
	</main>
    
  </div>

  
<svelte:head>
  <style>
    html, body {
      @apply bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark ;
	}
	body {
		min-height: 100vh;
	}
  </style>
</svelte:head>
  