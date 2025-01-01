export async function fetchAPI(endpoint: string, fetchOverride?: typeof fetch) {

    const fetchFn = fetchOverride || fetch;  // Use custom fetch if provided
    const api_url = import.meta.env.VITE_STRAPI_API_URL;
    const response = await fetchFn(`${api_url}/api/${endpoint}`);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    
    return response.json();
  }

  