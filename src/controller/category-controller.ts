import { Request, Response, NextFunction } from "express";
import { CreateCategoryRequest, RemoveCategoryRequest, UpdateCategoryRequest } from "../model/category-model";
import {CategoryService } from "../service/category-service";
import { TheaterRequest } from "../type/theater-request";
// import { logger } from "../application/logging";
import { ResponseSuccess } from "../response/response-success";
import { ResponseError } from "../response/response-error";

export class CategoryController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
            const response = await CategoryService.create(request);
            res.status(201).json(ResponseSuccess.created(response, "Category created successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await CategoryService.get();
            res.status(200).json(ResponseSuccess.success(response, "Category retrieved successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = String(req.params.categoryId);
            const response = await CategoryService.getById(categoryId);
            res.status(200).json(ResponseSuccess.success(response, "Category retrieved successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.notFound("Category not found"));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = String(req.params.categoryId);
            const request: UpdateCategoryRequest = {
                id: categoryId,
                ...req.body
            };
            const response = await CategoryService.update(request);
            res.status(200).json(ResponseSuccess.success(response, "Category updated successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }

    static async remove(req: TheaterRequest, res: Response, next: NextFunction) {
        try {
            const request: RemoveCategoryRequest = {    
                id: String(req.params.categoryId)
            };
            await CategoryService.remove(request);
            res.status(200).json(ResponseSuccess.success(null, "Category removed successfully"));
        } catch (e) {
            const error = e as Error; // Explicitly cast e to Error type
            next(ResponseError.serverError(error.message));
        }
    }
}
