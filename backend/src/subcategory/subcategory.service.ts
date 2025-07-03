import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory, SubCategoryDocument } from '../schemas/subcategory.schema';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private subcategoryModel: Model<SubCategoryDocument>,
  ) {}

  // ყველა სუბკატეგორიის მიღება
  async getAllSubCategories(): Promise<SubCategoryDocument[]> {
    return this.subcategoryModel
      .find({ isActive: true })
      .populate('categoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();
  }

  // კონკრეტული კატეგორიის სუბკატეგორიების მიღება
  async getSubCategoriesByCategory(
    categoryId: string,
  ): Promise<SubCategoryDocument[]> {
    return this.subcategoryModel
      .find({ categoryId, isActive: true })
      .sort({ sortOrder: 1 })
      .exec();
  }

  // კონკრეტული სუბკატეგორიის მიღება
  async getSubCategoryById(
    subcategoryId: string,
  ): Promise<SubCategoryDocument> {
    const subcategory = await this.subcategoryModel
      .findById(subcategoryId)
      .populate('categoryId', 'name description')
      .exec();

    if (!subcategory) {
      throw new NotFoundException('სუბკატეგორია ვერ მოიძებნა');
    }

    return subcategory;
  }

  // სუბკატეგორიის შექმნა
  async createSubCategory(subcategoryData: {
    name: string;
    description?: string;
    image?: string;
    categoryId: string;
    exercises?: any[];
  }): Promise<SubCategoryDocument> {
    const subcategory = new this.subcategoryModel(subcategoryData);
    return subcategory.save();
  }

  // სუბკატეგორიის განახლება
  async updateSubCategory(
    subcategoryId: string,
    updateData: Partial<SubCategory>,
  ): Promise<SubCategoryDocument> {
    const subcategory = await this.subcategoryModel
      .findByIdAndUpdate(subcategoryId, updateData, { new: true })
      .exec();

    if (!subcategory) {
      throw new NotFoundException('სუბკატეგორია ვერ მოიძებნა');
    }

    return subcategory;
  }

  // სუბკატეგორიის წაშლა
  async deleteSubCategory(subcategoryId: string): Promise<void> {
    const subcategory = await this.subcategoryModel
      .findById(subcategoryId)
      .exec();

    if (!subcategory) {
      throw new NotFoundException('სუბკატეგორია ვერ მოიძებნა');
    }

    subcategory.isActive = false;
    await subcategory.save();
  }

  // სუბკატეგორიაში სავარჯიშოს დამატება
  async addExerciseToSubCategory(
    subcategoryId: string,
    exercise: {
      name: string;
      description?: string;
      duration?: number;
      difficulty?: string;
      instructions?: string;
      images?: string[];
      videos?: string[];
    },
  ): Promise<SubCategoryDocument> {
    const subcategory = await this.subcategoryModel
      .findById(subcategoryId)
      .exec();

    if (!subcategory) {
      throw new NotFoundException('სუბკატეგორია ვერ მოიძებნა');
    }

    if (!subcategory.exercises) {
      subcategory.exercises = [];
    }
    subcategory.exercises.push(exercise);
    return subcategory.save();
  }

  // კატეგორიების და მათი სუბკატეგორიების ერთად მიღება
  async getCategoriesWithSubCategories(): Promise<any[]> {
    const subcategories = await this.subcategoryModel
      .find({ isActive: true })
      .populate('categoryId', 'name description image')
      .sort({ sortOrder: 1 })
      .exec();

    // Group by category
    const grouped = subcategories.reduce((acc, sub) => {
      const categoryId = (sub.categoryId as any)._id.toString();
      if (!acc[categoryId]) {
        acc[categoryId] = {
          category: sub.categoryId,
          subcategories: [],
        };
      }
      acc[categoryId].subcategories.push(sub);
      return acc;
    }, {});

    return Object.values(grouped);
  }
}
