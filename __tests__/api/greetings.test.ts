import request from "supertest";
import app from "../../src/app"; // Adjust the path based on your project structure

describe("Greetings API", () => {
	it("should return 200 and a valid greeting message", async () => {
		const res = await request(app)
			.get("/locations")
			.set("latitude", "44.34")
			.set("longitude", "10.99");

		// Test for status code 200
		expect(res.statusCode).toEqual(200);

		// Test for response content type to be application/json
		expect(res.headers["content-type"]).toMatch(/json/);

		// Test for presence of message field
		expect(res.body).toHaveProperty("message");
		expect(res.body.message).not.toBe("");
	});
});
