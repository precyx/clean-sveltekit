<script lang="ts">
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import { goto } from '$app/navigation';
	import type { Course } from '$lib/api/types.ts';
	import { PUBLIC_STRAPI_API_URL } from '$env/static/public';

	export let data;
	const { courses, error } = data;

	let IMAGE_BASE = PUBLIC_STRAPI_API_URL;

	const handleCourseClick = (course: Course) => {
		goto(`/courses/${course.documentId}`, {
			state: {
				documentId: course.documentId
			}
		});
	};
</script>

<main>
	<div class="mx-auto max-w-screen-xl">
		<h1 class="dark:text-grey-0 mb-2 mb-4 mt-4 text-lg font-extrabold text-blue-500 lg:text-xl">
			Nuestros Cursos
		</h1>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if courses?.data?.length}
			<div class="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
				{#each courses.data as course}
					<button class="group rounded-lg text-left" onclick={() => handleCourseClick(course)}>
						<!-- Full Image -->
						<div
							class="dark:bg-grey-900 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-md group-hover:opacity-80"
						>
							{#if course.videoPreview?.url}
								<ImageDisplay
									src={IMAGE_BASE + course.videoPreview?.url}
									alt={course.title}
									classes={'h-[200px] inset-0 w-full object-cover'}
								></ImageDisplay>
							{:else}
								<div class="flex h-40 w-full items-center justify-center bg-gray-300">
									<p class="text-gray-500">No Image Available</p>
								</div>
							{/if}
						</div>

						<!-- Product Details -->
						<h2
							class="dark:text-grey-0 mb-1 mt-4 font-medium text-blue-500 group-hover:text-blue-400 dark:group-hover:text-blue-300"
						>
							{course.title}
						</h2>
						<p class="text-grey-300 dark:text-grey-500 mb-1 text-base font-normal">
							{course.category}
						</p>
						<p class="mb-1 text-base font-medium text-green-300 dark:text-green-100">
							$ {course.price}
						</p>
					</button>
				{/each}
			</div>
		{:else}
			<p>No courses available at the moment.</p>
		{/if}
	</div>
</main>
