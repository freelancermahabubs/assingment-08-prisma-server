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
exports.travelRequestService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createTravelRequest = (tripId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield prisma_1.default.trip.findUnique({
        where: {
            id: tripId,
        },
    });
    if (!trip) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trip not found');
    }
    // Create travel buddy request
    const travelBuddyRequest = yield prisma_1.default.travelBuddyRequest.create({
        data: {
            tripId: tripId,
            userId: userId,
            status: client_1.TravelStatus.PENDING,
        },
    });
    return travelBuddyRequest;
});
const getPotentialTravelBuddies = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const potentialBuddies = yield prisma_1.default.travelBuddyRequest.findMany({
            where: {
                tripId: tripId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        // Prepare the response data
        const responseData = potentialBuddies.map(buddy => ({
            id: buddy.id,
            tripId: buddy.tripId,
            userId: buddy.userId,
            status: buddy.status,
            createdAt: buddy.createdAt.toISOString(),
            updatedAt: buddy.updatedAt.toISOString(),
            user: {
                name: buddy.user.name,
                email: buddy.user.email,
            },
        }));
        return responseData;
    }
    catch (error) {
        console.error('Error retrieving potential travel buddies:', error);
    }
});
const respondToTravelBuddyRequest = (buddyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistingTravelBuddy = yield prisma_1.default.travelBuddyRequest.findUnique({
        where: {
            id: buddyId,
        },
    });
    if (!isExistingTravelBuddy) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Travel buddy request not found');
    }
    const updateStatusBuddy = yield prisma_1.default.travelBuddyRequest.update({
        where: { id: buddyId },
        data: { status: payload.status },
    });
    return updateStatusBuddy;
});
exports.travelRequestService = {
    createTravelRequest,
    getPotentialTravelBuddies,
    respondToTravelBuddyRequest,
};
