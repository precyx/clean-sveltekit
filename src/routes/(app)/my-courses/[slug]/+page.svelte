<script lang="ts">
	import { goto } from '$app/navigation';
	import Formula from '$lib/components/Formula.svelte';
	import type { Formula as FormulaType } from '$lib/api/api.js';
	import type { Product } from '$lib/api/api.js';

	export let data;
	let { course, error, slug } = data;

	let firstProduct: Product | undefined = course?.data?.products?.[0];
	let firstFormula: FormulaType | undefined = firstProduct?.formulas?.[0];

	console.log('x course', course);

	let IMAGE_BASE = 'http://localhost:1337';

	const goBack = () => {
		goto('/my-courses'); // Navigate back to course list
	};

	const handleProductClick = () => {};
</script>

{#if error}
	<div class="text-red-500">{error}</div>
{:else if course?.data}
	<div class="">
		<div class="mb-1">
			<button
				onclick={goBack}
				class="dark:text-grey-0 flex items-center text-blue-500 hover:underline"
			>
				<!-- Back Arrow Icon -->
				<svg
					class="mr-2 h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
				Back to My Courses
			</button>
		</div>

		<div class="mb-4">
			<p class="dark:text-grey-0 text-xl font-bold tracking-tight text-blue-500">
				{course.data.title}
			</p>
		</div>

		<!-- Product Detail Layout -->
		<div class="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
			<!-- Product Image -->
			<div>
				<div class="dark:text-grey-0 mb-4 mb-4 text-lg font-bold italic text-blue-500">
					Videos ({course.data.videos.length})
				</div>
				<!-- {#each course.data.videos}-->
				{#each course.data.videos as video}
					<!-- 2 columns -->
					<div class="mb-4 grid grid-cols-2 gap-4">
						<div>
							<img
								src={IMAGE_BASE + video.video?.url}
								alt={video.title}
								class=" w-full rounded-lg object-cover"
							/>
						</div>
						<div class="dark:text-grey-0 flex font-medium text-blue-500">
							<p>
								{video.lessonNumber}. {video.title}
							</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- Product Info -->
			{#if firstFormula}
				<div class="">
					<Formula formula={firstFormula} product={firstProduct}></Formula>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<p>no content...</p>
{/if}
