import {Payment} from "@prisma/client";

export type PaymentResponse = {
    id: string;
    payment_method?: string | null;
    payment_status?: string | null;
    payment_url?: string | null;
    amount?: number | null;
    order_id: string;
}

export type CreatePaymentRequest = {
    id: string;
    payment_method?: string | null;
    payment_status?: string | null;
    payment_url?: string | null;
    amount?: number | null;
}

export type GetPaymentRequest = {
    id: string;
}

export type UpdatePaymentRequest = {
    id: string;
    payment_method?: string | null;
    payment_status?: string | null;
    payment_url?: string | null;
    amount?: number | null;
}

export type RemovePaymentRequest = GetPaymentRequest

export function toPaymentResponse(payment: Payment): PaymentResponse{
    return {
        id: payment.id,
        payment_method: payment.payment_method,
        payment_status: payment.payment_status,
        payment_url: payment.payment_url,
        amount: payment.amount,
        order_id: payment.order_id,
    }
}
