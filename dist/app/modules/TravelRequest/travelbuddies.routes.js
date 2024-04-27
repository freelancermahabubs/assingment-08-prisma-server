"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelbuddiesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const travelRequest_controllers_1 = require("./travelRequest.controllers");
const router = express_1.default.Router();
router.get('/:tripId', (0, auth_1.default)(), travelRequest_controllers_1.TravelRequestControllers.getPotentialTravelBuddies);
router.put('/:buddyId/respond', (0, auth_1.default)(), travelRequest_controllers_1.TravelRequestControllers.respondToTravelBuddyRequest);
exports.travelbuddiesRoutes = router;
