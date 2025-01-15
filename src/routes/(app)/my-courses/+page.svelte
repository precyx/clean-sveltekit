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
		<h1 class="dark:text-grey-0 mb-4 mt-4 text-xl font-extrabold text-blue-500">
			Mis cursos ({courses?.data?.length})
		</h1>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if courses?.data?.length}
			<div class="flex flex-wrap">
				{#each courses.data as course}
					<button
						class="mb-8 grid grid-cols-2 gap-4 rounded-lg text-left"
						onclick={() => handleCourseClick(course)}
					>
						<!-- Full Image -->
						<div class="w-full overflow-hidden rounded-lg shadow-md">
							<img
								src={IMAGE_BASE + course.videos[0]?.url}
								alt={course.title}
								class="h-auto w-full object-contain"
							/>
						</div>

						<!-- Product Details -->
						<div class="">
							<h2
								class="dark:text-grey-0 text-productbase mb-1 font-medium text-blue-500 lg:text-lg"
							>
								{course.title}
							</h2>
							<p
								class="text-grey-300 lg:text-productlg text-productbase mb-1 font-normal dark:text-blue-300"
							>
								{course.Category}
							</p>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<p>No courses available at the moment.</p>
		{/if}
	</div>
</main>
