import { Category, Product, Store } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import fs from "fs";
import path from "path";
import {CreateProductRequest, RemoveProductRequest, ProductResponse, UpdateProductRequest, toProductResponse} from "../model/product-model"
import {ProductValidation} from "../validation/product-validation"
import { logger } from "../application/logging";
import { ResponseError } from "../response/response-error";


export class ProductService {
    static async create(request: CreateProductRequest): Promise<ProductResponse> {
        const createRequest: any = Validation.validate(ProductValidation.CREATE, request);
        await this.checkCategoryMustExists(createRequest.category_id);
    await this.checkStoreMustExists(createRequest.store_id);

        const record = {
            ...createRequest,
          };

        const Product = await prismaClient.product.create({
            data: createRequest
        });
        logger.debug("record : " + JSON.stringify(Product));
        return toProductResponse(Product);
    }

    static async checkStoreMustExists(storeId: string): Promise<Store> {
        const store = await prismaClient.store.findFirst({
            where: {
                id: storeId
            }
        });

        if (!store) {
            throw new ResponseError(404, "Store is not found");
        }

        return store;
    }

    static async checkCategoryMustExists(categoryId: string): Promise<Category> {
        const category = await prismaClient.category.findFirst({
          where: {
            id: categoryId,
          },
        });
    
        if (!category) {
          throw new ResponseError(404, "Category is not found");
        }
        return category;
      }

      static async checkProductMustExists(productId: string): Promise<Product> {
        const product = await prismaClient.product.findFirst({
          where: {
            id: productId,
          },
        });
    
        if (!product) {
          throw new ResponseError(404, "Category is not found");
        }
        return product;
      }

    static async get(): Promise<Product[]> {
        const Product = await prismaClient.product.findMany();
        return Product;
    }

    static async getById(productId: string): Promise<ProductResponse> {
        const Product = await this.checkProductMustExists(productId);
        return toProductResponse(Product);
    }


    static async update(request: UpdateProductRequest): Promise<ProductResponse> {
        const updateRequest : any  = Validation.validate(ProductValidation.UPDATE, request);
        await this.checkCategoryMustExists(updateRequest.category_id);
    await this.checkStoreMustExists(updateRequest.store_id);
        
        const result = await prismaClient.product.update({
            where: {
                 id: updateRequest.id },
            data: updateRequest
        });

        return toProductResponse(result);
    }

    static async remove(request: RemoveProductRequest): Promise<ProductResponse> {
        const removeRequest = Validation.validate(ProductValidation.GET, request); 
        const ProductFile = await this.checkProductMustExists(removeRequest.id);
        // if (ProductFile.image) {
        //     fs.unlinkSync(path.resolve(ProductFile.image)); // Remove the photo file if it exists
        // }
        const Product = await prismaClient.product.delete({
            where: { 
                id: removeRequest.id 
            },
        });

        return toProductResponse(Product);
    }
   
}
