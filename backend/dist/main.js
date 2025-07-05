"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(4000);
    console.log('GRS Backend is running on: http://localhost:4000');
    console.log('API Base URL: http://localhost:4000/api');
}
bootstrap();
//# sourceMappingURL=main.js.map