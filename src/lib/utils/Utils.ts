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
	return path.includes('/my-courses') || path.includes('/profile');
};

export const formatDate = (date: Date) => {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
};
