import { Request, Response } from 'express';
import Weather from '../models/weatherModel';

export const getSunriseSunset = async (req: Request, res: Response): Promise<void> => {
  const locationId = req.params.locationId;
  const weatherData = await Weather.find({ location: locationId }).sort({ date: 1 }).limit(5);
  res.json(weatherData);
};
