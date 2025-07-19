import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async create(createCategoryDto: any): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find()
      .populate('subcategories')
      .populate('sets')
      .exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id)
      .populate('subcategories')
      .populate('sets')
      .exec();
    
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async getCategorySets(id: string) {
    const category = await this.categoryModel.findById(id)
      .populate({
        path: 'sets',
        populate: {
          path: 'exercises'
        }
      })
      .exec();
    
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category.sets;
  }

  async update(id: string, updateCategoryDto: any): Promise<Category> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async remove(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async addSubcategory(categoryId: string, subcategoryId: string): Promise<Category> {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (!category.subcategories) {
      category.subcategories = [];
    }

    if (!category.subcategories.includes(new Types.ObjectId(subcategoryId))) {
      category.subcategories.push(new Types.ObjectId(subcategoryId));
      await category.save();
    }

    return category;
  }

  async addSet(categoryId: string, setId: string): Promise<Category> {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (!category.sets) {
      category.sets = [];
    }

    if (!category.sets.includes(new Types.ObjectId(setId))) {
      category.sets.push(new Types.ObjectId(setId));
      await category.save();
    }

    return category;
  }
} 