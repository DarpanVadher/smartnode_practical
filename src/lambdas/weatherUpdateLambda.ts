import mongoose from 'mongoose';
import { fetchAndStoreWeatherData } from '../services/weatherService';

const connectToDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection error:', error));
  }
};

export const weatherUpdate = async (): Promise<{ statusCode: number; body: string }> => {
  await connectToDatabase();
  await fetchAndStoreWeatherData();
  return { statusCode: 200, body: JSON.stringify({ message: 'Weather data updated successfully' }) };
};
