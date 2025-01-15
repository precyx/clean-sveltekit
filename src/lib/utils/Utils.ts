/**
 * Sleep function to pause execution for a given number of milliseconds.
 * @param ms - Time to sleep in milliseconds
 * @returns A promise that resolves after the specified time
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/* check if the current page is a personal page */
export const isPersonalPage = (path: string) => {
	return path === '/my-courses' || path === '/profile';
};
