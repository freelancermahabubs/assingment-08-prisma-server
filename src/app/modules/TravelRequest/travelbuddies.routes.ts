import express from 'express';

import auth from '../../middlewares/auth';

import { TravelRequestControllers } from './travelRequest.controllers';

const router = express.Router();

router.get(
  '/:tripId',
  auth(),
  TravelRequestControllers.getPotentialTravelBuddies,
);
router.put(
  '/:buddyId/respond',
  auth(),
  TravelRequestControllers.respondToTravelBuddyRequest,
);

export const travelbuddiesRoutes = router;
