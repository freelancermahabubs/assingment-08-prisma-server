import { Prisma, Trip } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../interfaces/pagination';
import { paginationHelper } from '../../../helpars/paginationHelper';
import { tripFilterAbleFields } from './trip.constant';

const createTrip = async (user: any, payload: Trip) => {
  const userId = user?.userId;
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.userId,
    },
  });

  const trip = await prisma.trip.create({
    data: { ...payload, userId },
  });
  return trip;
};

const getAllTripFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.TripWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: tripFilterAbleFields.map(field => ({
        [field]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.TripWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  const result = await prisma.trip.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    select: {
      id: true,
      userId: true,
      destination: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      updatedAt: true,
      budget: true,
      activities: true,
    },
    
  });

  const total = await prisma.trip.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const tripService = {
  createTrip,
  getAllTripFromDB,
};
