import request from "supertest";
import app from "../../src/app"; // Adjust the path based on your project structure

describe("Location API", () => {
	it("should add a location and return 201 with valid data", async () => {
		const locationData = { latitude: 44.34, longitude: 10.99 };

		const res = await request(app).post("/locations/add").send(locationData);

		// Test for status code 201
		expect(res.statusCode).toEqual(201);

		// Test for response content type to be application/json
		expect(res.headers["content-type"]).toMatch(/json/);

		// Test for presence of location field in response
		expect(res.body).toHaveProperty("location");
		expect(res.body.location).toHaveProperty("latitude");
		expect(res.body.location).toHaveProperty("longitude");

		// Test for latitude and longitude values in the response
		expect(res.body.location.latitude).toEqual(44.34);
		expect(res.body.location.longitude).toEqual(10.99);
	});
});
