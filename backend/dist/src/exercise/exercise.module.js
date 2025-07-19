"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const exercise_controller_1 = require("./exercise.controller");
const exercise_service_1 = require("./exercise.service");
const exercise_schema_1 = require("../schemas/exercise.schema");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let ExerciseModule = class ExerciseModule {
};
exports.ExerciseModule = ExerciseModule;
exports.ExerciseModule = ExerciseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: exercise_schema_1.Exercise.name, schema: exercise_schema_1.ExerciseSchema }
            ]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads',
                    filename: (req, file, callback) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        callback(null, file.fieldname + '-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
                    },
                }),
                fileFilter: (req, file, callback) => {
                    if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
                        callback(null, true);
                    }
                    else {
                        callback(new Error('მხოლოდ ვიდეო და სურათის ფაილებია დაშვებული'), false);
                    }
                },
            }),
        ],
        controllers: [exercise_controller_1.ExerciseController],
        providers: [exercise_service_1.ExerciseService],
        exports: [exercise_service_1.ExerciseService]
    })
], ExerciseModule);
//# sourceMappingURL=exercise.module.js.map