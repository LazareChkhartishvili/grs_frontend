"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const set_service_1 = require("./set.service");
const set_controller_1 = require("./set.controller");
const set_schema_1 = require("../schemas/set.schema");
const category_schema_1 = require("../schemas/category.schema");
const subcategory_schema_1 = require("../schemas/subcategory.schema");
const exercise_schema_1 = require("../schemas/exercise.schema");
const user_schema_1 = require("../schemas/user.schema");
let SetModule = class SetModule {
};
exports.SetModule = SetModule;
exports.SetModule = SetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: set_schema_1.Set.name, schema: set_schema_1.SetSchema },
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: subcategory_schema_1.SubCategory.name, schema: subcategory_schema_1.SubCategorySchema },
                { name: exercise_schema_1.Exercise.name, schema: exercise_schema_1.ExerciseSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [set_controller_1.SetController],
        providers: [set_service_1.SetService],
        exports: [set_service_1.SetService],
    })
], SetModule);
//# sourceMappingURL=set.module.js.map