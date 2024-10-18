import {Category} from "@prisma/client";

export type CategoryResponse = {
    id: string;
    name?: string | null;
    description?: string | null;
}

export type CreateCategoryRequest = {
    name?: string | null;
    description?: string | null;
}

export type GetCategoryRequest = {
    id: string;
}

export type UpdateCategoryRequest = {
    name?: string | null;
    description?: string | null;

}

export type RemoveCategoryRequest = GetCategoryRequest

export function toCategoryResponse(category: Category): CategoryResponse{
    return {
        id: category.id,
        name: category.name,
        description: category.description,  
    }
}
