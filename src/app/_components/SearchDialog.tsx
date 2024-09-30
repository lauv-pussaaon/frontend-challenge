'use client'

import React, { useEffect, useState } from 'react'
import { IoIosPin } from "react-icons/io";
import { useRouter, useSearchParams } from 'next/navigation';
import { IoIosCloseCircleOutline } from "react-icons/io";

import { City, WeatherData } from '../_lib/models';
import { useSelectedCities } from '../_context/CitiesContext';
import { getWeatherByCoords } from '../_services/apiWeather';
import { getCitiesByName, getCitiesByZip } from '../_services/apiPlace';
import CountryList from './CountryList';

function SearchDialog({ cityId }: { cityId?: string }) {

	const [cities, setCities] = useState<City[]>([]);
	const [search, setSearch] = useState('');
	const { addCity, getCityById } = useSelectedCities();
	const router = useRouter();
	const city = cityId ? getCityById(cityId) : null;
	const unit = useSearchParams().get('unit') || 'celsius';
	const country = useSearchParams().get('country') || 'all';

	useEffect(() => {
		const fetchCities = async () => {
			if (search) {
				if (country === 'all') {
					const cities = await getCitiesByName(search, '');
					setCities(cities);		
				}	else {
					const [citiesByName, citiesByZIP] = await Promise.all([
						getCitiesByName(search, country),
						getCitiesByZip(search, country)
					]);
					const cities = [...citiesByName, ...citiesByZIP];
					setCities(cities);
				}
			} else {
				setCities([]);
			}
		}
		fetchCities();
	}, [search])

	

	const handleAddCity = async (city: City) => {
		const weather: WeatherData = await getWeatherByCoords({ lat: city.center[1].toString(), lon: city.center[0].toString(), unit: unit });
		city.weather = weather;
		addCity(city);
		setSearch('');
		if (cityId) {
			router.push(`/city/${city.id}?lat=${city.center[1]}&lon=${city.center[0]}`);
		}		
	}

	const computePlaceHolder = () => {
		if (city) {
			return city.place_name;
		} else if (country !== 'all') {
			return 'Search by city name or ZIP code';
		} else {
			return 'Search by city name';
		}
	}

	return (
		<>
			<div className="flex gap-2 w-full relative z-10">
				<IoIosCloseCircleOutline 
					className={`cursor-pointer absolute right-4 top-2 font-bold text-2xl text-gray-500 ${search ? 'visible' : 'invisible'}`}
					onClick={() => setSearch('')} />
				<CountryList />
				<input 
				type="text" 
				value={search} 
				placeholder={computePlaceHolder()}
				onChange={(e) => setSearch(e.target.value)} 
				onKeyDown={(e) => {
					if (e.key === 'Escape') {
						setSearch('');
					}
				}}
				className="border border-gray-300 rounded-md py-2 pl-4 pr-10 w-full"
				tabIndex={0} />							
				<ul className='absolute top-[45px] left-0 w-full flex flex-col gap-2 justify-start items-start bg-white h-max-[320px] overflow-y-scroll rounded-md'>
					{cities.map((city: any) => (
						<li 
							className='w-full' 
							key={city.id} 
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleAddCity(city)
								}
							}}>
							<div 
								className='cursor-pointer hover:bg-gray-100 p-4 flex gap-2 items-center relative border-b border-gray-300' 
								onClick={() => handleAddCity(city) }>									
								<IoIosPin className='flex-shrink-0 text-xl'/>			
								<span className='line-clamp-2'>{city.place_name}</span>
							</div>
						</li>
					))}
				</ul>				
			</div>	
			{cities.length > 0 && (
				<div className="fixed inset-0 bg-black opacity-30 z-0"></div>
			)}			
		</>
	)
}

export default SearchDialog