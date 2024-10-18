import {Product} from "@prisma/client";

export type ProductResponse = {
    id: string;
    name?: string | null;
    description?: string | null;
    image_url?: string | null;
    price?: number | null;
    stok?: number | null;
    store_id: string;
    category_id: string;
}

export type CreateProductRequest = {
    name?: string | null;
    description?: string | null;
    image_url?: string | null;
    price?: number | null;
    stok?: number | null;
    store_id: string;
    category_id: string;
}

export type GetProductRequest = {
    id: string;
}

export type UpdateProductRequest = {
    name?: string | null;
    description?: string | null;
    image_url?: string | null;
    price?: number | null;
    stok?: number | null;
    store_id: string;
    category_id: string;
}

export type RemoveProductRequest = GetProductRequest

export function toProductResponse(product: Product): ProductResponse{
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        image_url: product.image_url,
        price: product.price,
        stok: product.stok,
        store_id: product.store_id,
        category_id: product.category_id,
    }
}
