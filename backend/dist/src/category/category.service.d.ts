import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    create(createCategoryDto: any): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    getCategorySets(id: string): Promise<Types.ObjectId[]>;
    getCategoryComplete(id: string): Promise<{
        category: import("mongoose").Document<unknown, {}, CategoryDocument> & Category & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        };
        sets: any[];
        subcategories: (import("mongoose").Document<unknown, {}, CategoryDocument> & Category & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        })[];
        exercises: any[];
    }>;
    update(id: string, updateCategoryDto: any): Promise<Category>;
    remove(id: string): Promise<Category>;
    addSubcategory(categoryId: string, subcategoryId: string): Promise<Category>;
    removeSubcategory(categoryId: string, subcategoryId: string): Promise<Category>;
    getSubcategories(categoryId: string): Promise<Category[]>;
    getSubCategoryById(categoryId: string, subCategoryId: string): Promise<Category>;
    updateSubCategory(categoryId: string, subCategoryId: string, updateCategoryDto: any): Promise<Category>;
    getSubCategorySets(categoryId: string, subCategoryId: string): Promise<any[]>;
    createSubcategory(parentId: string, createCategoryDto: any): Promise<Category>;
    addSet(categoryId: string, setId: string): Promise<Category>;
}
