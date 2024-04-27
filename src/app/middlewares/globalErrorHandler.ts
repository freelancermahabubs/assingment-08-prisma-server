import { NextFunction, Request, Response } from 'express';

import { IGenericErrorMessage } from '../interfaces/error';
import { Prisma } from '@prisma/client';
import handleValidationError from '../errors/handleValidationError';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleClientError from '../errors/handleClientError';
import ApiError from '../errors/ApiError';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: { issues: IGenericErrorMessage[] } | IGenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    const errors = { issues: simplifiedError.errorMessages };
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = errors;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            field: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            field: '',
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message:  message,
    errorDetails: errorMessages,
  });
};

export default globalErrorHandler;
