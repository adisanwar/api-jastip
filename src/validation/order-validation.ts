import { z, ZodType } from "zod";

export class OrderValidation {

    static readonly CREATE: ZodType = z.object({
        qty: z.number(),
        total_price: z.number(),
        status: z.string().min(1).max(255),
        order_id: z.string().min(1).max(255),
        product_id: z.string().min(1).max(100),
    });

    static readonly GET: ZodType = z.object({
        id: z.string().uuid()
    });

    static readonly REMOVE: ZodType = z.object({
        id: z.string().uuid()
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.string().uuid(),
        qty: z.number(),
        total_price: z.number(),
        status: z.string().min(1).max(255),
        order_id: z.string().min(1).max(100),
        user_id: z.string().min(1).max(100),
        product_id: z.string().min(1).max(100),
    });

}
