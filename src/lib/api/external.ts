import axios from 'axios';

export const getGeoInfo = async () => {
	const GEO_API = 'https://ipapi.co/json/';
	try {
		const response = await axios.get(GEO_API);
		const data = response.data;

		return {
			country: data.country_code,
			phone: data.country_calling_code
		};
	} catch (error) {
		console.error('Geolocation error:', error);
	}
	return null;
};
