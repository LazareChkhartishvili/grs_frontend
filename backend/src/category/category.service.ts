/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import {
  SubCategory,
  SubCategoryDocument,
} from '../schemas/subcategory.schema';
import {
  ExerciseComplex,
  ExerciseComplexDocument,
} from '../schemas/exercise-complex.schema';
import { Exercise, ExerciseDocument } from '../schemas/exercise.schema';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(SubCategory.name)
    private subcategoryModel: Model<SubCategoryDocument>,
    @InjectModel(ExerciseComplex.name)
    private exerciseComplexModel: Model<ExerciseComplexDocument>,
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}
  // ყველა ძირითადი კატეგორიის მიღება (parentId = null)
  async getMainCategories(): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find({ parentId: null, isActive: true })
      .sort({ sortOrder: 1 })
      .exec();
  }
  // კონკრეტული კატეგორიის მიღება
  async getCategoryById(categoryId: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      throw new NotFoundException('კატეგორია ვერ მოიძებნა');
    }
    return category;
  }
  // ყველა კატეგორია სუბკატეგორიებით
  async getCategoriesWithSubcategories(): Promise<any[]> {
    console.log('🔍 Getting categories with subcategories...');
    const mainCategories = await this.getMainCategories();
    console.log('📋 Main categories found:', mainCategories.length);
    // ვნახოთ ყველა სუბკატეგორია რა categoryId-ებს აქვს
    const allSubcategories = await this.subcategoryModel
      .find({ isActive: true })
      .exec();
    console.log('📋 All subcategories found:', allSubcategories.length);
    console.log(
      '📋 Subcategory categoryIds:',
      allSubcategories.map((sub) => sub.categoryId),
    );
    const result: any[] = [];
    for (const category of mainCategories) {
      // შევამოწმოთ, რომ კატეგორია არსებობს
      if (!category) {
        console.log('⚠️ Category is null or undefined');
        continue;
      }
      // ვიღებთ category ID-ს - ეს შეიძლება იყოს რიცხვითი ან ObjectId
      const categoryId = category._id?.toString();
      if (!categoryId) {
        console.log('⚠️ Category has no _id field, skipping');
        continue;
      }
      console.log(
        '🔍 Looking for subcategories for category:',
        categoryId,
        category.name,
        'Type:',
        typeof category._id,
      );
      // ვეძებთ სუბკატეგორიებს categoryId-ის მიხედვით
      const subcategories = await this.subcategoryModel
        .find({
          categoryId: categoryId,
          isActive: true,
        })
        .sort({ sortOrder: 1 })
        .exec();
      console.log(
        '📋 Subcategories found for',
        category.name,
        ':',
        subcategories.length,
      );
      result.push({
        ...category.toObject(),
        subcategories: subcategories.map((sub) => sub.toObject()),
      });
    }
    console.log('✅ Final result length:', result.length);
    return result;
  }
  async getAllSubcategories(): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find({ parentId: { $ne: null }, isActive: true })
      .sort({ sortOrder: 1 })
      .exec();
  }
  async getSubCategories(parentId: string): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find({ parentId, isActive: true })
      .sort({ sortOrder: 1 })
      .exec();
  }
  async getCategoryWithChildren(categoryId: string): Promise<any> {
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      throw new NotFoundException('კატეგორია ვერ მოიძებნა');
    }
    const children = await this.categoryModel
      .find({ parentId: categoryId, isActive: true })
      .sort({ sortOrder: 1 })
      .exec();
    return {
      ...category.toObject(),
      children,
    };
  }
  // კატეგორიის შექმნა
  async createCategory(categoryData: {
    name: string;
    description?: string;
    image?: string;
    parentId?: string;
    exercises?: any[];
  }): Promise<CategoryDocument> {
    let level = 0;
    if (categoryData.parentId) {
      const parent = await this.categoryModel
        .findById(categoryData.parentId)
        .exec();
      if (!parent) {
        throw new NotFoundException('მშობელი კატეგორია ვერ მოიძებნა');
      }
      level = parent.level + 1;
    }
    // მონაცემების გაწმენდა - image ფილდის დამუშავება
    const cleanedData = { ...categoryData };
    // თუ image ცარიელი string-ია, object-ია ან undefined-ია, მოვშოროთ
    if (
      !cleanedData.image ||
      typeof cleanedData.image !== 'string' ||
      cleanedData.image.trim() === '' ||
      cleanedData.image === '{}'
    ) {
      delete cleanedData.image;
    }
    const category = new this.categoryModel({
      ...cleanedData,
      level,
    });
    return category.save();
  }
  // კატეგორიის განახლება
  async updateCategory(
    categoryId: string,
    updateData: Partial<Category>,
  ): Promise<CategoryDocument> {
    const cleanedData = { ...updateData };
    if (
      cleanedData.image !== undefined &&
      (!cleanedData.image ||
        typeof cleanedData.image !== 'string' ||
        cleanedData.image.trim() === '' ||
        cleanedData.image === '{}')
    ) {
      delete cleanedData.image;
    }
    const category = await this.categoryModel
      .findByIdAndUpdate(categoryId, cleanedData, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException('კატეგორია ვერ მოიძებნა');
    }
    return category;
  }
  async deleteCategory(categoryId: string): Promise<void> {
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      throw new NotFoundException('კატეგორია ვერ მოიძებნა');
    }
    await this.categoryModel
      .updateMany({ parentId: categoryId }, { isActive: false })
      .exec();
    category.isActive = false;
    await category.save();
  }
  async addExerciseToCategory(
    categoryId: string,
    exercise: {
      name: string;
      description?: string;
      duration?: number;
      difficulty?: string;
      instructions?: string;
      images?: string[];
      videos?: string[];
    },
  ): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      throw new NotFoundException('კატეგორია ვერ მოიძებნა');
    }
    if (!category.exercises) {
      category.exercises = [];
    }
    category.exercises.push(exercise);
    return category.save();
  }
  // სრული იერარქიული სტრუქტურის მიღება
  async getFullHierarchy(): Promise<any[]> {
    const mainCategories = await this.getMainCategories();
    const result: any[] = [];
    for (const category of mainCategories) {
      const categoryWithChildren = await this.getCategoryWithChildren(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (category as any)._id.toString(),
      );
      result.push(categoryWithChildren);
    }
    return result;
  }
  // ყველა კატეგორიისა და სუბკატეგორიის წაშლა (დებაგინგისთვის)
  async deleteAllCategoriesAndSubcategories(): Promise<{
    deletedCategories: number;
    deletedSubcategories: number;
  }> {
    const deletedCategories = await this.categoryModel.deleteMany({}).exec();
    const deletedSubcategories = await this.subcategoryModel
      .deleteMany({})
      .exec();

    return {
      deletedCategories: deletedCategories.deletedCount || 0,
      deletedSubcategories: deletedSubcategories.deletedCount || 0,
    };
  }
  // ყველა კატეგორია სუბკატეგორიებით
  async getCategoryExercisesAndComplexes(categoryId: string) {
    const objectId = new Types.ObjectId(categoryId);
    // პარალელურად წამოვიღოთ ორივე მონაცემი უკეთესი პერფორმანსისთვის
    const [exercises, complexes] = await Promise.all([
      this.exerciseModel
        .find({ categoryId: objectId, isActive: true })
        .select('-imageData -imageMimeType -imageSize') // არ წამოვიღოთ დიდი ველები
        .sort({ sortOrder: 1 })
        .exec(),
      this.exerciseComplexModel
        .find({ categoryId: objectId, isActive: true })
        .select('-instructorNotes') // არ წამოვიღოთ არასაჭირო ველები
        .sort({ sortOrder: 1 })
        .exec(),
    ]);
    return {
      exercises,
      complexes,
      totalExercises: exercises.length,
      totalComplexes: complexes.length,
    };
  }
}
