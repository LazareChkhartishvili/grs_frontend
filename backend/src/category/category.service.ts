/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { SetDocument } from '../schemas/set.schema';
import { VideoDocument } from '../schemas/video.schema';
import { SubCategory } from '../schemas/subcategory.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel('SubCategory') private subcategoryModel: Model<SubCategory>,
    @InjectModel('Set') private setModel: Model<SetDocument>,
    @InjectModel('Video') private videoModel: Model<VideoDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({ isActive: true }).exec();
  }

  async findAllWithSubcategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find({ isActive: true }).exec();

    const subcategories = await this.subcategoryModel
      .find({ isActive: true })
      .exec();

    return categories.map((category) => {
      const categorySubcategories = subcategories.filter(
        (sub) => sub.categoryId?.toString() === category._id.toString(),
      );

      return {
        ...category.toObject(),
        subcategories: categorySubcategories,
      };
    });
  }

  async findAllWithFullStructure(): Promise<Category[]> {
    // 1. ვიღებთ ყველა აქტიურ კატეგორიას
    const categories = await this.categoryModel
      .find({ isActive: true })
      .lean()
      .exec();

    // 2. ვიღებთ ყველა სუბკატეგორიას
    const subcategories = await this.subcategoryModel
      .find({ isActive: true })
      .lean()
      .exec();

    // 3. ვიღებთ ყველა აქტიურ სეტს
    const sets = await this.setModel.find({ isActive: true }).lean().exec();

    // 4. ვიღებთ ყველა ვიდეოს სეტებისთვის
    const videoIds = sets
      .flatMap((set) => set.exercises?.map((ex) => ex.videoId))
      .filter(Boolean);

    const videos = await this.videoModel
      .find({ _id: { $in: videoIds } })
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    // 5. ვაპოპულირებთ სეტებს ვიდეოებით
    const populatedSets = sets.map((set) => ({
      ...set,
      exercises: set.exercises?.map((exercise) => {
        if (exercise.videoId) {
          const video = videos.find(
            (v) => String(v._id) === String(exercise.videoId),
          );
          return {
            ...exercise,
            video: video || null,
          };
        }
        return exercise;
      }),
    }));

    // 6. ვაწყობთ საბოლოო სტრუქტურას
    return categories.map((category) => {
      const categorySubcategories = subcategories
        .filter((sub) => String(sub.categoryId) === String(category._id))
        .map((subcategory) => ({
          ...subcategory,
          sets: populatedSets.filter(
            (set) =>
              String(set.categoryId) === String(category._id) &&
              String(set.subcategoryId) === String(subcategory._id),
          ),
        }));

      const categorySets = populatedSets.filter(
        (set) =>
          String(set.categoryId) === String(category._id) && !set.subcategoryId,
      );

      return {
        ...category,
        subcategories: categorySubcategories,
        sets: categorySets,
      };
    });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('კატეგორია ვერ მოიძებნა');
    }
    return category;
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = new this.categoryModel(categoryData);
    return category.save();
  }

  async update(id: string, categoryData: Partial<Category>): Promise<Category> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, categoryData, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException('კატეგორია ვერ მოიძებნა');
    }
    return category;
  }

  async delete(id: string): Promise<void> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('კატეგორია ვერ მოიძებნა');
    }
    category.isActive = false;
    await category.save();
  }

  async createSubcategories(
    parentId: string,
    subcategories: Partial<Category>[],
  ): Promise<Category[]> {
    const parentCategory = await this.categoryModel.findById(parentId).exec();
    if (!parentCategory) {
      throw new NotFoundException('მშობელი კატეგორია ვერ მოიძებნა');
    }

    const createdSubcategories: CategoryDocument[] = [];
    for (const subcategory of subcategories) {
      const newSubcategory = new this.categoryModel({
        ...subcategory,
        parentId: new Types.ObjectId(parentId),
        level: parentCategory.level + 1,
        sequence: `${parentCategory.sequence || '1'}.${createdSubcategories.length + 1}`,
        isActive: true,
      });

      const savedSubcategory = await newSubcategory.save();
      createdSubcategories.push(savedSubcategory);
    }

    return createdSubcategories;
  }
}
