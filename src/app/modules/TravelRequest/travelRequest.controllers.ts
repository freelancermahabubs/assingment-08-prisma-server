import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { travelRequestService } from './travelRequest.services';

const travelRequest = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const { userId } = req.body;
  const result = await travelRequestService.createTravelRequest(tripId, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Travel buddy request sent successfully',
    data: result,
  });
});
const getPotentialTravelBuddies = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const result = await travelRequestService.getPotentialTravelBuddies(tripId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Potential travel buddies retrieved successfully',
    data: result,
  });
});

const respondToTravelBuddyRequest = catchAsync(async (req, res) => {
  const { buddyId } = req.params;
  const result = await travelRequestService.respondToTravelBuddyRequest(
    buddyId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Travel buddy request responded successfully',
    data: result,
  });
});

export const TravelRequestControllers = {
  travelRequest,
  getPotentialTravelBuddies,
  respondToTravelBuddyRequest,
};
