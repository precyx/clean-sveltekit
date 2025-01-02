import type { PageLoad } from './$types';
import { getArticles } from '$lib/api/api';


export const load: PageLoad =  ( async ({ fetch }) => {

  let articles;
  let error;

  try {
      articles = await getArticles();
  }
  catch(err:any) {
      error = err.message;
  }
  return {
      articles: articles,
      error: error
  }
});
