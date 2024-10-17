import {z, ZodType} from "zod";

export class ContactValidation {

    static readonly CREATE : ZodType = z.object({
        fullname: z.string().min(1).max(50),
        image: z.string().min(1).max(50).optional(),
        phone: z.string().min(1).max(15).optional(),
        no_nik: z.string().min(1).max(20).optional(),
        gender: z.string().min(1).max(10).optional(),
        birth : z.date().optional(),
    });

    static readonly UPDATE : ZodType = z.object({
        id: z.number().positive().optional(),
        fullname: z.string().min(1).max(50),
        image: z.string().min(1).max(50).optional(),
        phone: z.string().min(1).max(15).optional(),
        no_nik: z.string().min(1).max(20).optional(),
        gender: z.string().min(1).max(10).optional(),
        birth : z.date().optional(),
    });

    static readonly SEARCH : ZodType = z.object({
        fullname: z.string().min(1).optional(),
        phone: z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })

}
