"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const article_schema_1 = require("../src/schemas/article.schema");
const blog_schema_1 = require("../src/schemas/blog.schema");
const MONGODB_URI = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';
async function checkDatabase() {
    try {
        await (0, mongoose_1.connect)(MONGODB_URI);
        console.log('Connected to MongoDB');
        const ArticleModel = (0, mongoose_1.model)('Article', article_schema_1.ArticleSchema);
        const BlogModel = (0, mongoose_1.model)('Blog', blog_schema_1.BlogSchema);
        const articles = await ArticleModel.find();
        console.log('\nArticles:', articles.length);
        for (const article of articles) {
            console.log(`- ${article._id}: ${article.title?.ka || 'No title'} (Blog: ${article.blogId})`);
        }
        const blogs = await BlogModel.find();
        console.log('\nBlogs:', blogs.length);
        for (const blog of blogs) {
            console.log(`- ${blog._id}: ${blog.title?.ka || 'No title'} (Articles: ${blog.articles?.length || 0})`);
            if (blog.articles?.length > 0) {
                console.log('  Articles:', blog.articles);
            }
        }
        process.exit(0);
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
checkDatabase();
//# sourceMappingURL=check-db.js.map