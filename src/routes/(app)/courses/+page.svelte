<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { goto } from '$app/navigation';
	import type { Course } from '$lib/api/api.js';

	export let data;
	const { courses, error } = data;

	console.log('courses', courses);

	let IMAGE_BASE = 'http://localhost:1337';

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
		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if courses?.data?.length}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each courses.data as course}
					<div class="rounded-lg text-left" onclick={() => handleCourseClick(course)}>
						<!-- Full Image -->
						<div class="w-full overflow-hidden rounded-lg shadow-md">
							<img
								src={IMAGE_BASE + course.videos[0]?.url}
								alt={course.title}
								class="h-auto w-full object-contain"
							/>
						</div>

						<!-- Product Details -->
						<h2 class="text-primary-light dark:text-primary-dark mb-1 mt-4 font-semibold">
							{course.title}
						</h2>
						<p class="text-tertiary-light dark:text-tertiary-dark mb-1 font-semibold">
							{course.category}
						</p>
						<p class="text-quartiary-light dark:text-quartiary-dark font-semibold">
							{course.subcategory}
						</p>
					</div>
				{/each}
			</div>
		{:else}
			<p>No courses available at the moment.</p>
		{/if}
	</div>
</main>
