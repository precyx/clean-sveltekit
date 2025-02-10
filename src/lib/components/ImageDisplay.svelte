<script lang="ts">
	import { PUBLIC_STRAPI_API_URL } from '$env/static/public';

	export let IMAGE_BASE = PUBLIC_STRAPI_API_URL;

	export let src: string; // Image source URL
	export let alt: string = ''; // Alt text for accessibility
	export let provider: string;
	export let classes: string = ''; // Optional additional classes

	let imgSrc = provider == 'local' ? `${IMAGE_BASE}${src}` : src;

	let error = false;
</script>

{#if error || !imgSrc}
	<div
		class={'bg-grey-50 dark:bg-grey-900 ' + classes}
		data-img-src={imgSrc}
		data-provider={provider}
	>
		No Image
	</div>
{:else}
	<img
		src={imgSrc}
		{alt}
		onerror={() => (error = true)}
		class={' ' + classes}
		data-provider={provider}
	/>
{/if}
