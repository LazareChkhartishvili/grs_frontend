import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: any): Promise<import("../schemas/category.schema").Category>;
    findAll(): Promise<import("../schemas/category.schema").Category[]>;
    findOne(id: string): Promise<import("../schemas/category.schema").Category>;
    getCategorySets(id: string): Promise<import("mongoose").Types.ObjectId[]>;
    update(id: string, updateCategoryDto: any): Promise<import("../schemas/category.schema").Category>;
    remove(id: string): Promise<import("../schemas/category.schema").Category>;
    addSubcategory(id: string, subcategoryId: string): Promise<import("../schemas/category.schema").Category>;
    addSet(id: string, setId: string): Promise<import("../schemas/category.schema").Category>;
}
