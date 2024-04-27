import { NextFunction, Request, Response } from 'express';
import { jwtHelpers } from '../../helpars/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
const auth = () => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret_key as Secret,
      );
      req.user = verifiedUser;
  
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
