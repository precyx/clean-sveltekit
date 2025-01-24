<script lang="ts">
	export let src: string; // Image source URL
	export let alt: string = ''; // Alt text for accessibility
	export let classes: string = ''; // Optional additional classes
</script>

<!--
	<div
	class={` flex h-[350px] w-[500px] items-center justify-center overflow-hidden rounded-lg bg-gray-200 ${classes}`}
	>
	<img {src} {alt} class=" inset-0 h-full w-full object-cover" />
</div>
-->

<img {src} {alt} class={' inset-0 w-full object-cover ' + classes} />
