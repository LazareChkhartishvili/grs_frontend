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
        };
    };
    seedData(): {
        message: string;
        examples: {
            category: string;
            course: string;
            exercise: string;
        };
    };
}
