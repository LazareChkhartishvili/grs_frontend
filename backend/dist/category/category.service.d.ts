import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { SubCategoryDocument } from '../schemas/subcategory.schema';
import { ExerciseComplexDocument } from '../schemas/exercise-complex.schema';
import { ExerciseDocument } from '../schemas/exercise.schema';
export declare class CategoryService {
    private categoryModel;
    private subcategoryModel;
    private exerciseComplexModel;
    private exerciseModel;
    constructor(categoryModel: Model<CategoryDocument>, subcategoryModel: Model<SubCategoryDocument>, exerciseComplexModel: Model<ExerciseComplexDocument>, exerciseModel: Model<ExerciseDocument>);
    getMainCategories(): Promise<CategoryDocument[]>;
    getCategoryById(categoryId: string): Promise<CategoryDocument>;
    getCategoriesWithSubcategories(): Promise<any[]>;
    getAllSubcategories(): Promise<CategoryDocument[]>;
    getSubCategories(parentId: string): Promise<CategoryDocument[]>;
    getCategoryWithChildren(categoryId: string): Promise<any>;
    createCategory(categoryData: {
        name: string;
        description?: string;
        image?: string;
        parentId?: string;
        exercises?: any[];
    }): Promise<CategoryDocument>;
    updateCategory(categoryId: string, updateData: Partial<Category>): Promise<CategoryDocument>;
    deleteCategory(categoryId: string): Promise<void>;
    addExerciseToCategory(categoryId: string, exercise: {
        name: string;
        description?: string;
        duration?: number;
        difficulty?: string;
        instructions?: string;
        images?: string[];
        videos?: string[];
    }): Promise<CategoryDocument>;
    getFullHierarchy(): Promise<any[]>;
    deleteAllCategoriesAndSubcategories(): Promise<{
        deletedCategories: number;
        deletedSubcategories: number;
    }>;
    getCategoryExercisesAndComplexes(categoryId: string): unknown;
}
