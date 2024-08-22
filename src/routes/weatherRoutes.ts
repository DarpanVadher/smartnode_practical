import { Router } from 'express';
import { getSunriseSunset } from '../controllers/weatherController';

const router = Router();

router.get('/:locationId/sunrise-sunset', getSunriseSunset);

export default router;
