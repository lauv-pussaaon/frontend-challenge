import React from 'react'
import CityWeather from 'src/app/_components/CityWeather';
import { getForecast, getWeatherByCoords } from 'src/app/_services/apiWeather';
import { WeatherData } from 'src/app/_lib/models';
import Forecast from 'src/app/_components/Forecast';
import WeatherDetail from 'src/app/_components/WeatherDetail';
import BackButton from 'src/app/_components/BackButton';
import SearchDialog from 'src/app/_components/SearchDialog';
import TemperatureUnitOptions from 'src/app/_components/TemperatureUnitOptions';

async function page({ params, searchParams }: { params: { id: string }, searchParams: { lat: string, lon: string, unit: string } }) {

	const cityId = params.id;
	const weatherSearchParams = { 
		lat: searchParams.lat, 
		lon: searchParams.lon, 
		unit: searchParams.unit 
	};
	const [weather, forecast] = await Promise.all([getWeatherByCoords(weatherSearchParams), getForecast(weatherSearchParams)]);	
	weather.forecasts = forecast;

	return (
		<div className='flex flex-col gap-4 p-4'>
			<div className='flex items-center'>
				<div className='flex gap-4'><BackButton /></div>
				<div className='flex gap-4 flex-1 justify-end'><SearchDialog cityId={cityId} /></div>	
			</div>
			<div className='flex justify-end w-full'><TemperatureUnitOptions /></div>
			<div className='border-b pb-8'><CityWeather cityId={cityId} weather={weather} unit={weatherSearchParams.unit} /></div>			
			<div className='border-b pb-8'><Forecast forecasts={weather.forecasts} unit={weatherSearchParams.unit} /></div>
			<div className='border-b pb-8'><WeatherDetail weather={weather} /></div>
		</div>
	)
}

export default page