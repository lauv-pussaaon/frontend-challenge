import { City } from "./models";

export const computeCityWeatherURL = (city: City, unit: string, country: string) => {
	return `/city/${city.id}?lat=${city.center[1]}&lon=${city.center[0]}&unit=${unit}&country=${country}`;
}