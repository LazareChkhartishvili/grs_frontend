import { AppService } from './app.service';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
export declare class AppController {
    private readonly appService;
    private userModel;
    constructor(appService: AppService, userModel: Model<UserDocument>);
    getHello(): string;
    getTest(): {
        message: string;
        timestamp: string;
        endpoints: {
            courses: string;
            categories: string;
            courseCategories: string;
            exercises: string;
            exerciseComplexes: string;
            subcategories: string;
            articles: string;
            videos: string;
            users: string;
            sets: string;
        };
    };
    getUsersCount(): Promise<{
        count: number;
        users: {
            id: any;
            name: string;
            email: string;
            createdAt: Date;
        }[];
        error?: undefined;
    } | {
        error: any;
        count?: undefined;
        users?: undefined;
    }>;
    seedData(): {
        message: string;
        examples: {
            category: string;
            course: string;
            exercise: string;
            subcategory: string;
            article: string;
            video: string;
            user: string;
            set: string;
        };
    };
}
