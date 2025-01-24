import type { PageLoad } from './$types';
import { getCourse, getVideo } from '$lib/api/api';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ params, url, fetch }) => {
	const { courseId, videoId } = params;

	let video;
	let course;
	let error;

	try {
		video = await getVideo(videoId);
		course = await getCourse(courseId);

		console.log('video', video);
	} catch (err: any) {
		error = err.message;
	}
	return {
		video: video,
		course: course,
		error: error,
		courseId: courseId,
		videoId: videoId
	};
};
