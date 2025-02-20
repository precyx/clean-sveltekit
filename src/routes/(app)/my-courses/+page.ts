import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { getMyCourses } from '$lib/api/api';

export const load = async () => {
	let courses;
	let error;

	try {
		courses = await getMyCourses();
	} catch (err: any) {
		error = err.message;
	}
	return {
		courses: courses,
		error: error
	};
};
