"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
let CourseController = class CourseController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    findAll(filters) {
        return this.courseService.findAll(filters);
    }
    search(query) {
        return this.courseService.search(query);
    }
    findOne(id) {
        return this.courseService.findOne(id);
    }
    create(createCourseDto) {
        return this.courseService.create(createCourseDto);
    }
    update(id, updateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }
    patch(id, updateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }
    remove(id) {
        return this.courseService.remove(id);
    }
    getLessons(courseId) {
        return this.courseService.getLessons(courseId);
    }
    getLesson(courseId, lessonId) {
        return this.courseService.getLesson(lessonId);
    }
    addLesson(courseId, createLessonDto) {
        return this.courseService.addLesson(courseId, createLessonDto);
    }
    updateLesson(courseId, lessonId, updateLessonDto) {
        return this.courseService.updateLesson(lessonId, updateLessonDto);
    }
    deleteLesson(courseId, lessonId) {
        return this.courseService.removeLesson(courseId, lessonId);
    }
    updateLessonsOrder(courseId, orderData) {
        return this.courseService.updateLessonsOrder(courseId, orderData);
    }
    getReviews(courseId) {
        return this.courseService.getReviews(courseId);
    }
    addReview(courseId, reviewData) {
        return this.courseService.addReview(courseId, reviewData.userId, reviewData);
    }
    getAllCoursesForAdmin(filters) {
        return this.courseService.findAllForAdmin(filters);
    }
    getAdminCourse(id) {
        return this.courseService.findOneForAdmin(id);
    }
    getEditCourse(id) {
        return this.courseService.findOneForEdit(id);
    }
    toggleCourseStatus(id) {
        return this.courseService.togglePublishStatus(id);
    }
    updateAdminCourse(id, updateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':courseId/lessons'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getLessons", null);
__decorate([
    (0, common_1.Get)(':courseId/lessons/:lessonId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getLesson", null);
__decorate([
    (0, common_1.Post)(':courseId/lessons'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "addLesson", null);
__decorate([
    (0, common_1.Put)(':courseId/lessons/:lessonId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_b = typeof Partial !== "undefined" && Partial) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "updateLesson", null);
__decorate([
    (0, common_1.Delete)(':courseId/lessons/:lessonId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "deleteLesson", null);
__decorate([
    (0, common_1.Put)(':courseId/lessons/reorder'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "updateLessonsOrder", null);
__decorate([
    (0, common_1.Get)(':id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Post)(':id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "addReview", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getAllCoursesForAdmin", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getAdminCourse", null);
__decorate([
    (0, common_1.Get)('admin/:id/edit'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getEditCourse", null);
__decorate([
    (0, common_1.Patch)('admin/:id/toggle'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "toggleCourseStatus", null);
__decorate([
    (0, common_1.Patch)('admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "updateAdminCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map