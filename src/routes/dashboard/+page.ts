import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { getCourses } from '$lib/api/api';

export const load = async () => {

    if (browser) {
        const token = localStorage.getItem('token');
        if (!token) {
            goto('/login');
        }
    }


    let courses = await getCourses();
    console.log("courses", courses);

    return courses;
};