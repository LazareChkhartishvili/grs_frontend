import { Model } from 'mongoose';
import { CourseDocument } from '../schemas/course.schema';
import { LessonDocument } from '../schemas/lesson.schema';
import { ReviewDocument } from '../schemas/review.schema';
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
    findAll(filters?: any): unknown;
    findAllForAdmin(filters?: any): unknown;
    findOneForAdmin(id: string): unknown;
    findOneForEdit(id: string): unknown;
    findOne(id: string): unknown;
    create(createCourseDto: any): unknown;
    update(id: string, updateCourseDto: any): unknown;
    remove(id: string): unknown;
    togglePublishStatus(id: string): unknown;
    toggleStatus(id: string): unknown;
    getLessons(courseId: string): unknown;
    getLesson(lessonId: string): unknown;
    addLesson(courseId: string, lessonData: any): unknown;
    updateLesson(lessonId: string, updateLessonDto: any): unknown;
    removeLesson(courseId: string, lessonId: string): unknown;
    updateLessonsOrder(courseId: string, lessonOrderData: {
        lessonId: string;
        order: number;
    }[]): unknown;
    getReviews(courseId: string): unknown;
    addReview(courseId: string, userId: string, reviewData: any): unknown;
    private updateCourseRating;
    search(query: string): unknown;
}
