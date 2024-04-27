import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createUser = async (payload: User) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    email: payload.email,
    password: hashedPassword,
    name: payload.name,
  };

  const result = await prisma.$transaction(async transactionClient => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });

    await transactionClient.userProfile.create({
      data: {
        userId: createdUser.id,
        bio: '',
        age: 0,
      },
    });

    const sanitizedUserData = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };

    return sanitizedUserData;
  });

  return result;
};

const getUserProfile = async (user: any) => {
  const userId = user.userId;

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return userProfile;
};

const updateUserProfile = async (user: any, payload: string) => {
  const userId = user.userId;
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updateUserProfile = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return updateUserProfile;
};
export const userService = {
  createUser,
  getUserProfile,
  updateUserProfile,
};
