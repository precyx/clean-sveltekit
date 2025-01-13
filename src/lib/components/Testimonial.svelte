<script lang="ts">
	export let img: string = '';
	export let title: string = '';
	export let text: string = '';
</script>

<div class="flex items-start space-y-4 rounded-lg text-left">
	<!-- Image -->
	<div class="h-auto w-40 flex-shrink-0 overflow-hidden rounded-lg">
		<img src={img} alt="Product Image" class="h-auto w-full" />
	</div>

	<!-- Product Details -->
	<div class="ml-6">
		<p class="mb-2 truncate text-lg font-medium text-blue-500 dark:text-gray-100">
			{title}
		</p>
		<p class="text-base font-normal text-blue-400 dark:text-blue-200">
			{text}
		</p>
	</div>
</div>
