import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getMainCategories(): unknown;
    getMainCategoriesOnly(): unknown;
    getCategoriesWithSubcategories(): unknown;
    getFullHierarchy(): unknown;
    getAllSubcategories(): unknown;
    getCategoryById(categoryId: string): unknown;
    getSubCategories(parentId: string): unknown;
    getCategoryWithChildren(categoryId: string): unknown;
    createCategory(categoryData: {
        name: string;
        description?: string;
        image?: string;
        parentId?: string;
        exercises?: any[];
    }): unknown;
    createSubcategory(parentId: string, subcategoryData: {
        name: string;
        description?: string;
        image?: string;
        exercises?: any[];
    }): unknown;
    updateCategory(categoryId: string, updateData: any): unknown;
    deleteCategory(categoryId: string): unknown;
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
    getCourseCategories(): unknown;
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
