/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Category,
  CategoryDocument,
  CategoryWithSubcategories,
} from '../schemas/category.schema';
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
  async getCategoriesWithSubcategories(): Promise<CategoryWithSubcategories[]> {
    console.log('🔍 Getting categories with subcategories...');
    const mainCategories = await this.getMainCategories();
    console.log('📋 Main categories found:', mainCategories.length);

    const result: CategoryWithSubcategories[] = [];
    for (const category of mainCategories) {
      if (!category) {
        console.log('⚠️ Category is null or undefined');
        continue;
      }

      const categoryId = category._id?.toString();
      if (!categoryId) {
        console.log('⚠️ Category has no _id field, skipping');
        continue;
      }

      console.log(
        '🔍 Looking for subcategories for category:',
        categoryId,
        category.name,
      );

      const subcategories = await this.categoryModel
        .find({
          parentId: categoryId,
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
      } as CategoryWithSubcategories);
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

    const cleanedData = { ...categoryData };
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
      difficulty: string;
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

    const newExercise: Exercise = {
      ...exercise,
      categoryId: new Types.ObjectId(categoryId),
      isActive: true,
      sortOrder: category.exercises.length,
      difficulty: exercise.difficulty || 'medium',
    };

    category.exercises.push(newExercise);
    return category.save();
  }

  // სრული იერარქიული სტრუქტურის მიღება
  async getFullHierarchy(): Promise<any[]> {
    const mainCategories = await this.getMainCategories();
    const result: any[] = [];

    for (const category of mainCategories) {
      if (category._id) {
        // მივიღოთ კატეგორია შვილობილი კატეგორიებით
        const categoryWithChildren = await this.getCategoryWithChildren(
          category._id.toString(),
        );

        // მივიღოთ კომპლექსები და სავარჯიშოები ამ კატეგორიისთვის
        const { exercises, complexes } =
          await this.getCategoryExercisesAndComplexes(category._id.toString());

        // დავამატოთ კომპლექსები და სავარჯიშოები კატეგორიას
        const enrichedCategory = {
          ...categoryWithChildren,
          complexes,
          exercises,
        };

        // თუ არის შვილობილი კატეგორიები, მათთვისაც მივიღოთ კომპლექსები და სავარჯიშოები
        if (enrichedCategory.children && enrichedCategory.children.length > 0) {
          const enrichedChildren = await Promise.all(
            enrichedCategory.children.map(async (child: CategoryDocument) => {
              const { exercises: childExercises, complexes: childComplexes } =
                await this.getCategoryExercisesAndComplexes(
                  child._id.toString(),
                );
              return {
                ...child.toObject(),
                complexes: childComplexes,
                exercises: childExercises,
              };
            }),
          );
          enrichedCategory.children = enrichedChildren;
        }

        result.push(enrichedCategory);
      }
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

  // კატეგორიის სავარჯიშოებისა და კომპლექსების მიღება
  async getCategoryExercisesAndComplexes(categoryId: string) {
    const objectId = new Types.ObjectId(categoryId);
    const [exercises, complexes] = await Promise.all([
      this.exerciseModel
        .find({ categoryId: objectId, isActive: true })
        .select('-imageData -imageMimeType -imageSize')
        .sort({ sortOrder: 1 })
        .exec(),
      this.exerciseComplexModel
        .find({ categoryId: objectId, isActive: true })
        .select('-instructorNotes')
        .sort({ sortOrder: 1 })
        .exec(),
    ]);

    return { exercises, complexes };
  }
}
