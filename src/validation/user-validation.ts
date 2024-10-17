import {z, ZodType} from "zod";

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        username: z.string()
            .min(1)
            .max(30)
            .regex(/^\S*$/, "Username tidak boleh mengandung spasi"),  // validasi tanpa spasi
        password: z.string().min(1).max(30),
        email: z.string().min(1).max(30).optional(),
        role: z.string().min(1).max(30),
    });

    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(1).max(30).optional(),
        password: z.string().min(1).max(30).optional(),
        email: z.string().min(1).max(30).optional(),
        role: z.string().min(1).max(30).optional()
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.string().uuid().optional(),  // id sekarang opsional
        username: z.string().min(1).max(30).optional(),
        password: z.string().min(1).max(30).optional(),
        email: z.string().min(1).max(30).optional(),
        role: z.string().min(1).max(30).optional(),
        status: z.boolean().optional()
    });

}
