import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    create(createCategoryDto: any): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    getCategorySets(id: string): Promise<Types.ObjectId[]>;
    update(id: string, updateCategoryDto: any): Promise<Category>;
    remove(id: string): Promise<Category>;
    addSubcategory(categoryId: string, subcategoryId: string): Promise<Category>;
    addSet(categoryId: string, setId: string): Promise<Category>;
}
