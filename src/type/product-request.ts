import {Request} from "express";
import {Product} from "@prisma/client";

export interface ProductRequest extends Request {
    product?: Product
}
