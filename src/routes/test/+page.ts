import type { PageLoad } from './$types';


export const load = (() => {
	return {

		data:{

			x: "5",
		}

	};
}) satisfies PageLoad;