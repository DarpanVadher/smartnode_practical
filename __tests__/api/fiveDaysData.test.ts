import request from "supertest";
import app from "../../src/app"; // Adjust the path based on your project structure

describe("5 Days Data API", () => {
	it("should return 200 and valid 5 days data", async () => {
		const res = await request(app)
			.get("/locations/data")
			.set("latitude", "44.34")
			.set("longitude", "10.99");

		// console.log(res);

		// Test for status code 200
		expect(res.statusCode).toEqual(200);

		// Test for response content type to be application/json
		expect(res.headers["content-type"]).toMatch(/json/);

		// Test for presence of date, sunrise, sunset, and locationDetails fields
		expect(res.body).toHaveProperty("data");
		expect(Array.isArray(res.body.data)).toBe(true);

		res.body.data.forEach((item: any) => {
			expect(item).toHaveProperty("date");
			expect(item).toHaveProperty("sunrise");
			expect(item).toHaveProperty("sunset");
			expect(item).toHaveProperty("locationDetails");

			// Test for valid date format
			expect(new Date(item.date).toString()).not.toEqual("Invalid Date");

			// Test sunrise and sunset as valid numbers
			expect(Number(item.sunrise)).toBeGreaterThan(0);
			expect(Number(item.sunset)).toBeGreaterThan(0);

			// Test for non-empty locationDetails
			expect(item.locationDetails).toHaveProperty("latitude");
			expect(item.locationDetails).toHaveProperty("longitude");

			// Validate latitude and longitude
			expect(parseFloat(item.locationDetails.latitude)).not.toBeNaN();
			expect(parseFloat(item.locationDetails.longitude)).not.toBeNaN();
		});
	});
});
