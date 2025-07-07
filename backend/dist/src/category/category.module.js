"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const category_schema_1 = require("../schemas/category.schema");
const set_schema_1 = require("../schemas/set.schema");
const video_schema_1 = require("../schemas/video.schema");
const exercise_schema_1 = require("../schemas/exercise.schema");
const exercise_complex_schema_1 = require("../schemas/exercise-complex.schema");
const subcategory_schema_1 = require("../schemas/subcategory.schema");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: subcategory_schema_1.SubCategory.name, schema: subcategory_schema_1.SubCategorySchema },
                { name: exercise_complex_schema_1.ExerciseComplex.name, schema: exercise_complex_schema_1.ExerciseComplexSchema },
                { name: exercise_schema_1.Exercise.name, schema: exercise_schema_1.ExerciseSchema },
                { name: set_schema_1.Set.name, schema: set_schema_1.SetSchema },
                { name: video_schema_1.Video.name, schema: video_schema_1.VideoSchema },
            ]),
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map