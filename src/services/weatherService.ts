import axios from "axios";
import Weather from "../models/weatherModel";
import Location from "../models/locationModel";

import { convertTimeStringToMinutes } from "../helpers/helper_funcation";

export const fetchAndStoreWeatherData = async (): Promise<void> => {
	const locations = await Location.find();

	for (const location of locations) {
		const { latitude, longitude } = location;

		const apiUrlForcast = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}&days=5 `;
		const forecastResponse = await axios.get(apiUrlForcast);
		const forecastData = forecastResponse.data.forecast.forecastday;

		await Weather.deleteMany({ location: location._id });

		forecastData.forEach(async (day: any) => {
			const weather = new Weather({
				location: location._id,
				date: new Date(day.date),
				sunrise: convertTimeStringToMinutes(day.astro.sunrise),
				sunset: convertTimeStringToMinutes(day.astro.sunset),
			});
			await weather.save();
		});
	}
};

export const fetchCurrentData = async (location: any): Promise<string> => {
	const { latitude, longitude } = location;

	const apiUrlForcast = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}`;
	const forecastResponse = await axios.get(apiUrlForcast);

	const localtimeoflocation = forecastResponse?.data?.location?.localtime;

	return localtimeoflocation || null;
};
