<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { goto } from '$app/navigation';
	import type { Course } from '$lib/api/api.js';

	export let data;
	const { courses, error } = data;

	const handleCourseClick = (course: Course) => {
		goto(`/courses/${course.documentId}`, {
			state: {
				documentId: course.documentId
			}
		});
	};
</script>

<main>
	<h1>Available Courses</h1>

	{#if error}
		<div class="text-red-500">{error}</div>
	{:else if courses?.data?.length}
		{#each courses.data as course (course)}
			<div class="mb-4" onclick={() => handleCourseClick(course)}>
				<CourseCard {course} />
			</div>
		{/each}
	{:else}
		<p>No courses available at the moment.</p>
	{/if}
</main>
