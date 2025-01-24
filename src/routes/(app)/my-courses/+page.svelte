<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { goto } from '$app/navigation';
	import type { Course } from '$lib/api/api.js';

	export let data;
	const { courses, error } = data;

	let IMAGE_BASE = 'http://localhost:1337';

	const handleCourseClick = (course: Course) => {
		goto(`/my-courses/${course.documentId}`, {
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
								src={IMAGE_BASE + course.videoPreview?.url}
								alt={course.title}
								class="h-auto w-full object-contain"
							/>
						</div>

						<!-- Product Details -->
						<div class="">
							<h2 class="dark:text-grey-0 mb-1 text-lg font-medium text-blue-500">
								{course.title}
							</h2>

							<p class="text-grey-300 text-productbase mb-1 font-medium dark:text-blue-300">
								{course.category} •
								{course.videos.length} videos
							</p>

							<div class="mt-4 flex">
								{#each course.products as product (product.id)}
									<p class="text-grey-300 text-productbase mb-1 font-medium dark:text-blue-300">
										{#if product.images.length}
											{#each product.images as image}
												<div class="mr-2">
													<img
														src={IMAGE_BASE + image.url}
														alt={image.alternativeText}
														class="h-16 w-16 rounded-lg object-cover shadow-lg"
													/>
												</div>
											{/each}
										{/if}
									</p>
								{/each}
							</div>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<p>No courses available at the moment.</p>
		{/if}
	</div>
</main>
