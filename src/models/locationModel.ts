import mongoose, { Schema, Document } from 'mongoose';

interface ILocation extends Document {
  latitude: number;
  longitude: number;
}

const LocationSchema: Schema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

export default mongoose.model<ILocation>('Location', LocationSchema);
