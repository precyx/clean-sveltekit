<script lang="ts">
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import { goto } from '$app/navigation';
	import type { Course } from '$lib/api/types.ts';
	import { on } from 'svelte/events';
	import { onMount } from 'svelte';
	import { getMyCoursesShort } from '$lib/api/api';
	import IconCheck from '$lib/icons/IconCheck.svelte';

	export let data;
	const { courses, error } = data;

	let myCourseIds: string[] = [];

	const handleCourseClick = (course: Course) => {
		goto(`/courses/${course.documentId}`, {
			state: {
				documentId: course.documentId
			}
		});
	};

	onMount(async () => {
		let _myCourses = await getMyCoursesShort();
		let _myCourseIds = _myCourses.data.map((course) => course.documentId);
		myCourseIds = _myCourseIds;
	});
</script>

<main>
	<div class="mx-auto max-w-screen-xl">
		<h1 class="mb-2 mb-4 mt-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">
			Nuestros Cursos ({courses?.data?.length})
		</h1>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if courses?.data?.length}
			<div class="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
				{#each courses.data as course}
					<button class="group rounded-lg text-left" onclick={() => handleCourseClick(course)}>
						<!-- Full Image -->
						<div
							class="flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-md group-hover:opacity-80 dark:bg-grey-900"
						>
							<ImageDisplay
								provider={course.videoPreview?.provider}
								src={course.videoPreview?.url}
								alt={course.title}
								classes={'h-[200px] inset-0 w-full object-cover'}
							></ImageDisplay>
						</div>

						<!-- Product Details -->
						<h2
							class="mb-1 mt-4 font-medium text-blue-500 group-hover:text-blue-400 dark:text-grey-0 dark:group-hover:text-blue-300"
						>
							{course.title}
						</h2>
						<p class="mb-1 text-base font-normal text-grey-300 dark:text-grey-500">
							{course.category}
						</p>
						<div class="flex items-center">
							<p class="text-base font-medium text-green-300 dark:text-green-100">
								$ {course.price}
							</p>
							{#if myCourseIds.includes(course.documentId)}
								<div class="ml-3 flex">
									<div
										class="flex rounded-full border border-green-300 px-2 py-[1px] text-productxs text-green-300 dark:border-green-100 dark:text-green-100"
									>
										<IconCheck classes={'w-[12px] text-green-300 dark:text-green-100 mr-1'}
										></IconCheck>
										<p>Comprado</p>
									</div>
								</div>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<p>No courses available at the moment.</p>
		{/if}
	</div>
</main>
