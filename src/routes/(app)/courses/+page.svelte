<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { goto } from '$app/navigation';
	import type { Course } from '$lib/api/api.js';

	export let data;
	const { courses, error } = data;

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
		<h1 class="dark:text-grey-0 mb-2 mt-4 text-xl font-extrabold text-blue-500">Nuestros Cursos</h1>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if courses?.data?.length}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
				{#each courses.data as course}
					<button class="rounded-lg text-left" onclick={() => handleCourseClick(course)}>
						<!-- Full Image -->
						<div class="w-full overflow-hidden rounded-lg shadow-md">
							<img
								src={IMAGE_BASE + course.videos[0]?.url}
								alt={course.title}
								class="h-auto w-full object-contain"
							/>
						</div>

						<!-- Product Details -->
						<h2 class="dark:text-grey-0 mb-1 mt-4 font-medium text-blue-500">
							{course.title}
						</h2>
						<p class="text-grey-300 mb-1 font-normal dark:text-blue-300">
							{course.Category}
						</p>
						<p class="mb-1 font-medium text-green-300 dark:text-green-100">
							$ {course.Price}
						</p>
					</button>
				{/each}
			</div>
		{:else}
			<p>No courses available at the moment.</p>
		{/if}
	</div>
</main>
