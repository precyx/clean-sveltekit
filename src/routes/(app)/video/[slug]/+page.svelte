<script lang="ts">
	import { goto } from '$app/navigation';

	let IMAGE_BASE = 'http://localhost:1337';

	const goBack = () => {
		goto('/my-courses'); // Navigate back to course list
	};

	export let data;
	let { video, error, slug } = data;

	console.log('viddd', video);
</script>

<div class="mb-6">
	<button onclick={goBack} class="dark:text-grey-0 flex items-center text-blue-500 hover:underline">
		<!-- Back Arrow Icon -->
		<svg
			class="mr-2 h-5 w-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
			></path>
		</svg>
		Back to Courses
	</button>
</div>

{#if error}
	<div class="text-red-500">{error}</div>
{:else if video?.data}
	<div class="">
		<div>
			<h1 class="text-xl font-bold text-blue-500">{video.data.title}</h1>
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
