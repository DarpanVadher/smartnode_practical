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
exports.fetchCurrentData = exports.fetchAndStoreWeatherData = void 0;
const axios_1 = __importDefault(require("axios"));
const weatherModel_1 = __importDefault(require("../models/weatherModel"));
const locationModel_1 = __importDefault(require("../models/locationModel"));
const helper_funcation_1 = require("../helpers/helper_funcation");
const fetchAndStoreWeatherData = () => __awaiter(void 0, void 0, void 0, function* () {
    const locations = yield locationModel_1.default.find();
    for (const location of locations) {
        const { latitude, longitude } = location;
        const apiUrlForcast = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}&days=5 `;
        const forecastResponse = yield axios_1.default.get(apiUrlForcast);
        const forecastData = forecastResponse.data.forecast.forecastday;
        yield weatherModel_1.default.deleteMany({ location: location._id });
        forecastData.forEach((day) => __awaiter(void 0, void 0, void 0, function* () {
            const weather = new weatherModel_1.default({
                location: location._id,
                date: new Date(day.date),
                sunrise: (0, helper_funcation_1.convertTimeStringToMinutes)(day.astro.sunrise),
                sunset: (0, helper_funcation_1.convertTimeStringToMinutes)(day.astro.sunset),
            });
            yield weather.save();
        }));
    }
});
exports.fetchAndStoreWeatherData = fetchAndStoreWeatherData;
const fetchCurrentData = (location) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { latitude, longitude } = location;
    const apiUrlForcast = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}`;
    const forecastResponse = yield axios_1.default.get(apiUrlForcast);
    const localtimeoflocation = (_b = (_a = forecastResponse === null || forecastResponse === void 0 ? void 0 : forecastResponse.data) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.localtime;
    return localtimeoflocation || null;
});
exports.fetchCurrentData = fetchCurrentData;
