import { z, ZodType } from "zod";

export class StoreValidation {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(50),
        image: z.string().min(1).max(100).optional(),
        description: z.string().min(1).max(255).optional(),
        location : z.string().min(1).max(100).optional(),
    });

    static readonly GET: ZodType = z.object({
        id: z.string().uuid()
    });

    static readonly REMOVE: ZodType = z.object({
        id: z.string().uuid()
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.string().uuid(),
        name: z.string().min(1).max(50).optional(),
        image: z.string().min(1).max(100).optional(),
        description: z.string().min(1).max(255).optional(),
        location : z.string().min(1).max(100).optional(),
    });

}
