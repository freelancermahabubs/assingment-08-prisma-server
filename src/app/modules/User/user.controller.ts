import { userService } from './user.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { Request } from 'express';

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const getUserProfile = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user;

    const result = await userService.getUserProfile(user);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User profile retrieved successfully"',
      data: result,
    });
  },
);
const updateUserProfile = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user;

    const result = await userService.updateUserProfile(user, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User profile updated successfully',
      data: result,
    });
  },
);

export const UserController = {
  createUser,
  getUserProfile,
  updateUserProfile,
};
