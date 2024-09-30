import { City } from "./models";

export const computeCityWeatherURL = (city: City) => {
	return `/city/${city.id}?lat=${city.center[1]}&lon=${city.center[0]}`;
}