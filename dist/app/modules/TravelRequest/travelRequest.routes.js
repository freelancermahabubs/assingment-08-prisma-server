"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const travelRequest_controllers_1 = require("./travelRequest.controllers");
const router = express_1.default.Router();
router.post('/:tripId/request', (0, auth_1.default)(), travelRequest_controllers_1.TravelRequestControllers.travelRequest);
exports.travelRequestRoutes = router;
