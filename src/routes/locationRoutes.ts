import { Router } from "express";
import {
	addLocation,
	getGreetings,
	getFiveDayData,
} from "../controllers/locationController";

const router = Router();

router.get("/", getGreetings);
router.get("/data", getFiveDayData);
router.post("/add", addLocation);

export default router;
