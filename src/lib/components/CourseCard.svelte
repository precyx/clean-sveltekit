<script lang="ts">
	import type { Course } from '$lib/api/api';

	export let course: Course;

	function enroll(courseId: number) {
		window.location.href = `/checkout/${courseId}`;
	}
</script>

<div
	class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
>
	<div class="p-6">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">
			{course.title}
		</h2>
		<p class="mt-2 text-gray-600 dark:text-gray-400">
			{course.description}
		</p>

		{#if course.fullContent}
			<div class="content-section mt-6">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Course Content:</h3>
				<div class="prose dark:prose-invert mt-2">
					{@html course.fullContent}
				</div>
			</div>
		{:else}
			<div class="public-section mt-6">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Course Preview:</h3>
				<div class="prose dark:prose-invert mt-2">
					{@html course.publicContent}
				</div>
				<p class="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
					<strong>Price:</strong> ${course.price}
				</p>
				<button
					onclick={() => enroll(course.id)}
					class="hover:bg-grey-0 dark:focus:ring-grey-0 mt-4 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Enroll Now
				</button>
			</div>
		{/if}
	</div>
</div>

<style></style>
