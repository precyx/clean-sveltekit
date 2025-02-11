<script lang="ts">
	import { goto } from '$app/navigation';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import IconArrow from '$lib/icons/IconArrow.svelte';
	import type { Course } from '$lib/api/types.ts';

	export let data;
	let { product, error, productId } = data;

	const goBack = () => {
		goto('/products');
	};

	const handleCourseClick = (course: Course) => {
		goto(`/courses/${course.documentId}`, {
			state: {
				documentId: course.documentId
			}
		});
	};
</script>

<div class="text-productsm mb-2 lg:mb-4 lg:text-base">
	<button onclick={goBack} class="dark:text-grey-0 flex items-center text-blue-500 hover:underline">
		<!-- Back Arrow Icon -->
		<IconArrow direction="left" classes="text-blue-200 dark:text-grey-500 mr-2" />
		<div class="text-blue-500 dark:text-blue-300">Back to Products</div>
	</button>
</div>

{#if error}
	<div class="text-red-500">{error}</div>
{:else if product?.data}
	<div class="">
		<!-- Product Detail Layout -->
		<div class="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
			<!-- Product Image -->

			<div>
				{#if product?.data.images && product.data.images.length}
					<div>
						<ImageDisplay
							provider={product.data.images[0]?.provider}
							src={product.data.images[0]?.url}
							alt={product.data.title}
							classes="aspect-square w-full rounded-lg object-cover"
						/>
					</div>
				{/if}
				{#if product.data.courses?.length}
					<!-- Cursos Section -->
					<div
						class="text-mid dark:text-grey-0 mb-2 mt-4 font-bold italic text-blue-500 lg:mb-4 lg:mt-6"
					>
						Cursos
					</div>
					<div
						class=" grid grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
					>
						{#each product.data.courses as course}
							<button class="group text-left" onclick={() => handleCourseClick(course)}>
								<!-- Full Image -->
								<div
									class="dark:bg-grey-900 flex w-full items-center justify-center overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-80"
								>
									<ImageDisplay
										provider={course.videoPreview?.provider}
										src={course.videoPreview?.url}
										alt={course.title}
										classes={'w-[200px] h-[100px] inset-0 w-full object-cover'}
									></ImageDisplay>
								</div>

								<!-- Product Details -->
								<h2
									class="dark:text-grey-0 text-productsm mb-1 mt-2 font-medium text-blue-500 group-hover:text-blue-400 dark:group-hover:text-blue-300 lg:mt-4"
								>
									{course.title}
								</h2>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Product Info -->
			<div class="">
				<!-- Product Title -->
				<p class="text-productxl dark:text-grey-0 font-semibold text-blue-500">
					{product.data.title}
				</p>

				<!-- Product Category -->
				<p class="text-productlg dark:text-grey-500 mt-2 font-semibold text-blue-200">
					{product.data.category}
				</p>

				<!-- Time to Fabricate -->
				<p class="text-productlg text-grey-300 mt-2 font-semibold dark:text-blue-300">
					{product.data.subcategory}
				</p>

				<!-- Product Description -->
				<p class="dark:color-grey-100 text-grey-100 mt-6 text-base font-medium">
					{product.data.description}
				</p>
			</div>
		</div>
	</div>
{:else}
	<p>no content...</p>
{/if}
