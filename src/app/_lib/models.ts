export interface City {
	id: string;
	place_name: string;
	text: string;
	center: [number, number]; // [longitude, latitude]
	zip: string;
	zip_code: string;
	zip_code_type: string;
	weather: WeatherData;
}

export interface WeatherData {
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	rain: {
		'1h': number;
	};
	snow: {
		'1h': number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
	forecasts: ForecastData[];
}

export interface ForecastData {
	dt: number;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	clouds: {
		all: number;
	}
	wind: {
		speed: number;
		deg: number;
	};
	visibility: number;
	pop: number;
	rain: {
		'1h': number;
	};
	snow: {
		'1h': number;
	};
	sys: {
		pod: string;
	};
	dt_txt: string;
}

export interface Country {
	name: {
		common: string;
	}
	cca2: string;
}