"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherController_1 = require("../controllers/weatherController");
const router = (0, express_1.Router)();
router.get('/:locationId/sunrise-sunset', weatherController_1.getSunriseSunset);
exports.default = router;
