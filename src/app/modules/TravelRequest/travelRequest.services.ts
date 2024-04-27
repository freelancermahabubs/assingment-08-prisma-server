import { TravelStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

const createTravelRequest = async (tripId: string, userId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip not found');
  }

  // Create travel buddy request
  const travelBuddyRequest = await prisma.travelBuddyRequest.create({
    data: {
      tripId: tripId,
      userId: userId,
      status: TravelStatus.PENDING,
    },
  });

  return travelBuddyRequest;
};

const getPotentialTravelBuddies = async (tripId: string) => {
  try {
    const potentialBuddies = await prisma.travelBuddyRequest.findMany({
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
  } catch (error) {
    console.error('Error retrieving potential travel buddies:', error);
  }
};

const respondToTravelBuddyRequest = async (
  buddyId: string,
  payload: any,
) => {
    
  const isExistingTravelBuddy = await prisma.travelBuddyRequest.findUnique({
    where: {
      id: buddyId,
    },
  });
  if (!isExistingTravelBuddy) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Travel buddy request not found');
  }
  const updateStatusBuddy = await prisma.travelBuddyRequest.update({
    where: { id: buddyId },
    data: { status: payload.status },
  });
  return updateStatusBuddy;
};
export const travelRequestService = {
  createTravelRequest,
  getPotentialTravelBuddies,
  respondToTravelBuddyRequest,
};
