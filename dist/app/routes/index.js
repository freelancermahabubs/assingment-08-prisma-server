"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const trip_routes_1 = require("../modules/Trip/trip.routes");
const userProfile_routes_1 = require("../modules/User/userProfile.routes");
const travelRequest_routes_1 = require("../modules/TravelRequest/travelRequest.routes");
const travelbuddies_routes_1 = require("../modules/TravelRequest/travelbuddies.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/register',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/login',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/trips',
        route: trip_routes_1.tripRoutes,
    },
    {
        path: '/profile',
        route: userProfile_routes_1.userProfileRoutes,
    },
    {
        path: '/trip',
        route: travelRequest_routes_1.travelRequestRoutes,
    },
    {
        path: '/travel-buddies',
        route: travelbuddies_routes_1.travelbuddiesRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
