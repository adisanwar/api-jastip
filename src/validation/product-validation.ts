import { z, ZodType } from "zod";

export class ProductValidation {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(50),
        image_url: z.string().min(1).max(100).optional(),
        description: z.string().min(1).max(255).optional(),
        price : z.number().optional(),
        stok: z.number().optional(),
        store_id: z.string().min(1).max(100),
        category_id: z.string().min(1).max(100)
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
        image_url: z.string().min(1).max(100).optional(),
        description: z.string().min(1).max(255).optional(),
        price : z.number().optional(),
        stok: z.number().optional(),
        store_id: z.string().min(1).max(100),
        category_id: z.string().min(1).max(100)
    });

}
