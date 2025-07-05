import { SubCategoryService } from './subcategory.service';
export declare class SubCategoryController {
    private readonly subcategoryService;
    constructor(subcategoryService: SubCategoryService);
    getAllSubCategories(): unknown;
    getSubCategoryById(subcategoryId: string): unknown;
    getSubCategoriesByCategory(categoryId: string): unknown;
    getSubCategoriesDropdown(categoryId: string): unknown;
    getCategoriesWithSubCategories(): unknown;
    createSubCategory(subcategoryData: {
        name: string;
        description?: string;
        image?: string;
        categoryId: string;
        exercises?: any[];
    }): unknown;
    updateSubCategory(subcategoryId: string, updateData: any): unknown;
    deleteSubCategory(subcategoryId: string): unknown;
    addExerciseToSubCategory(subcategoryId: string, exercise: {
        name: string;
        description?: string;
        duration?: number;
        difficulty?: string;
        instructions?: string;
        images?: string[];
        videos?: string[];
    }): unknown;
}
