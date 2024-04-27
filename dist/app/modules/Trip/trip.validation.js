"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripValidations = void 0;
const zod_1 = require("zod");
const createTrip = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z.string({ required_error: 'destination is required' }),
        startDate: zod_1.z.string({ required_error: 'startDate is required' }),
        endDate: zod_1.z.string({ required_error: 'endDate is required' }),
        budget: zod_1.z.number({ required_error: 'budget is required' }),
        activities: zod_1.z.array(zod_1.z.string({ required_error: 'activities is required' })),
    }),
});
exports.tripValidations = {
    createTrip,
};
