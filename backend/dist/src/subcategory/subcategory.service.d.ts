import { Model } from 'mongoose';
import { SubCategory, SubCategoryDocument } from '../schemas/subcategory.schema';
export declare class SubCategoryService {
    private subcategoryModel;
    constructor(subcategoryModel: Model<SubCategoryDocument>);
    getAllSubCategories(): Promise<SubCategoryDocument[]>;
    getSubCategoriesByCategory(categoryId: string): Promise<SubCategoryDocument[]>;
    getSubCategoryById(subcategoryId: string): Promise<SubCategoryDocument>;
    createSubCategory(subcategoryData: {
        name: string;
        description?: string;
        image?: string;
        categoryId: string;
        exercises?: any[];
    }): Promise<SubCategoryDocument>;
    updateSubCategory(subcategoryId: string, updateData: Partial<SubCategory>): Promise<SubCategoryDocument>;
    deleteSubCategory(subcategoryId: string): Promise<void>;
    addExerciseToSubCategory(subcategoryId: string, exercise: {
        name: string;
        description?: string;
        duration?: number;
        difficulty?: string;
        instructions?: string;
        images?: string[];
        videos?: string[];
    }): Promise<SubCategoryDocument>;
    getCategoriesWithSubCategories(): Promise<any[]>;
}
