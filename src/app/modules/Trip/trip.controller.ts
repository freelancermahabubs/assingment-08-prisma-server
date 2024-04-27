import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { tripService } from './trip.services';
import { Request } from 'express';
import pick from '../../../shared/pick';
import { tripSearchAbleFields } from './trip.constant';

const createTrip = catchAsync(async (req: Request & { user?: any }, res) => {
  const user = req.user;

  const tripData = req.body;
  const result = await tripService.createTrip(user, tripData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Trip created successfully',
    data: result,
  });
});

const getAllTripFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, tripSearchAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await tripService.getAllTripFromDB(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Trips retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const TripController = {
  createTrip,
  getAllTripFromDB,
};
