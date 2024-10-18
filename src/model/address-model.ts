import {Address} from "@prisma/client";

export type AddressResponse = {
    id: string;
    street?: string | null;
    city?: string | null;
    province?: string | null;
    country: string;
    postalCode: string | null;
}

export type CreateAddressRequest = {
    contact_id: string;
    street?: string;
    city?: string;
    province?: string;
    country: string;
    postalCode: string;
}

export type GetAddressRequest = {
    contact_id: string;
    id: string;
}

export type UpdateAddressRequest = {
    id: string;
    contact_id: string;
    street?: string;
    city?: string;
    province?: string;
    country: string;
    postalCode: string;
}

export type RemoveAddressRequest = GetAddressRequest

export function toAddressResponse(address: Address): AddressResponse{
    return {
        id: address.id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postalCode: address.postalCode,
    }
}
