import express from 'express';
import { AuthController } from './auth.controllers';

const router = express.Router();
router.post('/', AuthController.logInUser);

export const authRoutes = router;
