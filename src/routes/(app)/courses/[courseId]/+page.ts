import type { PageLoad } from './$types';
import { getCourse } from '$lib/api/api';

export const load: PageLoad = async ({ params, fetch }) => {
	const { courseId } = params;

	let course;
	let error;

	try {
		course = await getCourse(courseId);
	} catch (err: any) {
		error = err.message;
	}
	return {
		course: course,
		error: error,
		courseId: courseId
	};
};
