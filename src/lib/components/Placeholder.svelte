<script>
	export let width = '200px'; // Height of the placeholder
	export let height = 'auto'; // Height of the placeholder
	export let aspectRatio = '16/9'; // Default aspect ratio
</script>

<div
	class="relative flex w-full overflow-hidden rounded-lg bg-gray-300 text-gray-500"
	style="height: {height}; width: {width}; padding-top: calc(100% / ({aspectRatio}))"
>
	<div class="absolute inset-0 flex items-center justify-center text-center">
		<slot></slot>
	</div>
</div>
