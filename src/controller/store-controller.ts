import { Request, Response, NextFunction } from "express";
import { CreateStoreRequest, RemoveStoreRequest, UpdateStoreRequest } from "../model/store-model";
import { StoreService } from "../service/store-service";
// import { logger } from "../application/logging";
import { ResponseSuccess } from "../response/response-success";
import { ResponseError } from "../response/response-error";

export class StoreController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateStoreRequest = req.body as CreateStoreRequest;
            const response = await StoreService.create(request);
            res.status(201).json(ResponseSuccess.created(response, "Store created successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await StoreService.get();
            res.status(200).json(ResponseSuccess.success(response, "Stores retrieved successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const storeId = String(req.params.storeId);
            const response = await StoreService.getById(storeId);
            res.status(200).json(ResponseSuccess.success(response, "Store retrieved successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.notFound("Store not found"));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const storeId = String(req.params.storeId);
            const request: UpdateStoreRequest = {
                id: storeId,
                ...req.body
            };
            const response = await StoreService.update(request);
            res.status(200).json(ResponseSuccess.success(response, "Store updated successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RemoveStoreRequest = {
                id: String(req.params.storeId)
            };
            await StoreService.remove(request);
            res.status(200).json(ResponseSuccess.success(null, "Store removed successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }
}
