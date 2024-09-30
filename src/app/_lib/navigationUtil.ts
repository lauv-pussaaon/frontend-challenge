import { City } from "./models";

export const computeCityWeatherURL = (city: City, country: string, unit: string) => {
	return `/city/${city.id}?lat=${city.center[1]}&lon=${city.center[0]}&country=${country}&unit=${unit}`;
}