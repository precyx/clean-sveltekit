import { goto } from '$app/navigation';
import { browser } from '$app/environment';

export const load = async () => {

    if (browser) {
        const token = localStorage.getItem('token');
        if (!token) {
            goto('/login');
        }
    }
};