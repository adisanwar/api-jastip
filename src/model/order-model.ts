import {Order} from "@prisma/client";

export type OrderResponse = {
    id: string;
    qty?: number | null;
    total_price?: number | null;
    status?: string | null;
    order_id: string;
    user_id: string;
    product_id: string;
}

export type CreateOrderRequest = {
    id: string;
    qty: number | null;
    total_price: number | null;
    status: string | null;
    order_id: string;
    user_id: string;
    product_id: string;
}

export type GetOrderRequest = {
    id: string;
}

export type UpdateOrderRequest = {
    id: string;
    qty?: number | null;
    total_price?: number | null;
    status?: string | null;
    order_id: string;
    user_id: string;
    product_id: string;
}

export type RemoveOrderRequest = GetOrderRequest

export function toOrderResponse(order: Order): OrderResponse{
    return {
        id: order.id,
        order_id: order.order_id,
        qty: order.qty,
        total_price: order.total_price,
        status: order.status,
        user_id: order.user_id,
        product_id: order.product_id,
    }
}
