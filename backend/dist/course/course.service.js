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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("../schemas/course.schema");
const lesson_schema_1 = require("../schemas/lesson.schema");
const review_schema_1 = require("../schemas/review.schema");
const user_schema_1 = require("../schemas/user.schema");
const category_schema_1 = require("../schemas/category.schema");
const subcategory_schema_1 = require("../schemas/subcategory.schema");
let CourseService = class CourseService {
    courseModel;
    lessonModel;
    reviewModel;
    userModel;
    categoryModel;
    subCategoryModel;
    constructor(courseModel, lessonModel, reviewModel, userModel, categoryModel, subCategoryModel) {
        this.courseModel = courseModel;
        this.lessonModel = lessonModel;
        this.reviewModel = reviewModel;
        this.userModel = userModel;
        this.categoryModel = categoryModel;
        this.subCategoryModel = subCategoryModel;
    }
    async findAll(filters = {}) {
        const query = { isPublished: true, ...filters };
        return this.courseModel.find(query).sort({ createdAt: -1 });
    }
    async findAllForAdmin(filters = {}) {
        try {
            return this.courseModel.find(filters).sort({ createdAt: -1 });
        }
        catch (error) {
            console.log('Error in findAllForAdmin:', error);
            throw error;
        }
    }
    async findOneForAdmin(id) {
        try {
            const course = await this.courseModel.findById(id);
            if (!course) {
                throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
            }
            return course;
        }
        catch (error) {
            console.log('Error in findOneForAdmin:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
        }
    }
    async findOneForEdit(id) {
        try {
            const course = await this.courseModel
                .findById(id)
                .populate('category', 'name')
                .populate('subcategory', 'name')
                .populate('instructor', 'name email');
            if (!course) {
                throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
            }
            return course;
        }
        catch (error) {
            console.log('Error in findOneForEdit:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
        }
    }
    async findOne(id) {
        const course = await this.courseModel
            .findById(id)
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .populate('instructor', 'name email bio')
            .populate('lessons');
        if (!course) {
            throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
        }
        return course;
    }
    async create(createCourseDto) {
        const level = createCourseDto.level || createCourseDto.difficulty || 'beginner';
        const courseData = {
            ...createCourseDto,
            level,
        };
        if (courseData.subcategory === '' || courseData.subcategory === null) {
            courseData.subcategory = null;
        }
        delete courseData.difficulty;
        const course = new this.courseModel(courseData);
        return course.save();
    }
    async update(id, updateCourseDto) {
        const processedData = { ...updateCourseDto };
        if (processedData.subcategory === '' ||
            processedData.subcategory === null) {
            processedData.subcategory = null;
        }
        const course = await this.courseModel
            .findByIdAndUpdate(id, processedData, { new: true })
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .populate('instructor', 'name email');
        if (!course) {
            throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
        }
        return course;
    }
    async remove(id) {
        const course = await this.courseModel.findByIdAndDelete(id);
        if (!course) {
            throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
        }
        return { message: 'კურსი წარმატებით წაიშალა' };
    }
    async togglePublishStatus(id) {
        const course = await this.courseModel.findById(id);
        if (!course) {
            throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
        }
        course.isPublished = !course.isPublished;
        await course.save();
        return {
            message: `კურსი ${course.isPublished ? 'გამოქვეყნდა' : 'მოიხსნა პუბლიკაციიდან'}`,
            isPublished: course.isPublished,
        };
    }
    async toggleStatus(id) {
        const course = await this.courseModel.findById(id);
        if (!course) {
            throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
        }
        course.isActive = !course.isActive;
        await course.save();
        return {
            message: `კურსი ${course.isActive ? 'გააქტიურდა' : 'გაითიშა'}`,
            isActive: course.isActive,
        };
    }
    async getLessons(courseId) {
        return this.lessonModel
            .find({ course: courseId, isActive: true })
            .sort({ order: 1 });
    }
    async getLesson(lessonId) {
        const lesson = await this.lessonModel
            .findById(lessonId)
            .populate('course', 'title description')
            .populate('exercises', 'name description duration difficulty')
            .exec();
        if (!lesson) {
            throw new common_1.NotFoundException('გაკვეთილი ვერ მოიძებნა');
        }
        return lesson;
    }
    async addLesson(courseId, lessonData) {
        try {
            console.log('addLesson called with:', { courseId, lessonData });
            const course = await this.courseModel.findById(courseId);
            if (!course) {
                throw new common_1.NotFoundException('კურსი ვერ მოიძებნა');
            }
            console.log('Course found:', course.title);
            const cleanedData = {
                title: lessonData.title,
                description: lessonData.description,
                videoUrl: lessonData.videoUrl,
                duration: Number(lessonData.duration),
                order: Number(lessonData.order),
                transcript: lessonData.transcript || '',
                materials: Array.isArray(lessonData.materials)
                    ?
                        lessonData.materials
                    : [],
                exercises: [],
                isActive: lessonData.isActive !== false,
                course: courseId,
            };
            console.log('Cleaned lesson data:', cleanedData);
            const lesson = new this.lessonModel(cleanedData);
            console.log('Lesson object created:', lesson);
            const savedLesson = await lesson.save();
            console.log('Lesson saved:', savedLesson);
            await this.courseModel.findByIdAndUpdate(courseId, {
                $push: { lessons: savedLesson._id },
                $inc: { lessonsCount: 1 },
            });
            console.log('Course updated with new lesson');
            return savedLesson;
        }
        catch (error) {
            console.error('Error in addLesson:', error);
            throw error;
        }
    }
    async updateLesson(lessonId, updateLessonDto) {
        const lesson = await this.lessonModel.findByIdAndUpdate(lessonId, updateLessonDto, { new: true });
        if (!lesson) {
            throw new common_1.NotFoundException('გაკვეთილი ვერ მოიძებნა');
        }
        return lesson;
    }
    async removeLesson(courseId, lessonId) {
        const lesson = await this.lessonModel.findByIdAndDelete(lessonId);
        if (!lesson) {
            throw new common_1.NotFoundException('გაკვეთილი ვერ მოიძებნა');
        }
        await this.courseModel.findByIdAndUpdate(courseId, {
            $pull: { lessons: lessonId },
            $inc: { lessonsCount: -1 },
        });
        return { message: 'გაკვეთილი წარმატებით წაიშალა' };
    }
    async updateLessonsOrder(courseId, lessonOrderData) {
        const bulkOps = lessonOrderData.map((item) => ({
            updateOne: {
                filter: { _id: item.lessonId, course: courseId },
                update: { order: item.order },
            },
        }));
        await this.lessonModel.bulkWrite(bulkOps);
        return { message: 'გაკვეთილების თანმიმდევრობა წარმატებით განახლდა' };
    }
    async getReviews(courseId) {
        return this.reviewModel
            .find({ course: courseId, isActive: true })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
    }
    async addReview(courseId, userId, reviewData) {
        const review = new this.reviewModel({
            ...reviewData,
            course: courseId,
            user: userId,
        });
        const savedReview = await review.save();
        await this.updateCourseRating(courseId);
        return savedReview;
    }
    async updateCourseRating(courseId) {
        const reviews = await this.reviewModel.find({
            course: courseId,
            isActive: true,
        });
        if (reviews.length > 0) {
            const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) /
                reviews.length;
            await this.courseModel.findByIdAndUpdate(courseId, {
                rating: parseFloat(avgRating.toFixed(1)),
                reviewsCount: reviews.length,
            });
        }
    }
    async search(query) {
        return this.courseModel
            .find({
            isPublished: true,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { tags: { $in: [new RegExp(query, 'i')] } },
            ],
        })
            .populate('category', 'name')
            .populate('instructor', 'name');
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)(lesson_schema_1.Lesson.name)),
    __param(2, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(4, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(5, (0, mongoose_1.InjectModel)(subcategory_schema_1.SubCategory.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _d : Object, typeof (_e = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _e : Object, typeof (_f = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _f : Object])
], CourseService);
//# sourceMappingURL=course.service.js.map