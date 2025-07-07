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
    findAll(filters?: any): Promise<(import("mongoose").Document<unknown, {}, CourseDocument> & Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findAllForAdmin(filters?: any): Promise<(import("mongoose").Document<unknown, {}, CourseDocument> & Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOneForAdmin(id: string): Promise<import("mongoose").Document<unknown, {}, CourseDocument> & Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneForEdit(id: string): Promise<import("mongoose").Document<unknown, {}, CourseDocument> & Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, CourseDocument> & Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(createCourseDto: any): Promise<import("mongoose").Document<unknown, {}, CourseDocument> & Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateCourseDto: any): Promise<import("mongoose").Document<unknown, {}, CourseDocument> & Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
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
    getLessons(courseId: string): Promise<(import("mongoose").Document<unknown, {}, LessonDocument> & Lesson & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getLesson(lessonId: string): Promise<import("mongoose").Document<unknown, {}, LessonDocument> & Lesson & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addLesson(courseId: string, lessonData: any): Promise<import("mongoose").Document<unknown, {}, LessonDocument> & Lesson & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateLesson(lessonId: string, updateLessonDto: any): Promise<import("mongoose").Document<unknown, {}, LessonDocument> & Lesson & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
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
    getReviews(courseId: string): Promise<Omit<import("mongoose").Document<unknown, {}, ReviewDocument> & Review & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    addReview(courseId: string, userId: string, reviewData: any): Promise<import("mongoose").Document<unknown, {}, ReviewDocument> & Review & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    private updateCourseRating;
    search(query: string): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, CourseDocument> & Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
}
