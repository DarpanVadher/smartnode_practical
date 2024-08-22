import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import locationRoutes from "./routes/locationRoutes";
import weatherRoutes from "./routes/weatherRoutes";

import { fetchAndStoreWeatherData } from "./services/weatherService";

dotenv.config();

const app: Application = express();

mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => console.log("MongoDB connected successfully"))
	.catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json());

app.get("/trigger-weather-update", async (req, res) => {
	await fetchAndStoreWeatherData();
	return res.json({ message: "Weather data updated manually" });
});

app.use("/locations", locationRoutes);
app.use("/weather", weatherRoutes);

if (process.env.NODE_ENV !== "test") {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
export default app;
