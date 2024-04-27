import { z } from 'zod';
const createUser = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name field is required' }),
    email: z.string({ required_error: 'Email must be a valid email address' }),
    password: z.string({ required_error: 'Password is Required' }),
    profile: z.object({
      bio: z.string({ required_error: 'bio is required' }),
      age: z.number({ required_error: 'age is Required' }).int(),
    }),
  }),
});

const updateUserProfile = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name field is required' }).optional(),
    email: z.string({ required_error: 'Email must be a valid email address' }).optional(),
  }),
});

export const userValidations = {
  createUser,
  updateUserProfile
};
