import { Category, Order, Product, Store, User } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import fs from "fs";
import path from "path";
import {CreateOrderRequest, RemoveOrderRequest, OrderResponse, UpdateOrderRequest, toOrderResponse} from "../model/order-model"
import {OrderValidation} from "../validation/order-validation"
import { logger } from "../application/logging";
import { ResponseError } from "../response/response-error";


export class OrderService {
    static async create(request: CreateOrderRequest, user: User): Promise<OrderResponse> {
        // Validasi request, cek apakah terimplementasi dengan benar
        const createRequest: any = Validation.validate(OrderValidation.CREATE, request);

        // Cek apakah product ID valid
        await this.checkProductMustExists(createRequest.product_id);

        // Buat data record baru
        const record : any = {
            ...createRequest,
            user_id: user.id, // Tambahkan user ID ke dalam data order
        };

        // Simpan data order ke database
        const order = await prismaClient.order.create({
            data: record,
        });

        // Logging hasil record yang disimpan
        logger.debug("Order created: " + JSON.stringify(order));

        return toOrderResponse(order);
    }

    static async checkProductMustExists(productId: string): Promise<Product> {
        const product = await prismaClient.product.findFirst({
            where: {
                id: productId
            }
        });

        if (!product) {
            throw new ResponseError(404, "Product is not found");
        }

        return product;
    }

    static async checkOrderMustExists(orderId: string, user: User): Promise<Order> {
        const order = await prismaClient.order.findFirst({
          where: {
            id: orderId,
            user_id: user.id
          },
        });
    
        if (!order) {
          throw new ResponseError(404, "Order is not found");
        }
        return order;
      }

    static async get(): Promise<Order[]> {
        const Order = await prismaClient.order.findMany();
        return Order;
    }

    static async getById(orderId: string): Promise<OrderResponse> {
        const Order : any= await prismaClient.order.findFirst({
            where: {
              id: orderId,

            },
        });
        return toOrderResponse(Order);
    }


    static async update(request: UpdateOrderRequest, user: User): Promise<OrderResponse> {
        const updateRequest : any  = Validation.validate(OrderValidation.UPDATE, request);
    await this.checkProductMustExists(updateRequest.product_id);
    await this.checkOrderMustExists(updateRequest.id, user);
        
        const result = await prismaClient.order.update({
            where: {
                 id: updateRequest.id },
            data: updateRequest
        });

        return toOrderResponse(result);
    }

    static async remove(request: RemoveOrderRequest, user: User): Promise<OrderResponse> {
        const removeRequest = Validation.validate(OrderValidation.GET, request); 
        await this.checkOrderMustExists(removeRequest.id, user);
        // if (OrderFile.image) {
        //     fs.unlinkSync(path.resolve(OrderFile.image)); // Remove the photo file if it exists
        // }
        const order = await prismaClient.order.delete({
            where: { 
                id: removeRequest.id 
            },
        });

        return toOrderResponse(order);
    }
   
}
