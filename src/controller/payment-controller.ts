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
            // Create request body for the payment
            const request: CreatePaymentRequest = {
                ...req.body, // Copy all request body
                payment_status: req.body.payment_status || "pending",
            };
    
            // Ensure req.order is not null/undefined by using non-null assertion (!)
            const orderId = req.order!.order_id;
    
            // Prepare parameters for Midtrans Snap API
            const parameter = {
                transaction_details: {
                    order_id: orderId,
                    gross_amount: request.amount,
                },
                credit_card: {
                    secure: true,
                },
            };
    
            // Create transaction using Midtrans API
            const transaction = await midtransClient.createTransaction(parameter);
    
            // Create the payment record in your system
            const createPayment = await PaymentService.create(request, req.order!);
    
            // Update order with payment URL returned by Midtrans
            const updatePayment = await PaymentService.update({
                data: {
                    payment_url: transaction.redirect_url, // Save the Midtrans payment URL
                    order_id : orderId
                },
            });
    
            // Send successful response with payment details
            res.status(201).json(ResponseSuccess.created(updatePayment, "Order created successfully"));
    
        } catch (e) {
            const error = e as Error;
            // Pass the error to the error handling middleware
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


