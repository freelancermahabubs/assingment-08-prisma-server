import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { authRoutes } from '../modules/Auth/auth.routes';
import { tripRoutes } from '../modules/Trip/trip.routes';
import { userProfileRoutes } from '../modules/User/userProfile.routes';
import { travelRequestRoutes } from '../modules/TravelRequest/travelRequest.routes';
import { travelbuddiesRoutes } from '../modules/TravelRequest/travelbuddies.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/register',
    route: userRoutes,
  },
  {
    path: '/login',
    route: authRoutes,
  },
  {
    path: '/trips',
    route: tripRoutes,
  },
  {
    path: '/profile',
    route: userProfileRoutes,
  },
  {
    path: '/trip',
    route: travelRequestRoutes,
  },
  {
    path: '/travel-buddies',
    route: travelbuddiesRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
