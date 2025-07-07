"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const mongoose_1 = require("@nestjs/mongoose");
const course_schema_1 = require("../schemas/course.schema");
const lesson_schema_1 = require("../schemas/lesson.schema");
const review_schema_1 = require("../schemas/review.schema");
const category_schema_1 = require("../schemas/category.schema");
const subcategory_schema_1 = require("../schemas/subcategory.schema");
const user_schema_1 = require("../schemas/user.schema");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = __decorate([
    (0, common_1.Module)({
        providers: [course_service_1.CourseService],
        controllers: [course_controller_1.CourseController],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
                { name: lesson_schema_1.Lesson.name, schema: lesson_schema_1.LessonSchema },
                { name: review_schema_1.Review.name, schema: review_schema_1.ReviewSchema },
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: subcategory_schema_1.SubCategory.name, schema: subcategory_schema_1.SubCategorySchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        exports: [course_service_1.CourseService],
    })
], CourseModule);
//# sourceMappingURL=course.module.js.map