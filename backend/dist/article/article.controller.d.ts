import { ArticleService } from './article.service';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getAllArticles(page?: string, limit?: string, category?: string, published?: string, sort?: string, order?: 'asc' | 'desc'): unknown;
    searchArticles(query: string, page?: string, limit?: string): unknown;
    getFeaturedArticles(limit?: string): unknown;
    getArticleById(id: string): unknown;
    getArticleBySlug(slug: string): unknown;
    getArticlesByCategory(categoryId: string, page?: string, limit?: string): unknown;
    createArticle(articleData: {
        title: string;
        content: string;
        excerpt: string;
        slug: string;
        categoryId: string;
        authorId?: string;
        mainImage?: string;
        images?: string[];
        readTimeMinutes?: number;
        tags?: string[];
        relatedArticleIds?: string[];
        metaTitle?: string;
        metaDescription?: string;
        tableOfContents?: Array<{
            id: number;
            title: string;
            anchor: string;
        }>;
        isPublished?: boolean;
        isFeatured?: boolean;
    }): unknown;
    updateArticle(id: string, updateData: any): unknown;
    deleteArticle(id: string): unknown;
    getArticleComments(articleId: string): unknown;
    addComment(articleId: string, commentData: {
        author: {
            name: string;
            email: string;
            avatar?: string;
        };
        content: string;
        parentCommentId?: string;
    }): unknown;
}
export declare class CommentController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    approveComment(commentId: string): unknown;
    deleteComment(commentId: string): unknown;
}
