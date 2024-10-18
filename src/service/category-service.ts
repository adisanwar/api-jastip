import { Category } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
// import fs from "fs";
// import path from "path";
import {CreateCategoryRequest, RemoveCategoryRequest, CategoryResponse, UpdateCategoryRequest, toCategoryResponse} from "../model/category-model"
import {CategoryValidation} from "../validation/category-validation"
import { logger } from "../application/logging";
import { ResponseError } from "../response/response-error";


export class CategoryService {
    static async create(request: CreateCategoryRequest): Promise<CategoryResponse> {
        const createRequest: any = Validation.validate(CategoryValidation.CREATE, request);

        const Category = await prismaClient.category.create({
            data: createRequest
        });
        logger.debug("record : " + JSON.stringify(Category));
        return toCategoryResponse(Category);
    }

    static async checkCategoryMustExists(categoryId: string): Promise<Category> {
        const Category = await prismaClient.category.findFirst({
            where: {
                id: categoryId
            }
        });

        if (!Category) {
            throw new ResponseError(404, "Category is not found");
        }

        return Category;
    }

    static async get(): Promise<Category[]> {
        const Category = await prismaClient.category.findMany();
        return Category;
    }

    static async getById(categoryId: string): Promise<CategoryResponse> {
        const Category = await this.checkCategoryMustExists(categoryId);
        return toCategoryResponse(Category);
    }


    static async update(request: UpdateCategoryRequest): Promise<CategoryResponse> {
        const updateRequest : any  = Validation.validate(CategoryValidation.UPDATE, request);
        
        const result = await prismaClient.category.update({
            where: {
                 id: updateRequest.id },
            data: updateRequest
        });

        return toCategoryResponse(result);
    }

    static async remove(request: RemoveCategoryRequest): Promise<CategoryResponse> {
        const removeRequest = Validation.validate(CategoryValidation.GET, request); 
        const StoreFile = await this.checkCategoryMustExists(removeRequest.id);
        // if (StoreFile.image) {
        //     fs.unlinkSync(path.resolve(StoreFile.image)); // Remove the photo file if it exists
        // }
        const Store = await prismaClient.store.delete({
            where: { 
                id: removeRequest.id 
            },
        });

        return toCategoryResponse(Store);
    }
   
}
