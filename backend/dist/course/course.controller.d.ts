import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    findAll(filters: any): unknown;
    search(query: string): unknown;
    findOne(id: string): unknown;
    create(createCourseDto: CreateCourseDto): unknown;
    update(id: string, updateCourseDto: Partial<CreateCourseDto>): unknown;
    patch(id: string, updateCourseDto: UpdateCourseDto): unknown;
    remove(id: string): unknown;
    getLessons(courseId: string): unknown;
    getLesson(courseId: string, lessonId: string): unknown;
    addLesson(courseId: string, createLessonDto: CreateLessonDto): unknown;
    updateLesson(courseId: string, lessonId: string, updateLessonDto: Partial<CreateLessonDto>): unknown;
    deleteLesson(courseId: string, lessonId: string): unknown;
    updateLessonsOrder(courseId: string, orderData: {
        lessonId: string;
        order: number;
    }[]): unknown;
    getReviews(courseId: string): unknown;
    addReview(courseId: string, reviewData: {
        userId: string;
        rating: number;
        comment: string;
    }): unknown;
    getAllCoursesForAdmin(filters: any): unknown;
    getAdminCourse(id: string): unknown;
    getEditCourse(id: string): unknown;
    toggleCourseStatus(id: string): unknown;
    updateAdminCourse(id: string, updateCourseDto: UpdateCourseDto): unknown;
}
