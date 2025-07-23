"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const category_schema_1 = require("../src/schemas/category.schema");
const set_schema_1 = require("../src/schemas/set.schema");
const exercise_schema_1 = require("../src/schemas/exercise.schema");
const mongoose = require("mongoose");
async function clearAllNonUserData() {
    await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const dbUri = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';
    try {
        await mongoose.connect(dbUri);
        console.log('Connected to MongoDB.');
        const models = [
            { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema, collectionName: 'categories' },
            { name: set_schema_1.Set.name, schema: set_schema_1.SetSchema, collectionName: 'sets' },
            { name: exercise_schema_1.Exercise.name, schema: exercise_schema_1.ExerciseSchema, collectionName: 'exercises' },
        ];
        for (const modelInfo of models) {
            console.log(`Clearing collection: ${modelInfo.collectionName}`);
            const Model = mongoose.model(modelInfo.name, modelInfo.schema);
            await Model.deleteMany({});
            console.log(`All documents removed from ${modelInfo.collectionName}.`);
            try {
                await Model.collection.dropIndexes();
                console.log(`All indexes dropped for ${modelInfo.collectionName}.`);
            }
            catch (error) {
                if (error.codeName === 'IndexNotFound') {
                    console.log(`No indexes to drop for ${modelInfo.collectionName}.`);
                }
                else {
                    console.error(`Error dropping indexes for ${modelInfo.collectionName}:`, error);
                }
            }
        }
        console.log('Finished clearing non-user data and indexes.');
    }
    catch (error) {
        console.error('Error during database operation:', error);
    }
    finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}
clearAllNonUserData();
//# sourceMappingURL=clear-all-non-user-data.js.map