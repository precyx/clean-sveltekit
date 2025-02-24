<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import Placeholder from '$lib/components/Placeholder.svelte';
	import { goto } from '$app/navigation';
	import type { Course } from '$lib/api/types.ts';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import { onMount } from 'svelte';
	import { getMyCourses } from '$lib/api/api';

	let courses: Course[] | null = $state(null);
	let error = $state('');
	let loading = $state(true);

	onMount(async () => {
		let loginToken = localStorage.getItem('loginToken');
		if (!loginToken) {
			goto('/login');
			return;
		}

		try {
			let result = await getMyCourses();
			courses = result.data;
		} catch (err: any) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

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
		<h1 class="mb-4 mt-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
			Mis cursos ({courses?.length})
		</h1>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if courses && courses?.length > 0}
			<div class="flex flex-wrap">
				{#each courses as course}
					<button
						class="group mb-8 grid w-[100%] grid-cols-2 gap-4 rounded-lg text-left"
						onclick={() => handleCourseClick(course)}
					>
						<ImageDisplay
							provider={course.videoPreview?.provider}
							src={course.videoPreview?.url}
							alt={course.title}
							classes={' w-[500px] rounded-lg shadow-lg inset-0 w-full object-cover'}
						></ImageDisplay>

						<!-- Product Details -->
						<div class="ml-2 lg:ml-6">
							<h2
								class="mb-1 text-productbase font-medium text-blue-500 group-hover:text-blue-400 dark:text-grey-0 dark:group-hover:text-blue-300 lg:text-lg"
							>
								{course.title}
							</h2>

							<p
								class="mb-1 text-base font-medium text-grey-300 dark:text-blue-300 lg:text-productbase"
							>
								{course.category} •
								{course?.videos?.length} videos
							</p>

							<div class="mt-4 flex">
								{#each course.products as product (product.id)}
									<div class="mb-1 text-productbase font-medium text-grey-300 dark:text-blue-300">
										{#if product?.images?.length}
											{#each product.images as image}
												<div class="mr-2">
													<ImageDisplay
														provider={image.provider}
														src={image.url}
														alt={'product'}
														classes="h-12 w-12 sm:w-16 sm:h-16 rounded-lg object-cover shadow-lg"
													/>
												</div>
											{/each}
										{/if}
									</div>
								{/each}
							</div>
						</div>
					</button>
				{/each}
			</div>
		{:else if !loading}
			<p class="text-red-500">No hay cursos</p>
		{/if}
	</div>
</main>
