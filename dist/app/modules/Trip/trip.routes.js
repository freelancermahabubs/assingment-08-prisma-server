"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const trip_validation_1 = require("./trip.validation");
const trip_controller_1 = require("./trip.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(), (0, validateRequest_1.default)(trip_validation_1.tripValidations.createTrip), trip_controller_1.TripController.createTrip);
router.get('/', trip_controller_1.TripController.getAllTripFromDB);
exports.tripRoutes = router;
