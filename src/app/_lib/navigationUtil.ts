import { City } from "./models";

export type CityWeatherURLParams = {
	id: string;
	lat: string;
	lon: string;
	unit: string;
	country: string;
}

export const computeCityWeatherURL = (params: CityWeatherURLParams) => {
	return `/city/${params.id}?lat=${params.lat}&lon=${params.lon}&unit=${params.unit}&country=${params.country}`;
}