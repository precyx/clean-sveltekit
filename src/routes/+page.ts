import type { PageLoad } from './$types';
import { fetchAPI } from '$lib/api/api';

//export const ssr = false;
//export const ssr = true;  // Ensure SSR is enabled



export const load: PageLoad =  ( async ({ fetch }) => {

    const response = await fetchAPI('articles', fetch);

    return {
      articles: response.data || [],
      cars: ["a","b"]
    };
  });
