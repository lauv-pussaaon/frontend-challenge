'use client'

import React, { useEffect, useState } from 'react'
import { IoIosPin } from "react-icons/io";
import { useRouter, useSearchParams } from 'next/navigation';
import { IoIosCloseCircleOutline } from "react-icons/io";

import { City, WeatherData } from '../_lib/models';
import { useSelectedCities } from '../_context/CitiesContext';
import { getWeatherByCoords } from '../_services/apiWeather';
import { getCitiesByName } from '../_services/apiPlace';
import { computeCityWeatherURL } from '../_lib/navigationUtil';

function SearchCities({ cityId }: { cityId?: string }) {

	const [cities, setCities] = useState<City[]>([]);
	const [search, setSearch] = useState('');
	const { addCity } = useSelectedCities();
	const router = useRouter();	

	useEffect(() => {
		const fetchCities = async () => {
			if (search) {
				const cities = await getCitiesByName(search);
				setCities(cities);
			} else {
				setCities([]);
			}
		}
		fetchCities();
	}, [search])	

	const handleAddCity = async (city: City) => {
		const weather: WeatherData = await getWeatherByCoords({ 
			lat: city.center[1].toString(), 
			lon: city.center[0].toString()
		});
		city.weather = weather;
		addCity(city);
		setSearch('');
		
		const isCityView = !!cityId;		
		if (isCityView) {
			router.push(computeCityWeatherURL(city));
		}		
	}

	return (
		<div className='flex flex-col md:flex-row w-full gap-2'>			
			<div className="flex gap-2 w-full relative z-10">
				<IoIosCloseCircleOutline 
					className={`cursor-pointer absolute right-4 top-2 font-bold text-2xl text-gray-500 ${search ? 'visible' : 'invisible'}`}
					onClick={() => setSearch('')} />
				<input 
				type="text" 
				value={search} 
				placeholder="Search by city name"
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
		</div>
	)
}

export default SearchCities