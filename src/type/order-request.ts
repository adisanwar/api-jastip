import {Request} from "express";
import {Order} from "@prisma/client";

export interface OrderRequest extends Request {
    order?: Order
}
