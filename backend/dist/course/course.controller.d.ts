import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    findAll(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    search(query: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    create(createCourseDto: CreateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateCourseDto: Partial<CreateCourseDto>): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    patch(id: string, updateCourseDto: UpdateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getLessons(courseId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/lesson.schema").LessonDocument, {}> & import("../schemas/lesson.schema").Lesson & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getLesson(courseId: string, lessonId: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lesson.schema").LessonDocument, {}> & import("../schemas/lesson.schema").Lesson & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addLesson(courseId: string, createLessonDto: CreateLessonDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lesson.schema").LessonDocument, {}> & import("../schemas/lesson.schema").Lesson & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateLesson(courseId: string, lessonId: string, updateLessonDto: Partial<CreateLessonDto>): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lesson.schema").LessonDocument, {}> & import("../schemas/lesson.schema").Lesson & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteLesson(courseId: string, lessonId: string): Promise<{
        message: string;
    }>;
    updateLessonsOrder(courseId: string, orderData: {
        lessonId: string;
        order: number;
    }[]): Promise<{
        message: string;
    }>;
    getReviews(courseId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/review.schema").ReviewDocument, {}> & import("../schemas/review.schema").Review & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    addReview(courseId: string, reviewData: {
        userId: string;
        rating: number;
        comment: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/review.schema").ReviewDocument, {}> & import("../schemas/review.schema").Review & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllCoursesForAdmin(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAdminCourse(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getEditCourse(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    toggleCourseStatus(id: string): Promise<{
        message: string;
        isPublished: boolean;
    }>;
    updateAdminCourse(id: string, updateCourseDto: UpdateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument, {}> & import("../schemas/course.schema").Course & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
