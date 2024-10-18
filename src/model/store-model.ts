import {Store} from "@prisma/client";

export type StoreResponse = {
    id: string;
    name?: string | null;
    description?: string | null;
    location?: string | null;
}

export type CreateStoreRequest = {
    name?: string | null;
    description?: string | null;
    location?: string | null;
}

export type GetStoreRequest = {
    id: string;
}

export type UpdateStoreRequest = {
    name?: string | null;
    description?: string | null;
    location?: string | null;
}

export type RemoveStoreRequest = GetStoreRequest

export function toStoreResponse(store: Store): StoreResponse{
    return {
        id: store.id,
        name: store.name,
        description: store.description,
        location: store.location,
       
    }
}
