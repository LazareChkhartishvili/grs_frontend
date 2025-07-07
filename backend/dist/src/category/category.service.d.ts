import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { SetDocument } from '../schemas/set.schema';
import { VideoDocument } from '../schemas/video.schema';
import { SubCategory } from '../schemas/subcategory.schema';
export declare class CategoryService {
    private categoryModel;
    private subcategoryModel;
    private setModel;
    private videoModel;
    constructor(categoryModel: Model<CategoryDocument>, subcategoryModel: Model<SubCategory>, setModel: Model<SetDocument>, videoModel: Model<VideoDocument>);
    findAll(): Promise<Category[]>;
    findAllWithSubcategories(): Promise<Category[]>;
    findAllWithFullStructure(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    create(categoryData: Partial<Category>): Promise<Category>;
    update(id: string, categoryData: Partial<Category>): Promise<Category>;
    delete(id: string): Promise<void>;
    createSubcategories(parentId: string, subcategories: Partial<Category>[]): Promise<Category[]>;
}
