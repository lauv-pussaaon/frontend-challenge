import axios from "axios"
import { Country } from "../_lib/models";

export async function getCitiesByName (search: string, countryCode?: string) {
	const countryParam = countryCode ? `&country=${countryCode}` : '';
	const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}&types=place&limit=10${countryParam}`);
	return response.data.features || [];
}

export async function getCitiesByZip (zipCode: string, countryCode: string) {
	const response = await axios.get(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}&country=${countryCode}&types=postcode&limit=10`
	);
	return response.data.features || [];
}

export async function getCountries () {
	const countries = await axios.get(`https://restcountries.com/v3.1/all?fields=name,cca2`);
	return countries.data as Country[];
}

