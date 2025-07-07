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
exports.CategorySchema = exports.Category = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var exercise_schema_1 = require("./exercise.schema");
var Category = function () {
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
    var _image_decorators;
    var _image_initializers = [];
    var _image_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _sequence_decorators;
    var _sequence_initializers = [];
    var _sequence_extraInitializers = [];
    var _parentId_decorators;
    var _parentId_initializers = [];
    var _parentId_extraInitializers = [];
    var _level_decorators;
    var _level_initializers = [];
    var _level_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _exercises_decorators;
    var _exercises_initializers = [];
    var _exercises_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    var Category = _classThis = /** @class */ (function () {
        function Category_1() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.image = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _image_initializers, void 0));
            // კატეგორიის უნიკალური კოდი
            this.code = (__runInitializers(this, _image_extraInitializers), __runInitializers(this, _code_initializers, void 0));
            // sequence - იერარქიული სტრუქტურის მაჩვენებელი (მაგ: "1.1.1")
            this.sequence = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _sequence_initializers, void 0));
            // parentId - თუ null-ია, მაშინ ეს არის ძირითადი კატეგორია
            // თუ parentId-ს აქვს მნიშვნელობა, მაშინ ეს არის სუბკატეგორია
            this.parentId = (__runInitializers(this, _sequence_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
            // level - რომ გავიგოთ რამდენი დონის კატეგორიაა (0 - ძირითადი, 1 - სუბ, 2 - ქვე-სუბ...)
            this.level = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _level_initializers, void 0));
            // isActive - რომ შევძლოთ კატეგორიის დროებით გამორთვა
            this.isActive = (__runInitializers(this, _level_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            // exercises - მხოლოდ იმ შემთხვევაში, თუ ამ კატეგორიას აქვს სავარჯიშოები
            this.exercises = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _exercises_initializers, void 0));
            // sortOrder - კატეგორიების დახარისხებისთვის
            this.sortOrder = (__runInitializers(this, _exercises_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
            __runInitializers(this, _sortOrder_extraInitializers);
        }
        return Category_1;
    }());
    __setFunctionName(_classThis, "Category");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _description_decorators = [(0, mongoose_1.Prop)()];
        _image_decorators = [(0, mongoose_1.Prop)()];
        _code_decorators = [(0, mongoose_1.Prop)()];
        _sequence_decorators = [(0, mongoose_1.Prop)({ unique: true })];
        _parentId_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', default: null })];
        _level_decorators = [(0, mongoose_1.Prop)({ default: 0 })];
        _isActive_decorators = [(0, mongoose_1.Prop)({ default: true })];
        _exercises_decorators = [(0, mongoose_1.Prop)({ type: [exercise_schema_1.Exercise], default: [] })];
        _sortOrder_decorators = [(0, mongoose_1.Prop)({ default: 0 })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } }, metadata: _metadata }, _image_initializers, _image_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _sequence_decorators, { kind: "field", name: "sequence", static: false, private: false, access: { has: function (obj) { return "sequence" in obj; }, get: function (obj) { return obj.sequence; }, set: function (obj, value) { obj.sequence = value; } }, metadata: _metadata }, _sequence_initializers, _sequence_extraInitializers);
        __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: function (obj) { return "parentId" in obj; }, get: function (obj) { return obj.parentId; }, set: function (obj, value) { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
        __esDecorate(null, null, _level_decorators, { kind: "field", name: "level", static: false, private: false, access: { has: function (obj) { return "level" in obj; }, get: function (obj) { return obj.level; }, set: function (obj, value) { obj.level = value; } }, metadata: _metadata }, _level_initializers, _level_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _exercises_decorators, { kind: "field", name: "exercises", static: false, private: false, access: { has: function (obj) { return "exercises" in obj; }, get: function (obj) { return obj.exercises; }, set: function (obj, value) { obj.exercises = value; } }, metadata: _metadata }, _exercises_initializers, _exercises_extraInitializers);
        __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Category = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Category = _classThis;
}();
exports.Category = Category;
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(Category);
exports.CategorySchema.index({ parentId: 1 });
exports.CategorySchema.index({ level: 1 });
exports.CategorySchema.index({ isActive: 1 });
exports.CategorySchema.index({ sortOrder: 1 });
