"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseSchema = exports.Exercise = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
// სავარჯიშოს ძირითადი სქემა
var Exercise = function () {
    var _classDecorators = [(0, mongoose_1.Schema)({ timestamps: true })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _difficulty_decorators;
    var _difficulty_initializers = [];
    var _difficulty_extraInitializers = [];
    var _instructions_decorators;
    var _instructions_initializers = [];
    var _instructions_extraInitializers = [];
    var _images_decorators;
    var _images_initializers = [];
    var _images_extraInitializers = [];
    var _videos_decorators;
    var _videos_initializers = [];
    var _videos_extraInitializers = [];
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _subcategoryId_decorators;
    var _subcategoryId_initializers = [];
    var _subcategoryId_extraInitializers = [];
    var _imageData_decorators;
    var _imageData_initializers = [];
    var _imageData_extraInitializers = [];
    var _imageMimeType_decorators;
    var _imageMimeType_initializers = [];
    var _imageMimeType_extraInitializers = [];
    var _imageSize_decorators;
    var _imageSize_initializers = [];
    var _imageSize_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    var _repetitions_decorators;
    var _repetitions_initializers = [];
    var _repetitions_extraInitializers = [];
    var _sets_decorators;
    var _sets_initializers = [];
    var _sets_extraInitializers = [];
    var _restTime_decorators;
    var _restTime_initializers = [];
    var _restTime_extraInitializers = [];
    var _calories_decorators;
    var _calories_initializers = [];
    var _calories_extraInitializers = [];
    var Exercise = _classThis = /** @class */ (function () {
        function Exercise_1() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.duration = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _duration_initializers, void 0)); // წუთებში
            this.difficulty = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _difficulty_initializers, void 0));
            this.instructions = (__runInitializers(this, _difficulty_extraInitializers), __runInitializers(this, _instructions_initializers, void 0));
            this.images = (__runInitializers(this, _instructions_extraInitializers), __runInitializers(this, _images_initializers, void 0));
            this.videos = (__runInitializers(this, _images_extraInitializers), __runInitializers(this, _videos_initializers, void 0));
            // რომელ კატეგორიას ეკუთვნის (სავალდებულო)
            this.categoryId = (__runInitializers(this, _videos_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
            // რომელ სუბკატეგორიას ეკუთვნის (არასავალდებულო)
            this.subcategoryId = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _subcategoryId_initializers, void 0));
            // ფოტოს blob მონაცემები (თუ ლოკალურად ინახება)
            this.imageData = (__runInitializers(this, _subcategoryId_extraInitializers), __runInitializers(this, _imageData_initializers, void 0)); // Base64 encoded image data
            this.imageMimeType = (__runInitializers(this, _imageData_extraInitializers), __runInitializers(this, _imageMimeType_initializers, void 0)); // image/jpeg, image/png, etc.
            this.imageSize = (__runInitializers(this, _imageMimeType_extraInitializers), __runInitializers(this, _imageSize_initializers, void 0)); // ფაილის ზომა bytes-ში
            // isActive - რომ შევძლოთ სავარჯიშოს დროებით გამორთვა
            this.isActive = (__runInitializers(this, _imageSize_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            // sortOrder - სავარჯიშოების დახარისხებისთვის
            this.sortOrder = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
            // repetitions - განმეორებების რაოდენობა
            this.repetitions = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _repetitions_initializers, void 0));
            // sets - სეტების რაოდენობა
            this.sets = (__runInitializers(this, _repetitions_extraInitializers), __runInitializers(this, _sets_initializers, void 0));
            // rest - დასვენების დრო წამებში
            this.restTime = (__runInitializers(this, _sets_extraInitializers), __runInitializers(this, _restTime_initializers, void 0));
            // calories - კალორიები რომელიც იწვის
            this.calories = (__runInitializers(this, _restTime_extraInitializers), __runInitializers(this, _calories_initializers, void 0));
            __runInitializers(this, _calories_extraInitializers);
        }
        return Exercise_1;
    }());
    __setFunctionName(_classThis, "Exercise");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _description_decorators = [(0, mongoose_1.Prop)()];
        _duration_decorators = [(0, mongoose_1.Prop)()];
        _difficulty_decorators = [(0, mongoose_1.Prop)({ enum: ['easy', 'medium', 'hard'], default: 'medium' })];
        _instructions_decorators = [(0, mongoose_1.Prop)()];
        _images_decorators = [(0, mongoose_1.Prop)([String])];
        _videos_decorators = [(0, mongoose_1.Prop)([String])];
        _categoryId_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', required: true })];
        _subcategoryId_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'SubCategory', default: null })];
        _imageData_decorators = [(0, mongoose_1.Prop)()];
        _imageMimeType_decorators = [(0, mongoose_1.Prop)()];
        _imageSize_decorators = [(0, mongoose_1.Prop)()];
        _isActive_decorators = [(0, mongoose_1.Prop)({ default: true })];
        _sortOrder_decorators = [(0, mongoose_1.Prop)({ default: 0 })];
        _repetitions_decorators = [(0, mongoose_1.Prop)()];
        _sets_decorators = [(0, mongoose_1.Prop)()];
        _restTime_decorators = [(0, mongoose_1.Prop)()];
        _calories_decorators = [(0, mongoose_1.Prop)()];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _difficulty_decorators, { kind: "field", name: "difficulty", static: false, private: false, access: { has: function (obj) { return "difficulty" in obj; }, get: function (obj) { return obj.difficulty; }, set: function (obj, value) { obj.difficulty = value; } }, metadata: _metadata }, _difficulty_initializers, _difficulty_extraInitializers);
        __esDecorate(null, null, _instructions_decorators, { kind: "field", name: "instructions", static: false, private: false, access: { has: function (obj) { return "instructions" in obj; }, get: function (obj) { return obj.instructions; }, set: function (obj, value) { obj.instructions = value; } }, metadata: _metadata }, _instructions_initializers, _instructions_extraInitializers);
        __esDecorate(null, null, _images_decorators, { kind: "field", name: "images", static: false, private: false, access: { has: function (obj) { return "images" in obj; }, get: function (obj) { return obj.images; }, set: function (obj, value) { obj.images = value; } }, metadata: _metadata }, _images_initializers, _images_extraInitializers);
        __esDecorate(null, null, _videos_decorators, { kind: "field", name: "videos", static: false, private: false, access: { has: function (obj) { return "videos" in obj; }, get: function (obj) { return obj.videos; }, set: function (obj, value) { obj.videos = value; } }, metadata: _metadata }, _videos_initializers, _videos_extraInitializers);
        __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
        __esDecorate(null, null, _subcategoryId_decorators, { kind: "field", name: "subcategoryId", static: false, private: false, access: { has: function (obj) { return "subcategoryId" in obj; }, get: function (obj) { return obj.subcategoryId; }, set: function (obj, value) { obj.subcategoryId = value; } }, metadata: _metadata }, _subcategoryId_initializers, _subcategoryId_extraInitializers);
        __esDecorate(null, null, _imageData_decorators, { kind: "field", name: "imageData", static: false, private: false, access: { has: function (obj) { return "imageData" in obj; }, get: function (obj) { return obj.imageData; }, set: function (obj, value) { obj.imageData = value; } }, metadata: _metadata }, _imageData_initializers, _imageData_extraInitializers);
        __esDecorate(null, null, _imageMimeType_decorators, { kind: "field", name: "imageMimeType", static: false, private: false, access: { has: function (obj) { return "imageMimeType" in obj; }, get: function (obj) { return obj.imageMimeType; }, set: function (obj, value) { obj.imageMimeType = value; } }, metadata: _metadata }, _imageMimeType_initializers, _imageMimeType_extraInitializers);
        __esDecorate(null, null, _imageSize_decorators, { kind: "field", name: "imageSize", static: false, private: false, access: { has: function (obj) { return "imageSize" in obj; }, get: function (obj) { return obj.imageSize; }, set: function (obj, value) { obj.imageSize = value; } }, metadata: _metadata }, _imageSize_initializers, _imageSize_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
        __esDecorate(null, null, _repetitions_decorators, { kind: "field", name: "repetitions", static: false, private: false, access: { has: function (obj) { return "repetitions" in obj; }, get: function (obj) { return obj.repetitions; }, set: function (obj, value) { obj.repetitions = value; } }, metadata: _metadata }, _repetitions_initializers, _repetitions_extraInitializers);
        __esDecorate(null, null, _sets_decorators, { kind: "field", name: "sets", static: false, private: false, access: { has: function (obj) { return "sets" in obj; }, get: function (obj) { return obj.sets; }, set: function (obj, value) { obj.sets = value; } }, metadata: _metadata }, _sets_initializers, _sets_extraInitializers);
        __esDecorate(null, null, _restTime_decorators, { kind: "field", name: "restTime", static: false, private: false, access: { has: function (obj) { return "restTime" in obj; }, get: function (obj) { return obj.restTime; }, set: function (obj, value) { obj.restTime = value; } }, metadata: _metadata }, _restTime_initializers, _restTime_extraInitializers);
        __esDecorate(null, null, _calories_decorators, { kind: "field", name: "calories", static: false, private: false, access: { has: function (obj) { return "calories" in obj; }, get: function (obj) { return obj.calories; }, set: function (obj, value) { obj.calories = value; } }, metadata: _metadata }, _calories_initializers, _calories_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Exercise = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Exercise = _classThis;
}();
exports.Exercise = Exercise;
exports.ExerciseSchema = mongoose_1.SchemaFactory.createForClass(Exercise);
// ინდექსები უკეთესი performanceისთვის
exports.ExerciseSchema.index({ categoryId: 1 });
exports.ExerciseSchema.index({ subcategoryId: 1 });
exports.ExerciseSchema.index({ isActive: 1 });
exports.ExerciseSchema.index({ difficulty: 1 });
exports.ExerciseSchema.index({ sortOrder: 1 });
