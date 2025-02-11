<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import ArrowIcon from '$lib/icons/IconArrow.svelte';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';

	export let data;
	let { video, course, error, courseId } = data;

	const goBack = () => {
		const currentPath = page.url.pathname; // Get the current URL path
		const pathSegments = currentPath.split('/'); // Split the path into segments

		// Construct the backlink to the course detail page
		const backLink = `/my-courses/${pathSegments[2]}`;

		goto(backLink); // Navigate back to the course page
	};

	const goToMyCourses = () => {
		goto('/my-courses'); // Navigate back to course list
	};
</script>

<div class="mb-1">
	<div class="text-productsm mt-4 flex flex-wrap items-center lg:text-base">
		<button
			onclick={goToMyCourses}
			class="mr-3 flex items-center text-blue-500 hover:underline dark:text-blue-300"
		>
			Mis Cursos
		</button>

		<div class="mr-2">
			<ArrowIcon direction="right" classes="text-blue-200 dark:text-grey-500" />
		</div>
		<button
			onclick={goBack}
			class="mr-2 flex items-center text-blue-500 hover:underline dark:text-blue-300"
		>
			{course?.data.title}
		</button>
		<div class="mr-2">
			<ArrowIcon direction="right" classes="text-blue-200 dark:text-grey-500" />
		</div>

		<div class="dark:text-grey-500 text-blue-200">
			{#if video?.data}
				{video.data.lessonNumber}. {video.data.title}
			{/if}
		</div>
	</div>
</div>

{#if error}
	<div class="text-red-500">{error}</div>
{:else if video?.data}
	<div class="">
		<div class="mb-4">
			<h1 class="dark:text-grey-0 text-lg font-bold text-blue-500 lg:text-xl">
				{video.data.lessonNumber}. {video.data.title}
			</h1>
		</div>
		<ImageDisplay
			provider={video?.data?.video?.provider}
			src={`${video?.data?.video?.url}`}
			alt={video.data.title}
			classes="mb-8 w-full rounded-lg object-cover"
		/>
	</div>
{:else}
	<p>no content...</p>
{/if}
