import { Request, Response } from "express";
import Location from "../models/locationModel";
import { fetchCurrentData } from "../services/weatherService";
import { fetchAllData } from "../services/locationService";
import { getGreeting } from "../helpers/helper_funcation";

export const getGreetings = async (
	req: Request,
	res: Response,
): Promise<Response<any, Record<string, any>>> => {
	const { latitude, longitude } = req.headers;

	if (!latitude || !longitude) {
		return res
			.status(400)
			.json({ message: "Latitude and longitude are required headers" });
	}

	// // console.log( req, "latitude, longitude");
	const data = await fetchCurrentData({ latitude, longitude });

	console.log(data, "data");

	return res.json({ message: getGreeting(data) });

	// res.json({ message: "Hello, World!" });
};

export const getFiveDayData = async (
	req: Request,
	res: Response,
): Promise<Response<any, Record<string, any>>> => {
	const { latitude, longitude } = req.headers;

	if (!latitude || !longitude) {
		return res
			.status(400)
			.json({ message: "Latitude and longitude are required headers" });
	}

	const data = await fetchAllData({ latitude, longitude });

	return res.json({ data: data, message: "Data fetched successfully" });
};

export const addLocation = async (
	req: Request,
	res: Response,
): Promise<Response<any, Record<string, any>>> => {
	const { latitude, longitude } = req.body;
	const location = new Location({ latitude, longitude });
	await location.save();
	return res
		.status(201)
		.json({ message: "Location added successfully", location });
};
