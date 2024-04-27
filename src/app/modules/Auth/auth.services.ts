import prisma from '../../../shared/prisma';
import * as bcrypt from 'bcrypt';
import { jwtHelpers } from '../../../helpars/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const logInUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password incorrect!');
  }
  const token = jwtHelpers.generateToken(
    {
      email: userData.email,
      userId: userData.id
    },
    config.jwt.jwt_secret_key as Secret,
    config.jwt.expires_in as string,
  );

  const response = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    token: token,
  };

  return response;
};

export const AuthServices = {
  logInUser,
};
