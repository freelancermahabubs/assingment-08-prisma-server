import express from 'express';
import { UserController } from './user.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/',
  ValidateRequest(userValidations.createUser),
  UserController.createUser,
);

export const userRoutes = router;
