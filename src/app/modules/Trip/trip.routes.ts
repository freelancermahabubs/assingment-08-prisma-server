import express from 'express';

import ValidateRequest from '../../middlewares/validateRequest';
import { tripValidations } from './trip.validation';
import { TripController } from './trip.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(),
  ValidateRequest(tripValidations.createTrip),
  TripController.createTrip,
);
router.get('/', TripController.getAllTripFromDB);

export const tripRoutes = router;
