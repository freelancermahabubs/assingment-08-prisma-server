import { z } from 'zod';
const createTrip = z.object({
  body: z.object({
    destination: z.string({ required_error: 'destination is required' }),
    startDate: z.string({ required_error: 'startDate is required' }),
    endDate: z.string({ required_error: 'endDate is required' }),
    budget: z.number({ required_error: 'budget is required' }),
    activities: z.array(z.string({ required_error: 'activities is required' })),
  }),
});

export const tripValidations = {
  createTrip,
};
