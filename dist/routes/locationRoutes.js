"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationController_1 = require("../controllers/locationController");
const router = (0, express_1.Router)();
router.get("/", locationController_1.getGreetings);
router.get("/data", locationController_1.getFiveDayData);
router.post("/add", locationController_1.addLocation);
exports.default = router;
