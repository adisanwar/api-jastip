import { z, ZodType } from "zod";

export class PaymentValidation {

    static readonly CREATE: ZodType = z.object({
        payment_method: z.string().min(1).max(20),
        payment_status: z.string().min(1).max(20),
        payment_url: z.string().min(1).max(100),
        amount: z.number().optional(),
    });

    static readonly GET: ZodType = z.object({
        id: z.string().uuid()
    });

    static readonly REMOVE: ZodType = z.object({
        id: z.string().uuid()
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.string().uuid(),
        payment_method: z.string().min(1).max(20),
        payment_status: z.string().min(1).max(20),
        payment_url: z.string().min(1).max(100),
        amount: z.number().optional(),
    });

}
