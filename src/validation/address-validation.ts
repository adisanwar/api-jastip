import {z, ZodType} from "zod";

export class AddressValidation {

    static readonly CREATE : ZodType = z.object({
        contact_id: z.string().uuid(),
        street: z.string().min(1).max(255).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postalCode: z.string().min(1).max(10),
    })

    static readonly GET : ZodType = z.object({
        contact_id: z.string().uuid(),
        id: z.string().uuid(),
    })

    static readonly REMOVE : ZodType = z.object({
        contact_id: z.string().uuid(),
        id: z.string().uuid(),
    })

    static readonly UPDATE : ZodType = z.object({
        id: z.string().uuid(),
        contact_id: z.string().uuid(),
        street: z.string().min(1).max(255).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postalCode: z.string().min(1).max(10),
    })

}
