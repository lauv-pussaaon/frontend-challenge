import axios from "axios";
import { WeatherData } from "../_lib/models";
import { unitToMetric } from "../_lib/temperatureUtil";

export type WeatherSearchParams = {
	lat: string;
	lon: string;
	unit: string;
}

export async function getWeatherByCoords (params: WeatherSearchParams): Promise<WeatherData> {
	const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

	const response = await axios.get(url + `&lat=${params.lat}&lon=${params.lon}&units=${unitToMetric(params.unit)}`);
	return response.data
}