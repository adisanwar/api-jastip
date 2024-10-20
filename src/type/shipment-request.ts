import {Request} from "express";
import {Shipment} from "@prisma/client";

export interface ShipmentRequest extends Request {
    shipment?: Shipment
}
