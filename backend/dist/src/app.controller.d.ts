import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
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
