import { SubCategoryService } from './subcategory.service';
export declare class SubCategoryController {
    private readonly subcategoryService;
    constructor(subcategoryService: SubCategoryService);
    getAllSubCategories(): Promise<import("../schemas/subcategory.schema").SubCategoryDocument[]>;
    getSubCategoryById(subcategoryId: string): Promise<import("../schemas/subcategory.schema").SubCategoryDocument>;
    getSubCategoriesByCategory(categoryId: string): Promise<import("../schemas/subcategory.schema").SubCategoryDocument[]>;
    getSubCategoriesDropdown(categoryId: string): Promise<{
        id: string;
        name: string;
        categoryId: string;
    }[]>;
    getCategoriesWithSubCategories(): Promise<any[]>;
    createSubCategory(subcategoryData: {
        name: string;
        description?: string;
        image?: string;
        categoryId: string;
        exercises?: any[];
    }): Promise<import("../schemas/subcategory.schema").SubCategoryDocument>;
    updateSubCategory(subcategoryId: string, updateData: any): Promise<import("../schemas/subcategory.schema").SubCategoryDocument>;
    deleteSubCategory(subcategoryId: string): Promise<{
        message: string;
    }>;
    addExerciseToSubCategory(subcategoryId: string, exercise: {
        name: string;
        description?: string;
        duration?: number;
        difficulty?: string;
        instructions?: string;
        images?: string[];
        videos?: string[];
    }): Promise<import("../schemas/subcategory.schema").SubCategoryDocument>;
}
