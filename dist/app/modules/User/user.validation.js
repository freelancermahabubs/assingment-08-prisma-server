"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name field is required' }),
        email: zod_1.z.string({ required_error: 'Email must be a valid email address' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
        profile: zod_1.z.object({
            bio: zod_1.z.string({ required_error: 'bio is required' }),
            age: zod_1.z.number({ required_error: 'age is Required' }).int(),
        }),
    }),
});
const updateUserProfile = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name field is required' }).optional(),
        email: zod_1.z.string({ required_error: 'Email must be a valid email address' }).optional(),
    }),
});
exports.userValidations = {
    createUser,
    updateUserProfile
};
