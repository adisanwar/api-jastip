import {Request} from "express";
import {Payment} from "@prisma/client";

export interface PaymentRequest extends Request {
    payment?: Payment
}
