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
    }): unknown;
    deleteAllCategoriesAndSubcategories(): unknown;
    getCategoryExercisesAndComplexes(id: string): unknown;
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
