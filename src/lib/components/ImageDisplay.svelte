<script lang="ts">
	export let src: string; // Image source URL
	export let alt: string = ''; // Alt text for accessibility
	export let classes: string = ''; // Optional additional classes
	let error = false;
</script>

<img {src} {alt} onerror={() => (error = true)} class={' ' + classes} />

{#if error}
	<div class={' ' + classes}>No Image</div>
{:else}
	<img {src} {alt} onerror={() => (error = true)} class={' ' + classes} />
{/if}
