import { Store } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import fs from "fs";
import path from "path";
import {CreateStoreRequest, RemoveStoreRequest, StoreResponse, UpdateStoreRequest, toStoreResponse} from "../model/store-model"
import {StoreValidation} from "../validation/store-validation"
import { logger } from "../application/logging";
import { ResponseError } from "../response/response-error";


export class StoreService {
    static async create(request: CreateStoreRequest): Promise<StoreResponse> {
        const createRequest: any = Validation.validate(StoreValidation.CREATE, request);

        const Store = await prismaClient.store.create({
            data: createRequest
        });
        logger.debug("record : " + JSON.stringify(Store));
        return toStoreResponse(Store);
    }

    static async checkStoreMustExists(storeId: string): Promise<Store> {
        const Store = await prismaClient.store.findFirst({
            where: {
                id: storeId
            }
        });

        if (!Store) {
            throw new ResponseError(404, "Store is not found");
        }

        return Store;
    }

    static async get(): Promise<Store[]> {
        const Store = await prismaClient.store.findMany();
        return Store;
    }

    static async getById(storeId: string): Promise<StoreResponse> {
        const Store = await this.checkStoreMustExists(storeId);
        return toStoreResponse(Store);
    }


    static async update(request: UpdateStoreRequest): Promise<StoreResponse> {
        const updateRequest : any  = Validation.validate(StoreValidation.UPDATE, request);
        
        const result = await prismaClient.store.update({
            where: {
                 id: updateRequest.id },
            data: updateRequest
        });

        return toStoreResponse(result);
    }

    static async remove(request: RemoveStoreRequest): Promise<StoreResponse> {
        const removeRequest = Validation.validate(StoreValidation.GET, request); 
        const StoreFile = await this.checkStoreMustExists(removeRequest.id);
        // if (StoreFile.image) {
        //     fs.unlinkSync(path.resolve(StoreFile.image)); // Remove the photo file if it exists
        // }
        const Store = await prismaClient.store.delete({
            where: { 
                id: removeRequest.id 
            },
        });

        return toStoreResponse(Store);
    }
   
}
