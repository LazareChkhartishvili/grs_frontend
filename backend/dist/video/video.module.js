"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const video_service_1 = require("./video.service");
const video_controller_1 = require("./video.controller");
const video_schema_1 = require("../schemas/video.schema");
const category_schema_1 = require("../schemas/category.schema");
const subcategory_schema_1 = require("../schemas/subcategory.schema");
const course_schema_1 = require("../schemas/course.schema");
const lesson_schema_1 = require("../schemas/lesson.schema");
const exercise_schema_1 = require("../schemas/exercise.schema");
const exercise_complex_schema_1 = require("../schemas/exercise-complex.schema");
const user_schema_1 = require("../schemas/user.schema");
let VideoModule = class VideoModule {
};
exports.VideoModule = VideoModule;
exports.VideoModule = VideoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: video_schema_1.Video.name, schema: video_schema_1.VideoSchema },
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: subcategory_schema_1.SubCategory.name, schema: subcategory_schema_1.SubCategorySchema },
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
                { name: lesson_schema_1.Lesson.name, schema: lesson_schema_1.LessonSchema },
                { name: exercise_schema_1.Exercise.name, schema: exercise_schema_1.ExerciseSchema },
                { name: exercise_complex_schema_1.ExerciseComplex.name, schema: exercise_complex_schema_1.ExerciseComplexSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [video_controller_1.VideoController],
        providers: [video_service_1.VideoService],
        exports: [video_service_1.VideoService],
    })
], VideoModule);
//# sourceMappingURL=video.module.js.map