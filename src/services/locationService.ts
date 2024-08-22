import axios from "axios";
import Weather from "../models/weatherModel";
import Location from "../models/locationModel";

import { convertTimeStringToMinutes } from "../helpers/helper_funcation";

export const fetchAllData = async (location: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		// find weather data for location from mongoDB
		// Location.find({
		// 	latitude: location.latitude,
		// 	longitude: location.longitude,
		// })
		// 	.then((data) => {
		// 		resolve(data);
		// 	})
		// 	.catch((err) => {
		// 		reject(err);
		// 	});

		Weather.aggregate([
			{
				$lookup: {
					from: "locations", // The name of the location collection (ensure it matches the actual name)
					localField: "location",
					foreignField: "_id",
					as: "locationDetails",
				},
			},
			{
				$unwind: "$locationDetails", // Deconstructs the array field
			},
			{
				$sort: {
					date: 1, // Sort by date in ascending order (use -1 for descending)
				},
			},
			{
				$project: {
					_id: 0, // Exclude the _id field from the result if not needed
					date: 1,
					sunrise: 1,
					sunset: 1,
					"locationDetails.latitude": location.latitude,
					"locationDetails.longitude": location.longitude,
				},
			},
		])
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
