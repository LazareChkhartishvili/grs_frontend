import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    findAll(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    search(query: string): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(createCourseDto: CreateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateCourseDto: Partial<CreateCourseDto>): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    patch(id: string, updateCourseDto: UpdateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getLessons(courseId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/lesson.schema").LessonDocument> & import("../schemas/lesson.schema").Lesson & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getLesson(courseId: string, lessonId: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lesson.schema").LessonDocument> & import("../schemas/lesson.schema").Lesson & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addLesson(courseId: string, createLessonDto: CreateLessonDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lesson.schema").LessonDocument> & import("../schemas/lesson.schema").Lesson & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateLesson(courseId: string, lessonId: string, updateLessonDto: Partial<CreateLessonDto>): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lesson.schema").LessonDocument> & import("../schemas/lesson.schema").Lesson & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
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
    getReviews(courseId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("../schemas/review.schema").ReviewDocument> & import("../schemas/review.schema").Review & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    addReview(courseId: string, reviewData: {
        userId: string;
        rating: number;
        comment: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/review.schema").ReviewDocument> & import("../schemas/review.schema").Review & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllCoursesForAdmin(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getAdminCourse(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getEditCourse(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    toggleCourseStatus(id: string): Promise<{
        message: string;
        isPublished: boolean;
    }>;
    updateAdminCourse(id: string, updateCourseDto: UpdateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/course.schema").CourseDocument> & import("../schemas/course.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
