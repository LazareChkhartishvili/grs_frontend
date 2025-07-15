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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const set_schema_1 = require("../schemas/set.schema");
const video_schema_1 = require("../schemas/video.schema");
const hasVideoId = (exercise) => {
    return Boolean(exercise &&
        typeof exercise === 'object' &&
        'videoId' in exercise &&
        exercise.videoId instanceof mongoose_2.Types.ObjectId);
};
let SetService = class SetService {
    constructor(setModel, videoModel) {
        this.setModel = setModel;
        this.videoModel = videoModel;
    }
    async createSet(setData) {
        const exercises = setData.videos?.map((videoId, index) => ({
            _id: new mongoose_2.Types.ObjectId(),
            repetitions: 1,
            sets: 1,
            restTime: 0,
            duration: 0,
            order: index,
            videoId: new mongoose_2.Types.ObjectId(videoId),
        })) || [];
        const set = new this.setModel({
            ...setData,
            categoryId: new mongoose_2.Types.ObjectId(setData.categoryId),
            subcategoryId: setData.subcategoryId
                ? new mongoose_2.Types.ObjectId(setData.subcategoryId)
                : undefined,
            exercises: exercises,
        });
        await set.save();
        const videoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: videoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        const populatedSet = set.toObject();
        populatedSet.exercises = populatedSet.exercises.map((exercise) => {
            if (exercise.videoId) {
                const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                return {
                    ...exercise,
                    video: video || null,
                };
            }
            return exercise;
        });
        return populatedSet;
    }
    async updateSet(setId, updateData) {
        const updatePayload = { ...updateData };
        if (updatePayload.categoryId &&
            typeof updatePayload.categoryId === 'string') {
            updatePayload.categoryId = new mongoose_2.Types.ObjectId(updatePayload.categoryId);
        }
        if (updatePayload.subcategoryId &&
            typeof updatePayload.subcategoryId === 'string') {
            updatePayload.subcategoryId = new mongoose_2.Types.ObjectId(updatePayload.subcategoryId);
        }
        if (updatePayload.videos) {
            updatePayload['exercises'] = updatePayload.videos.map((videoId, index) => ({
                _id: new mongoose_2.Types.ObjectId(),
                repetitions: 1,
                sets: 1,
                restTime: 0,
                duration: 0,
                order: index,
                videoId: new mongoose_2.Types.ObjectId(videoId),
            }));
            delete updatePayload.videos;
        }
        const set = await this.setModel
            .findByIdAndUpdate(setId, updatePayload, { new: true })
            .exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const videoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: videoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        const populatedSet = set.toObject();
        populatedSet.exercises = populatedSet.exercises.map((exercise) => {
            if (exercise.videoId) {
                const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                return {
                    ...exercise,
                    video: video || null,
                };
            }
            return exercise;
        });
        return populatedSet;
    }
    async deleteSet(setId) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        set.isActive = false;
        await set.save();
    }
    async getSetById(setId) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const videoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: videoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        const populatedSet = set.toObject();
        populatedSet.exercises = populatedSet.exercises.map((exercise) => {
            if (exercise.videoId) {
                const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                return {
                    ...exercise,
                    video: video || null,
                };
            }
            return exercise;
        });
        return populatedSet;
    }
    async getAllSets() {
        const sets = await this.setModel
            .find({ isActive: true })
            .sort({ sortOrder: 1 })
            .exec();
        const allVideoIds = sets
            .flatMap((set) => set.exercises.map((ex) => ex.videoId))
            .filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: allVideoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        return sets.map((set) => {
            const populatedSet = set.toObject();
            populatedSet.exercises = populatedSet.exercises.map((exercise) => {
                if (exercise.videoId) {
                    const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                    return {
                        ...exercise,
                        video: video || null,
                    };
                }
                return exercise;
            });
            return populatedSet;
        });
    }
    async getSetsByCategory(categoryId) {
        const sets = await this.setModel
            .find({ categoryId: new mongoose_2.Types.ObjectId(categoryId), isActive: true })
            .sort({ sortOrder: 1 })
            .exec();
        const allVideoIds = sets
            .flatMap((set) => set.exercises.map((ex) => ex.videoId))
            .filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: allVideoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        return sets.map((set) => {
            const populatedSet = set.toObject();
            populatedSet.exercises = populatedSet.exercises.map((exercise) => {
                if (exercise.videoId) {
                    const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                    return {
                        ...exercise,
                        video: video || null,
                    };
                }
                return exercise;
            });
            return populatedSet;
        });
    }
    async getSetsBySubcategory(subcategoryId) {
        const sets = await this.setModel
            .find({
            subcategoryId: new mongoose_2.Types.ObjectId(subcategoryId),
            isActive: true,
        })
            .sort({ sortOrder: 1 })
            .exec();
        const allVideoIds = sets
            .flatMap((set) => set.exercises.map((ex) => ex.videoId))
            .filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: allVideoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        return sets.map((set) => {
            const populatedSet = set.toObject();
            populatedSet.exercises = populatedSet.exercises.map((exercise) => {
                if (exercise.videoId) {
                    const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                    return {
                        ...exercise,
                        video: video || null,
                    };
                }
                return exercise;
            });
            return populatedSet;
        });
    }
    async addVideosToSet(setId, videoIds) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const existingVideoIds = set.exercises
            .map((ex) => ex.videoId?.toString())
            .filter(Boolean);
        const newExercises = videoIds
            .filter((id) => !existingVideoIds.includes(id))
            .map((videoId, index) => ({
            _id: new mongoose_2.Types.ObjectId(),
            repetitions: 1,
            sets: 1,
            restTime: 0,
            duration: 0,
            order: set.exercises.length + index,
            videoId: new mongoose_2.Types.ObjectId(videoId),
        }));
        set.exercises = [...set.exercises, ...newExercises];
        await set.save();
        const allVideoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: allVideoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        const populatedSet = set.toObject();
        populatedSet.exercises = populatedSet.exercises.map((exercise) => {
            if (exercise.videoId) {
                const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                return {
                    ...exercise,
                    video: video || null,
                };
            }
            return exercise;
        });
        return populatedSet;
    }
    async removeVideosFromSet(setId, videoIds) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        set.exercises = set.exercises.filter((exercise) => !exercise.videoId || !videoIds.includes(exercise.videoId.toString()));
        set.exercises = set.exercises.map((exercise, index) => ({
            ...exercise,
            order: index,
        }));
        await set.save();
        const allVideoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: allVideoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        const populatedSet = set.toObject();
        populatedSet.exercises = populatedSet.exercises.map((exercise) => {
            if (exercise.videoId) {
                const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                return {
                    ...exercise,
                    video: video || null,
                };
            }
            return exercise;
        });
        return populatedSet;
    }
    async reorderSetVideos(setId, videoIds) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const reorderedExercises = videoIds
            .map((videoId, index) => {
            const exercise = set.exercises.find((ex) => ex.videoId?.toString() === videoId);
            if (exercise) {
                return {
                    ...exercise,
                    order: index,
                };
            }
            return null;
        })
            .filter((exercise) => exercise !== null);
        const exercisesWithoutVideo = set.exercises.filter((ex) => !ex.videoId || !videoIds.includes(ex.videoId.toString()));
        set.exercises = [
            ...reorderedExercises,
            ...exercisesWithoutVideo.map((exercise, index) => ({
                ...exercise,
                order: reorderedExercises.length + index,
            })),
        ];
        await set.save();
        const allVideoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: allVideoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        const populatedSet = set.toObject();
        populatedSet.exercises = populatedSet.exercises.map((exercise) => {
            if (hasVideoId(exercise)) {
                const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                return {
                    ...exercise,
                    video: video || null,
                };
            }
            return exercise;
        });
        return populatedSet;
    }
    async linkVideosToSet(setId) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const setNumber = set.name.match(/Set (\d+)/)?.[1];
        if (!setNumber) {
            throw new Error('სეტის ნომერი ვერ მოიძებნა სახელში');
        }
        const videos = await this.videoModel
            .find({ setId: setNumber, isActive: true })
            .sort({ sequence: 1 })
            .lean()
            .exec();
        if (!videos.length) {
            throw new Error(`ვიდეოები ვერ მოიძებნა სეტისთვის ${setNumber}`);
        }
        const exercises = videos.map((video, index) => ({
            _id: new mongoose_2.Types.ObjectId(),
            repetitions: 1,
            sets: 1,
            restTime: 0,
            duration: video.duration || 0,
            order: index,
            videoId: video._id,
            video: video,
        }));
        set.exercises = exercises;
        await set.save();
        return set.toObject();
    }
};
exports.SetService = SetService;
exports.SetService = SetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(set_schema_1.Set.name)),
    __param(1, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SetService);
//# sourceMappingURL=set.service.js.map