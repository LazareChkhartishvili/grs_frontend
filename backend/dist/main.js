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
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`GRS Backend is running on: http://localhost:${port}`);
    console.log(`API Base URL: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map