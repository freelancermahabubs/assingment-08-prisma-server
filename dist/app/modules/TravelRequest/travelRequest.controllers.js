"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelRequestControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const travelRequest_services_1 = require("./travelRequest.services");
const travelRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const { userId } = req.body;
    const result = yield travelRequest_services_1.travelRequestService.createTravelRequest(tripId, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Travel buddy request sent successfully',
        data: result,
    });
}));
const getPotentialTravelBuddies = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const result = yield travelRequest_services_1.travelRequestService.getPotentialTravelBuddies(tripId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Potential travel buddies retrieved successfully',
        data: result,
    });
}));
const respondToTravelBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buddyId } = req.params;
    const result = yield travelRequest_services_1.travelRequestService.respondToTravelBuddyRequest(buddyId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Travel buddy request responded successfully',
        data: result,
    });
}));
exports.TravelRequestControllers = {
    travelRequest,
    getPotentialTravelBuddies,
    respondToTravelBuddyRequest,
};
