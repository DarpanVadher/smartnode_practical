"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllData = void 0;
const weatherModel_1 = __importDefault(require("../models/weatherModel"));
const fetchAllData = (location) => __awaiter(void 0, void 0, void 0, function* () {
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
        weatherModel_1.default.aggregate([
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
});
exports.fetchAllData = fetchAllData;
