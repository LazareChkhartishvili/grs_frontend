import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController, CommentController } from './article.controller';
import { ArticleService } from './article.service';
import { Article, ArticleSchema } from '../schemas/article.schema';
import { Comment, CommentSchema } from '../schemas/comment.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ArticleController, CommentController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
