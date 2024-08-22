import mongoose, { Schema, Document } from 'mongoose';

interface IWeather extends Document {
  location: mongoose.Types.ObjectId;
  date: Date;
  sunrise: string;
  sunset: string;
}

const WeatherSchema: Schema = new Schema({
  location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  date: { type: Date, required: true },
  sunrise: { type: String, required: true },
  sunset: { type: String, required: true }
});

export default mongoose.model<IWeather>('Weather', WeatherSchema);
