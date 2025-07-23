import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    private uploadToCloudinary;
    create(file: Express.Multer.File, createCategoryDto: any): Promise<import("../schemas/category.schema").Category>;
    findAll(): Promise<import("../schemas/category.schema").Category[]>;
    findOne(id: string): Promise<import("../schemas/category.schema").Category>;
    getCategorySets(id: string): Promise<import("mongoose").Types.ObjectId[]>;
    getCategoryComplete(id: string): Promise<{
        category: import("mongoose").Document<unknown, {}, import("../schemas/category.schema").CategoryDocument> & import("../schemas/category.schema").Category & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        sets: any[];
        subcategories: (import("mongoose").Document<unknown, {}, import("../schemas/category.schema").CategoryDocument> & import("../schemas/category.schema").Category & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        exercises: any[];
    }>;
    update(id: string, updateCategoryDto: any, file?: Express.Multer.File): Promise<import("../schemas/category.schema").Category>;
    remove(id: string): Promise<import("../schemas/category.schema").Category>;
    addSubcategory(id: string, subcategoryId: string): Promise<import("../schemas/category.schema").Category>;
    removeSubcategory(id: string, subcategoryId: string): Promise<import("../schemas/category.schema").Category>;
    getSubcategories(id: string): Promise<import("../schemas/category.schema").Category[]>;
    getSubCategoryById(categoryId: string, subCategoryId: string): Promise<import("../schemas/category.schema").Category>;
    updateSubCategory(categoryId: string, subCategoryId: string, updateCategoryDto: any, file?: Express.Multer.File): Promise<import("../schemas/category.schema").Category>;
    getSubCategorySets(categoryId: string, subCategoryId: string): Promise<any[]>;
    createSubcategory(parentId: string, file: Express.Multer.File, createCategoryDto: any): Promise<import("../schemas/category.schema").Category>;
    addSet(id: string, setId: string): Promise<import("../schemas/category.schema").Category>;
}
