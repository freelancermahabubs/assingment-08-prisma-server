import express from 'express';

import auth from '../../middlewares/auth';

import { TravelRequestControllers } from './travelRequest.controllers';

const router = express.Router();

router.post('/:tripId/request', auth(), TravelRequestControllers.travelRequest);

export const travelRequestRoutes = router;
