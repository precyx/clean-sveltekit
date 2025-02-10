<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Formula from '$lib/components/Formula.svelte';
	import Placeholder from '$lib/components/Placeholder.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import type { Product, Video, Course, Formula as FormulaType } from '$lib/api/types.ts';
	import { sleep } from '$lib/utils/Utils.js';
	import ArrowIcon from '$lib/icons/IconArrow.svelte';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';

	export let data;
	let { course, error, courseId } = data;

	let firstProduct: Product | undefined = course?.data?.products?.[0];
	let firstFormula: FormulaType | undefined = firstProduct?.formulas?.[0];

	console.log('x course', course);

	const goBack = () => {
		goto('/my-courses'); // Navigate back to course list
	};

	const handleProductClick = () => {};

	let expanded = false;
	let element: HTMLElement | null = null; // Reference to the HTML element
	let baseHeight = 0;
	let mounted = false;

	onMount(async () => {
		if (element) {
			await sleep(100);
			baseHeight = element.offsetHeight + 80;
			mounted = true;
		}
	});

	const handleExpand = () => {
		expanded = !expanded;
	};

	const handleVideoClick = (video: Video) => {
		const currentUrl = page.url.pathname;
		goto(`${currentUrl}/video/${video.documentId}`, { replaceState: false });
	};
</script>

{#if error}
	<div class="text-red-500">{error}</div>
{:else if course?.data}
	<div class="">
		<div class="text-productsm mb-1 mt-4 flex flex-wrap items-center lg:text-base">
			<button
				onclick={goBack}
				class="mr-3 flex items-center text-blue-500 hover:underline dark:text-blue-300"
			>
				Mis Cursos
			</button>

			<div class="mr-2">
				<ArrowIcon direction="right" classes="text-blue-200 dark:text-grey-500" />
			</div>

			<div class="dark:text-grey-500 text-blue-200">
				{course?.data?.title}
			</div>
		</div>

		<div class="mb-4">
			<p class="dark:text-grey-0 mt-2 text-lg font-bold tracking-tight text-blue-500 lg:text-xl">
				{course?.data?.title}
			</p>
		</div>

		<!-- Product Detail Layout -->
		<div class="grid w-[100%] grid-cols-1 items-start gap-16 md:grid-cols-2">
			<!-- Product Image -->
			<div>
				<div class="dark:text-grey-0 mb-4 mb-4 text-sm font-bold italic text-blue-500 lg:text-lg">
					Videos ({course?.data?.videos?.length})
				</div>

				{#if course?.data?.videos?.length}
					<div
						class={'relative overflow-y-hidden transition-all duration-300 ease-in-out '}
						id="expandable-content"
						bind:this={element}
						style={!mounted
							? 'opacity:0;'
							: `height: ${expanded ? baseHeight : '350'}px; opacity: 1;`}
					>
						<!-- {#each course.data.videos}-->
						{#each course.data.videos as video}
							<!-- 2 columns -->
							<button
								class=" group mb-4 grid w-[100%] grid-cols-2 gap-4"
								onclick={() => {
									handleVideoClick(video);
								}}
							>
								<ImageDisplay
									provider={video.video?.provider}
									src={video.video?.url}
									alt={video.title}
									classes="w-full rounded-lg object-cover rounded-lg hover:opacity-80"
								/>

								<div
									class="dark:text-grey-0 flex text-left font-medium text-blue-500 group-hover:text-blue-400"
								>
									<p>
										{video.lessonNumber}. {video.title}
									</p>
								</div>
							</button>
						{/each}

						{#if baseHeight > 350}
							<button
								class="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 transform rounded-full bg-blue-500 px-8 py-1 text-white shadow-md hover:bg-blue-400"
								onclick={handleExpand}
							>
								{#if expanded}
									Ver menos
								{:else}
									Ver mas
								{/if}
							</button>
						{/if}

						<!-- Adaptive Gradient Overlay -->
						<div class="absolute absolute bottom-0 left-0 right-0 h-[100px]">
							<!-- Light Mode Gradient -->
							<div
								class="h-full w-full bg-gradient-to-b from-[rgba(240,252,255,0)] via-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,1)] dark:hidden"
							></div>

							<!-- Dark Mode Gradient -->
							<!-- Dark Mode Gradient -->
							<div
								class="hidden h-full w-full bg-gradient-to-t from-[rgba(38,40,43,1)] via-[rgba(38,40,43,0.2)] to-[rgba(38,40,43,0)] dark:block"
							></div>
						</div>
					</div>
				{/if}
				<div class="mt-8">
					<!-- Product Description -->
					<p class="dark:text-grey-100 text-grey-500 mt-6 text-base font-medium">
						<RichText content={course.data.description}></RichText>
					</p>
				</div>
			</div>

			<!-- Product Info -->
			{#if firstFormula}
				<div>
					<div class="">
						<Formula formula={firstFormula} product={firstProduct}></Formula>
					</div>

					<div class="mt-8">
						<div class="dark:text-grey-0 mb-2 text-sm font-bold italic text-blue-500 lg:text-lg">
							Ingredientes ({firstFormula?.FormulaItem?.length})
						</div>
						{#each firstFormula.FormulaItem as item (item.id)}
							<div class="dark:text-grey-0 flex font-medium text-blue-500">
								<div class="mt-4 flex">
									{#if item.image}
										<ImageDisplay
											provider={item.image.provider}
											src={item.image.url}
											alt={item.title}
											classes="h-24 w-24 rounded-lg object-cover shadow-lg"
										/>
									{:else}
										<div
											class="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-200 text-gray-500 shadow-lg"
										>
											No Image
										</div>
									{/if}
									<div class="ml-6">
										<div>
											{item.title}
										</div>
										<div class="dark:text-grey-300 text-blue-400">
											{item.category}
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<p>no content...</p>
{/if}
