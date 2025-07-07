import { CategoryService } from './category.service';
import { Category } from '../schemas/category.schema';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<Category[]>;
    findAllWithSubcategories(): Promise<Category[]>;
    findAllWithFullStructure(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    create(category: Category): Promise<Category>;
    update(id: string, category: Category): Promise<Category>;
    delete(id: string): Promise<void>;
    createSubcategories(id: string, subcategories: Partial<Category>[]): Promise<Category[]>;
}
