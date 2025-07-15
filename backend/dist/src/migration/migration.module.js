"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const video_schema_1 = require("../schemas/video.schema");
const set_schema_1 = require("../schemas/set.schema");
const migration_service_1 = require("./migration.service");
let MigrationModule = class MigrationModule {
};
exports.MigrationModule = MigrationModule;
exports.MigrationModule = MigrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: video_schema_1.Video.name, schema: video_schema_1.VideoSchema },
                { name: set_schema_1.Set.name, schema: set_schema_1.SetSchema },
            ]),
        ],
        providers: [migration_service_1.MigrationService],
        exports: [migration_service_1.MigrationService],
    })
], MigrationModule);
//# sourceMappingURL=migration.module.js.map