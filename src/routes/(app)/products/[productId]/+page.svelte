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

<div class="mb-2 text-productsm lg:mb-4 lg:text-base">
	<button onclick={goBack} class="flex items-center text-blue-500 hover:underline dark:text-grey-0">
		<!-- Back Arrow Icon -->
		<IconArrow direction="left" classes="text-blue-200 dark:text-grey-500 mr-2" />
		<div class="text-blue-500 dark:text-blue-300">Volver a los productos</div>
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
						class="text-mid mb-2 mt-4 font-bold italic text-blue-500 dark:text-grey-0 lg:mb-4 lg:mt-6"
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
									class="flex w-full items-center justify-center overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-80 dark:bg-grey-900"
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
									class="mb-1 mt-2 text-productsm font-medium text-blue-500 group-hover:text-blue-400 dark:text-grey-0 dark:group-hover:text-blue-300 lg:mt-4"
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
				<p class="text-productxl font-semibold text-blue-500 dark:text-grey-0">
					{product.data.title}
				</p>

				<!-- Product Category -->
				<p class="mt-2 text-productlg font-semibold text-blue-200 dark:text-grey-500">
					{product.data.category}
				</p>

				<!-- Time to Fabricate -->
				<p class="mt-2 text-productlg font-semibold text-grey-300 dark:text-blue-300">
					{product.data.subcategory}
				</p>

				<!-- Product Description -->
				<p class="dark:color-grey-100 mt-6 text-base font-medium text-grey-100">
					{product.data.description}
				</p>
			</div>
		</div>
	</div>
{:else}
	<p>no content...</p>
{/if}
