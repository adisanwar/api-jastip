import { Request, Response, NextFunction } from "express";
import { CreatePaymentRequest, RemovePaymentRequest, UpdatePaymentRequest, GetPaymentRequest} from "../model/payment-model";
import { PaymentService } from "../service/payment-service";
// import { TheaterRequest } from "../type/theater-request";
// import { logger } from "../application/logging";
import { ResponseSuccess } from "../response/response-success";
import { ResponseError } from "../response/response-error";
import { v4 as uuidv4 } from 'uuid';
import { OrderRequest } from "../type/order-request";
import midtransClient from "../application/midtrans-client";


export class OrderController {

    static async create(req: OrderRequest, res: Response, next: NextFunction) {
        try {
            const request: CreatePaymentRequest = {
                ...req.body, // Copy semua body request
                payment_status: req.body.payment_status || "pending"
            };

            // Pastikan req.user sudah pasti ada dengan menggunakan operator non-null assertion (!)
            const response = await PaymentService.create(request, req.order!);
            res.status(201).json(ResponseSuccess.created(response, "Order created successfully"));
            
            // Prepare parameters for Midtrans Snap API
      const parameter = {
        transaction_details: {
            order_id: req.order,
          gross_amount: request.amount,
        },
        credit_card: {
          secure: true,
        },
      };

      // Create transaction using Midtrans API
      const transaction = await midtransClient.createTransaction(parameter);

      // Create the order
      const createPayment = await PaymentService.create(request, req.order!);

      // Update order with payment URL returned by Midtrans
      const updatePayment = await PaymentService.update({
        data: {
          paymentUrl: transaction.redirect_url,
        },Ser
      });

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


