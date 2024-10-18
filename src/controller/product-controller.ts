import { Request, Response, NextFunction } from "express";
import { CreateProductRequest, RemoveProductRequest, UpdateProductRequest, GetProductRequest} from "../model/product-model";
import { ProductService } from "../service/product-service";
// import { TheaterRequest } from "../type/theater-request";
// import { logger } from "../application/logging";
import { ResponseSuccess } from "../response/response-success";
import { ResponseError } from "../response/response-error";

export class ProductController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateProductRequest = req.body as CreateProductRequest;
            const response = await ProductService.create(request);
            res.status(201).json(ResponseSuccess.created(response, "Product created successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await ProductService.get();
            res.status(200).json(ResponseSuccess.success(response, "Products retrieved successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = String(req.params.productId);
            const response = await ProductService.getById(productId);
            res.status(200).json(ResponseSuccess.success(response, "Product retrieved successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.notFound("Product not found"));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = String(req.params.productId);
            const request: UpdateProductRequest = {
                id: productId,
                ...req.body
            };
            const response = await ProductService.update(request);
            res.status(200).json(ResponseSuccess.success(response, "Product updated successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RemoveProductRequest = {
                id: String(req.params.productId)
            };
            await ProductService.remove(request);
            res.status(200).json(ResponseSuccess.success(null, "Product removed successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }
}
