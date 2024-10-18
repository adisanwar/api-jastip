import { UserRequest } from "../type/user-request";
import { Response, NextFunction } from "express";
import {
    CreateAddressRequest,
    GetAddressRequest,
    RemoveAddressRequest,
    UpdateAddressRequest
} from "../model/address-model";
import { AddressService } from "../service/address-service";
import { ResponseSuccess } from "../response/response-success";
import { ResponseError } from "../response/response-error";

export class AddressController {

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest;
            request.contact_id = String(req.params.contactId);

            const response = await AddressService.create(req.user!, request);
            res.status(201).json(ResponseSuccess.created(response, "Address created successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: GetAddressRequest = {
                id: String(req.params.addressId),
                contact_id: String(req.params.contactId),
            }

            const response = await AddressService.get(req.user!, request);
            res.status(200).json(ResponseSuccess.success(response, "Address retrieved successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateAddressRequest = req.body as UpdateAddressRequest;
            request.contact_id = String(req.params.contactId);
            request.id = String(req.params.addressId);

            const response = await AddressService.update(req.user!, request);
            res.status(200).json(ResponseSuccess.success(response, "Address updated successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: RemoveAddressRequest = {
                id: String(req.params.addressId),
                contact_id: String(req.params.contactId),
            }

            await AddressService.remove(req.user!, request);
            res.status(200).json(ResponseSuccess.success(null, "Address removed successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = String(req.params.contactId);
            const response = await AddressService.list(req.user!, contactId);
            res.status(200).json(ResponseSuccess.success(response, "Address list retrieved successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }
}
