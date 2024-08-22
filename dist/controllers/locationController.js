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
exports.addLocation = exports.getFiveDayData = exports.getGreetings = void 0;
const locationModel_1 = __importDefault(require("../models/locationModel"));
const weatherService_1 = require("../services/weatherService");
const locationService_1 = require("../services/locationService");
const helper_funcation_1 = require("../helpers/helper_funcation");
const getGreetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = req.headers;
    if (!latitude || !longitude) {
        res
            .status(400)
            .json({ message: "Latitude and longitude are required headers" });
        return;
    }
    // // console.log( req, "latitude, longitude");
    const data = yield (0, weatherService_1.fetchCurrentData)({ latitude, longitude });
    console.log(data, "data");
    res.json({ message: (0, helper_funcation_1.getGreeting)(data) });
    // res.json({ message: "Hello, World!" });
});
exports.getGreetings = getGreetings;
const getFiveDayData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = req.headers;
    if (!latitude || !longitude) {
        res
            .status(400)
            .json({ message: "Latitude and longitude are required headers" });
        return;
    }
    const data = yield (0, locationService_1.fetchAllData)({ latitude, longitude });
    res.json({ message: data });
});
exports.getFiveDayData = getFiveDayData;
const addLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = req.body;
    const location = new locationModel_1.default({ latitude, longitude });
    yield location.save();
    res.status(201).json({ message: "Location added successfully", location });
});
exports.addLocation = addLocation;
