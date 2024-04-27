import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import ValidateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.get('/', auth(), UserController.getUserProfile);
router.put(
  '/',
  auth(),
  ValidateRequest(userValidations.updateUserProfile),
  UserController.updateUserProfile,
);

export const userProfileRoutes = router;
