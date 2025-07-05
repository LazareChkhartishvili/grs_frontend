import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getMainCategories(): Promise<any[]>;
    getMainCategoriesOnly(): Promise<import("../schemas/category.schema").CategoryDocument[]>;
    getCategoriesWithSubcategories(): Promise<any[]>;
    getFullHierarchy(): Promise<any[]>;
    getAllSubcategories(): Promise<import("../schemas/category.schema").CategoryDocument[]>;
    getCategoryById(categoryId: string): Promise<import("../schemas/category.schema").CategoryDocument>;
    getSubCategories(parentId: string): Promise<import("../schemas/category.schema").CategoryDocument[]>;
    getCategoryWithChildren(categoryId: string): Promise<any>;
    createCategory(categoryData: {
        name: string;
        description?: string;
        image?: string;
        parentId?: string;
        exercises?: any[];
    }): Promise<import("../schemas/category.schema").CategoryDocument>;
    createSubcategory(parentId: string, subcategoryData: {
        name: string;
        description?: string;
        image?: string;
        exercises?: any[];
    }): Promise<import("../schemas/category.schema").CategoryDocument>;
    updateCategory(categoryId: string, updateData: any): Promise<import("../schemas/category.schema").CategoryDocument>;
    deleteCategory(categoryId: string): Promise<{
        message: string;
    }>;
    addExerciseToCategory(categoryId: string, exercise: {
        name: string;
        description?: string;
        duration?: number;
        difficulty?: string;
        instructions?: string;
        images?: string[];
        videos?: string[];
    }): Promise<import("../schemas/category.schema").CategoryDocument>;
    deleteAllCategoriesAndSubcategories(): Promise<{
        deletedCategories: number;
        deletedSubcategories: number;
    }>;
    getCategoryExercisesAndComplexes(id: string): Promise<{
        exercises: (import("mongoose").Document<unknown, {}, import("../schemas/exercise.schema").ExerciseDocument> & import("../schemas/exercise.schema").Exercise & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        complexes: (import("mongoose").Document<unknown, {}, import("../schemas/exercise-complex.schema").ExerciseComplexDocument> & import("../schemas/exercise-complex.schema").ExerciseComplex & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        totalExercises: number;
        totalComplexes: number;
    }>;
}
export declare class CourseCategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCourseCategories(): Promise<import("../schemas/category.schema").CategoryDocument[]>;
    getCategoriesForDropdown(): Promise<{
        id: string;
        name: string;
    }[]>;
    getCourseSubcategories(categoryId: string): Promise<any>;
    getSubcategoriesForDropdown(categoryId: string): Promise<{
        id: string;
        name: string;
        categoryId: string;
    }[]>;
    getCategoriesWithSubcategoriesForDropdown(): Promise<{
        id: string;
        name: string;
        subcategories: {
            id: string;
            name: string;
        }[];
    }[]>;
}
