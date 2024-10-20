import { Request, Response, NextFunction } from "express";
import { CreateOrderRequest, RemoveOrderRequest, UpdateOrderRequest, GetOrderRequest} from "../model/order-model";
import { OrderService } from "../service/order-service";
// import { TheaterRequest } from "../type/theater-request";
// import { logger } from "../application/logging";
import { ResponseSuccess } from "../response/response-success";
import { ResponseError } from "../response/response-error";
import { UserRequest } from "../type/user-request";
import { v4 as uuidv4 } from 'uuid';


export class OrderController {

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateOrderRequest = {
                ...req.body, // Copy semua body request
                order_id: uuidv4(), // Generate orderId menggunakan uuidv4, pastikan konsisten dengan `id`
            };

            // Pastikan req.user sudah pasti ada dengan menggunakan operator non-null assertion (!)
            const response = await OrderService.create(request, req.user!);
            res.status(201).json(ResponseSuccess.created(response, "Order created successfully"));
        } catch (e) {
            const error = e as Error;
            next(ResponseError.serverError(error.message));
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            
            const response = await OrderService.get();
            res.status(200).json(ResponseSuccess.success(response, "Orders retrieved successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async getById(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const orderId = String(req.params.orderId);
            // if (!req.user) {
            //     return next(ResponseError.serverError("User is not authenticated"));
            // }
            const response = await OrderService.getById(orderId);

            res.status(200).json(ResponseSuccess.success(response, "Order retrieved successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.notFound("Order not found"));
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const orderId = String(req.params.orderId);
            const request: UpdateOrderRequest = {
                id: orderId,
                
                ...req.body
            };
            const response = await OrderService.update(request, req.user!);
            res.status(200).json(ResponseSuccess.success(response, "Order updated successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: RemoveOrderRequest = {
                id: String(req.params.orderId)
            };
            await OrderService.remove(request, req.user!);
            res.status(200).json(ResponseSuccess.success(null, "Order removed successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }
}


