import { Category, Order, Payment, Product, Store, User } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import fs from "fs";
import path from "path";
import { CreatePaymentRequest, RemovePaymentRequest, PaymentResponse, UpdatePaymentRequest, toPaymentResponse } from "../model/payment-model"
import { PaymentValidation } from "../validation/payment-validation"
import { logger } from "../application/logging";
import { ResponseError } from "../response/response-error";


export class PaymentService {
    static async create(request: CreatePaymentRequest, order: Order): Promise<PaymentResponse> {
        // Validasi request, cek apakah terimplementasi dengan benar
        const createRequest: any = Validation.validate(PaymentValidation.CREATE, request);

        // Cek apakah product ID valid
        await this.checkOrderMustExists(createRequest.id);

        // Buat data record baru
        const record: any = {
            ...createRequest,
            order_id: order.order_id, // Tambahkan user ID ke dalam data order
        };

        // Simpan data order ke database
        const payment = await prismaClient.payment.create({
            data: record,
        });

        // Logging hasil record yang disimpan
        logger.debug("Payment created: " + JSON.stringify(payment));

        return toPaymentResponse(payment);
    }

    static async checkPaymentMustExists(paymentId: string, order: Order): Promise<Payment> {
        const payment = await prismaClient.payment.findFirst({
            where: {
                id: paymentId,
                order_id: order.order_id
            }
        });

        if (!payment) {
            throw new ResponseError(404, "payment is not found");
        }

        return payment;
    }

    static async checkOrderMustExists(orderId: string): Promise<Order> {
        const order = await prismaClient.order.findFirst({
            where: {
                id: orderId,
            },
        });

        if (!order) {
            throw new ResponseError(404, "Order is not found");
        }
        return order;
    }

    static async get(): Promise<Payment[]> {
        const payment = await prismaClient.payment.findMany();
        return payment;
    }

    static async getById(paymentId: string): Promise<PaymentResponse> {
        const payment: any = await prismaClient.payment.findFirst({
            where: {
                id: paymentId,

            },
        });
        return toPaymentResponse(payment);
    }


    static async update(request: UpdatePaymentRequest, order: Order): Promise<PaymentResponse> {
        const updateRequest: any = Validation.validate(PaymentValidation.UPDATE, request);
        await this.checkPaymentMustExists(updateRequest.id, order);
        await this.checkOrderMustExists(updateRequest.id);

        const result = await prismaClient.payment.update({
            where: {
                id: updateRequest.id
            },
            data: updateRequest
        });

        return toPaymentResponse(result);
    }

    static async remove(request: RemovePaymentRequest, order: Order): Promise<PaymentResponse> {
        const removeRequest = Validation.validate(PaymentValidation.GET, request);
        await this.checkPaymentMustExists(removeRequest.id, order);
        // if (OrderFile.image) {
        //     fs.unlinkSync(path.resolve(OrderFile.image)); // Remove the photo file if it exists
        // }
        const payment = await prismaClient.payment.delete({
            where: {
                id: removeRequest.id
            },
        });

        return toPaymentResponse(payment);
    }

}
