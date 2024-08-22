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
exports.weatherUpdate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const weatherService_1 = require("../services/weatherService");
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState === 0) {
        yield mongoose_1.default.connect(process.env.MONGO_URI)
            .then(() => console.log('MongoDB connected successfully'))
            .catch((error) => console.error('MongoDB connection error:', error));
    }
});
const weatherUpdate = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    yield (0, weatherService_1.fetchAndStoreWeatherData)();
    return { statusCode: 200, body: JSON.stringify({ message: 'Weather data updated successfully' }) };
});
exports.weatherUpdate = weatherUpdate;
