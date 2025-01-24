<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let IMAGE_BASE = 'http://localhost:1337';

	export let data;
	let { video, course, error, courseId } = data;

	const goBack = () => {
		const currentPath = page.url.pathname; // Get the current URL path
		const pathSegments = currentPath.split('/'); // Split the path into segments

		console.log('pathSegments', pathSegments);

		// Construct the backlink to the course detail page
		const backLink = `/my-courses/${pathSegments[2]}`;

		goto(backLink); // Navigate back to the course page
	};

	const goToMyCourses = () => {
		goto('/my-courses'); // Navigate back to course list
	};
</script>

<div class="mb-6">
	<div class="flex items-center">
		<button
			onclick={goToMyCourses}
			class="dark:text-grey-0 mr-3 flex items-center text-blue-500 hover:underline"
		>
			Mis Cursos
		</button>
		<div></div>

		<button
			onclick={goBack}
			class="dark:text-grey-0 flex items-center text-blue-500 hover:underline"
		>
			<!-- Back Arrow Icon -->
			<svg
				class="mr-2 h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
				></path>
			</svg>

			{course?.data.title}
		</button>
	</div>
</div>

{#if error}
	<div class="text-red-500">{error}</div>
{:else if video?.data}
	<div class="">
		<div>
			<h1 class="dark:text-grey-0 text-xl font-bold text-blue-500">{video.data.title}</h1>
		</div>
		<img
			src={`${IMAGE_BASE}${video.data.video.url}`}
			alt={video.data.title}
			class="mb-8 w-full rounded-lg object-cover"
		/>
	</div>
{:else}
	<p>no content...</p>
{/if}
