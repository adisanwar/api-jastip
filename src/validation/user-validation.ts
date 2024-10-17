import {z, ZodType} from "zod";

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(30),
        password: z.string().min(1).max(30),
        email: z.string().min(1).max(30).optional(),
        role: z.string().min(1).max(30),
    });

    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(1).max(30),
        password: z.string().min(1).max(30),
        email: z.string().min(1).max(30).optional(),
        role: z.string().min(1).max(30),
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.string().uuid(),
        username: z.string().min(1).max(30),
        password: z.string().min(1).max(30),
        email: z.string().min(1).max(30).optional(),
        role: z.string().min(1).max(30),
    });

}
