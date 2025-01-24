import type { PageLoad } from './$types';
import { getVideo } from '$lib/api/api';

export const load: PageLoad = async ({ params, fetch }) => {
	const { slug } = params;

	let video;
	let error;

	try {
		video = await getVideo(slug);
		console.log('video', video);
	} catch (err: any) {
		error = err.message;
	}
	return {
		video: video,
		error: error,
		slug: slug
	};
};
