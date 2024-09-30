import axios from "axios"

const fetchLimit = 10;

export async function getCitiesByName (search: string) {
	const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}&types=place&limit=${fetchLimit}`);
	return response.data.features || [];
}
