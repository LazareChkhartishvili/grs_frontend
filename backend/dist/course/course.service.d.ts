import { Model } from 'mongoose';
import { Course, CourseDocument } from '../schemas/course.schema';
import { Lesson, LessonDocument } from '../schemas/lesson.schema';
import { Review, ReviewDocument } from '../schemas/review.schema';
import { UserDocument } from '../schemas/user.schema';
import { CategoryDocument } from '../schemas/category.schema';
import { SubCategoryDocument } from '../schemas/subcategory.schema';
export declare class CourseService {
    private courseModel;
    private lessonModel;
    private reviewModel;
    private userModel;
    private categoryModel;
    private subCategoryModel;
    constructor(courseModel: Model<CourseDocument>, lessonModel: Model<LessonDocument>, reviewModel: Model<ReviewDocument>, userModel: Model<UserDocument>, categoryModel: Model<CategoryDocument>, subCategoryModel: Model<SubCategoryDocument>);
    findAll(filters?: any): Promise<(import("mongoose").Document<unknown, {}, CourseDocument, {}> & Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findAllForAdmin(filters?: any): Promise<(import("mongoose").Document<unknown, {}, CourseDocument, {}> & Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOneForAdmin(id: string): Promise<import("mongoose").Document<unknown, {}, CourseDocument, {}> & Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findOneForEdit(id: string): Promise<import("mongoose").Document<unknown, {}, CourseDocument, {}> & Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, CourseDocument, {}> & Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    create(createCourseDto: any): Promise<import("mongoose").Document<unknown, {}, CourseDocument, {}> & Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateCourseDto: any): Promise<import("mongoose").Document<unknown, {}, CourseDocument, {}> & Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    togglePublishStatus(id: string): Promise<{
        message: string;
        isPublished: boolean;
    }>;
    toggleStatus(id: string): Promise<{
        message: string;
        isActive: boolean;
    }>;
    getLessons(courseId: string): Promise<(import("mongoose").Document<unknown, {}, LessonDocument, {}> & Lesson & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getLesson(lessonId: string): Promise<import("mongoose").Document<unknown, {}, LessonDocument, {}> & Lesson & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addLesson(courseId: string, lessonData: any): Promise<import("mongoose").Document<unknown, {}, LessonDocument, {}> & Lesson & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateLesson(lessonId: string, updateLessonDto: any): Promise<import("mongoose").Document<unknown, {}, LessonDocument, {}> & Lesson & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removeLesson(courseId: string, lessonId: string): Promise<{
        message: string;
    }>;
    updateLessonsOrder(courseId: string, lessonOrderData: {
        lessonId: string;
        order: number;
    }[]): Promise<{
        message: string;
    }>;
    getReviews(courseId: string): Promise<(import("mongoose").Document<unknown, {}, ReviewDocument, {}> & Review & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    addReview(courseId: string, userId: string, reviewData: any): Promise<import("mongoose").Document<unknown, {}, ReviewDocument, {}> & Review & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    private updateCourseRating;
    search(query: string): Promise<(import("mongoose").Document<unknown, {}, CourseDocument, {}> & Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
