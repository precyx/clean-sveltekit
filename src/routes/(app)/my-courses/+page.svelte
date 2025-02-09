<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import Placeholder from '$lib/components/Placeholder.svelte';
	import { goto } from '$app/navigation';
	import type { Course } from '$lib/api/types.ts';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import { PUBLIC_STRAPI_API_URL } from '$env/static/public';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';

	export let data;
	const { courses, error } = data;

	let IMAGE_BASE = PUBLIC_STRAPI_API_URL;

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
		<h1 class="dark:text-grey-0 mb-4 mt-4 text-lg font-extrabold text-blue-500 lg:text-xl">
			Mis cursos ({courses?.data?.length})
		</h1>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if courses?.data?.length}
			<div class="flex flex-wrap">
				{#each courses.data as course}
					<button
						class="group mb-8 grid grid-cols-2 gap-4 rounded-lg text-left"
						onclick={() => handleCourseClick(course)}
					>
						<div class="group-hover:opacity-80">
							{#if course.videoPreview?.url}
								<ImageDisplay
									src={IMAGE_BASE + course.videoPreview?.url}
									alt={course.title}
									classes={' w-[500px] rounded-lg shadow-lg inset-0 w-full object-cover'}
								></ImageDisplay>
							{:else}
								<Placeholder height="auto" width="500px">No Image Available</Placeholder>
							{/if}
						</div>

						<!-- Product Details -->
						<div class="ml-2 lg:ml-6">
							<h2
								class="dark:text-grey-0 text-productbase mb-1 font-medium text-blue-500 group-hover:text-blue-400 dark:group-hover:text-blue-300 lg:text-lg"
							>
								{course.title}
							</h2>

							<p
								class="text-grey-300 lg:text-productbase mb-1 text-base font-medium dark:text-blue-300"
							>
								{course.category} •
								{course.videos.length} videos
							</p>

							<div class="mt-4 flex">
								{#each course.products as product (product.id)}
									<p class="text-grey-300 text-productbase mb-1 font-medium dark:text-blue-300">
										{#if product.images.length}
											{#each product.images as image}
												<div class="mr-2">
													<ImageDisplay
														src={IMAGE_BASE + image.url}
														alt={'product'}
														classes="h-16 w-16 rounded-lg object-cover shadow-lg"
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
