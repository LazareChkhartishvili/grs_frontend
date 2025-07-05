"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseComplexModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const exercise_complex_controller_1 = require("./exercise-complex.controller");
const exercise_complex_service_1 = require("./exercise-complex.service");
const exercise_complex_schema_1 = require("../schemas/exercise-complex.schema");
const exercise_schema_1 = require("../schemas/exercise.schema");
let ExerciseComplexModule = class ExerciseComplexModule {
};
exports.ExerciseComplexModule = ExerciseComplexModule;
exports.ExerciseComplexModule = ExerciseComplexModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: exercise_complex_schema_1.ExerciseComplex.name, schema: exercise_complex_schema_1.ExerciseComplexSchema },
                { name: exercise_schema_1.Exercise.name, schema: exercise_schema_1.ExerciseSchema },
            ]),
        ],
        controllers: [exercise_complex_controller_1.ExerciseComplexController],
        providers: [exercise_complex_service_1.ExerciseComplexService],
        exports: [exercise_complex_service_1.ExerciseComplexService],
    })
], ExerciseComplexModule);
//# sourceMappingURL=exercise-complex.module.js.map