<script lang="ts">
	export let src: string; // Image source URL
	export let alt: string = ''; // Alt text for accessibility
	export let classes: string = ''; // Optional additional classes

	let error = false;
</script>

{#if error}
	<div class={' ' + classes} data-img-src={src}>No Image</div>
{:else}
	<img {src} {alt} onerror={() => (error = true)} class={' ' + classes} />
{/if}
