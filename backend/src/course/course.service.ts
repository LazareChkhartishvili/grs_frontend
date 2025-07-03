/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../schemas/course.schema';
import { Lesson, LessonDocument } from '../schemas/lesson.schema';
import { Review, ReviewDocument } from '../schemas/review.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { Category, CategoryDocument } from '../schemas/category.schema';
import {
  SubCategory,
  SubCategoryDocument,
} from '../schemas/subcategory.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategoryDocument>,
  ) {}

  // კურსების მიღება (ფილტრებით) - მხოლოდ გამოქვეყნებული
  async findAll(filters: any = {}) {
    const query = { isPublished: true, ...filters };
    return this.courseModel.find(query).sort({ createdAt: -1 });
  }

  async findAllForAdmin(filters: any = {}) {
    try {
      return this.courseModel.find(filters).sort({ createdAt: -1 });
    } catch (error) {
      console.log('Error in findAllForAdmin:', error);
      throw error;
    }
  }

  async findOneForAdmin(id: string) {
    try {
      const course = await this.courseModel.findById(id);
      if (!course) {
        throw new NotFoundException('კურსი ვერ მოიძებნა');
      }
      return course;
    } catch (error) {
      console.log('Error in findOneForAdmin:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('კურსი ვერ მოიძებნა');
    }
  }

  // კურსის სრული ინფორმაციის მიღება ედიტისთვის
  async findOneForEdit(id: string) {
    try {
      const course = await this.courseModel
        .findById(id)
        .populate('category', 'name')
        .populate('subcategory', 'name')
        .populate('instructor', 'name email');

      if (!course) {
        throw new NotFoundException('კურსი ვერ მოიძებნა');
      }

      return course;
    } catch (error) {
      console.log('Error in findOneForEdit:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('კურსი ვერ მოიძებნა');
    }
  }

  // კონკრეტული კურსის მიღება
  async findOne(id: string) {
    const course = await this.courseModel
      .findById(id)
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .populate('instructor', 'name email bio')
      .populate('lessons');

    if (!course) {
      throw new NotFoundException('კურსი ვერ მოიძებნა');
    }

    return course;
  }

  // ახალი კურსის შექმნა
  async create(createCourseDto: any) {
    const level =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      createCourseDto.level || createCourseDto.difficulty || 'beginner';

    // difficulty-ს level-ზე გადაქცევა თუ საჭიროა

    const courseData = {
      ...createCourseDto,
      level,
    };

    // subcategory ფილდის დამუშავება - თუ ცარიელი string-ია, გადავიყვანოთ null-ზე
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (courseData.subcategory === '' || courseData.subcategory === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      courseData.subcategory = null;
    }

    // difficulty ველის წაშლა რადგან schema-ში level არის
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete courseData.difficulty;

    const course = new this.courseModel(courseData);
    return course.save();
  }

  // კურსის განახლება
  async update(id: string, updateCourseDto: any) {
    // subcategory ფილდის დამუშავება - თუ ცარიელი string-ია, გადავიყვანოთ null-ზე

    const processedData = { ...updateCourseDto };

    if (
      processedData.subcategory === '' ||
      processedData.subcategory === null
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      processedData.subcategory = null;
    }

    const course = await this.courseModel
      .findByIdAndUpdate(id, processedData, { new: true })
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .populate('instructor', 'name email');

    if (!course) {
      throw new NotFoundException('კურსი ვერ მოიძებნა');
    }

    return course;
  }

  // კურსის წაშლა
  async remove(id: string) {
    const course = await this.courseModel.findByIdAndDelete(id);
    if (!course) {
      throw new NotFoundException('კურსი ვერ მოიძებნა');
    }
    return { message: 'კურსი წარმატებით წაიშალა' };
  }

  // კურსის publish/unpublish სტატუსის ცვლილება
  async togglePublishStatus(id: string) {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new NotFoundException('კურსი ვერ მოიძებნა');
    }

    course.isPublished = !course.isPublished;
    await course.save();

    return {
      message: `კურსი ${course.isPublished ? 'გამოქვეყნდა' : 'მოიხსნა პუბლიკაციიდან'}`,
      isPublished: course.isPublished,
    };
  }

  // ძველი toggleStatus მეთოდი backward compatibility-სთვის
  async toggleStatus(id: string) {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new NotFoundException('კურსი ვერ მოიძებნა');
    }

    course.isActive = !course.isActive;
    await course.save();

    return {
      message: `კურსი ${course.isActive ? 'გააქტიურდა' : 'გაითიშა'}`,
      isActive: course.isActive,
    };
  }

  // კურსის გაკვეთილების მიღება
  async getLessons(courseId: string) {
    return this.lessonModel
      .find({ course: courseId, isActive: true })
      .sort({ order: 1 });
  }

  // კონკრეტული გაკვეთილის მიღება სრული დეტალებით
  async getLesson(lessonId: string) {
    const lesson = await this.lessonModel
      .findById(lessonId)
      .populate('course', 'title description')
      .populate('exercises', 'name description duration difficulty')
      .exec();

    if (!lesson) {
      throw new NotFoundException('გაკვეთილი ვერ მოიძებნა');
    }

    return lesson;
  }

  // კურსისთვის გაკვეთილის დამატება
  async addLesson(courseId: string, lessonData: any) {
    try {
      console.log('addLesson called with:', { courseId, lessonData });

      // ვამოწმებთ რომ კურსი არსებობს
      const course = await this.courseModel.findById(courseId);
      if (!course) {
        throw new NotFoundException('კურსი ვერ მოიძებნა');
      }

      console.log('Course found:', course.title);

      // მონაცემების გაწმენდა და ვალიდაცია

      const cleanedData = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        title: lessonData.title,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        description: lessonData.description,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        videoUrl: lessonData.videoUrl,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        duration: Number(lessonData.duration),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: Number(lessonData.order),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        transcript: lessonData.transcript || '',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        materials: Array.isArray(lessonData.materials)
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            lessonData.materials
          : [],
        exercises: [], // დროებით ცარიელი array, რადგან არასწორი ObjectId-ები მოდის
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        isActive: lessonData.isActive !== false,
        course: courseId,
      };

      console.log('Cleaned lesson data:', cleanedData);

      const lesson = new this.lessonModel(cleanedData);

      console.log('Lesson object created:', lesson);

      const savedLesson = await lesson.save();
      console.log('Lesson saved:', savedLesson);

      // კურსში გაკვეთილის დამატება და lessonsCount განახლება
      await this.courseModel.findByIdAndUpdate(courseId, {
        $push: { lessons: savedLesson._id },
        $inc: { lessonsCount: 1 },
      });

      console.log('Course updated with new lesson');

      return savedLesson;
    } catch (error) {
      console.error('Error in addLesson:', error);
      throw error;
    }
  }

  // გაკვეთილის განახლება
  async updateLesson(lessonId: string, updateLessonDto: any) {
    const lesson = await this.lessonModel.findByIdAndUpdate(
      lessonId,
      updateLessonDto,
      { new: true },
    );

    if (!lesson) {
      throw new NotFoundException('გაკვეთილი ვერ მოიძებნა');
    }

    return lesson;
  }

  // გაკვეთილის წაშლა
  async removeLesson(courseId: string, lessonId: string) {
    // გაკვეთილის წაშლა
    const lesson = await this.lessonModel.findByIdAndDelete(lessonId);
    if (!lesson) {
      throw new NotFoundException('გაკვეთილი ვერ მოიძებნა');
    }

    // კურსიდან გაკვეთილის მოშორება და lessonsCount განახლება
    await this.courseModel.findByIdAndUpdate(courseId, {
      $pull: { lessons: lessonId },
      $inc: { lessonsCount: -1 },
    });

    return { message: 'გაკვეთილი წარმატებით წაიშალა' };
  }

  // გაკვეთილების თანმიმდევრობის განახლება
  async updateLessonsOrder(
    courseId: string,
    lessonOrderData: { lessonId: string; order: number }[],
  ) {
    const bulkOps = lessonOrderData.map((item) => ({
      updateOne: {
        filter: { _id: item.lessonId, course: courseId },
        update: { order: item.order },
      },
    }));

    await this.lessonModel.bulkWrite(bulkOps);
    return { message: 'გაკვეთილების თანმიმდევრობა წარმატებით განახლდა' };
  }

  // კურსის რეცენზიების მიღება
  async getReviews(courseId: string) {
    return this.reviewModel
      .find({ course: courseId, isActive: true })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
  }

  // რეცენზიის დამატება
  async addReview(courseId: string, userId: string, reviewData: any) {
    const review = new this.reviewModel({
      ...reviewData,
      course: courseId,
      user: userId,
    });

    const savedReview = await review.save();

    // კურსის რეიტინგის განახლება
    await this.updateCourseRating(courseId);

    return savedReview;
  }

  // კურსის რეიტინგის განახლება
  private async updateCourseRating(courseId: string) {
    const reviews = await this.reviewModel.find({
      course: courseId,
      isActive: true,
    });

    if (reviews.length > 0) {
      const avgRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;

      await this.courseModel.findByIdAndUpdate(courseId, {
        rating: parseFloat(avgRating.toFixed(1)),
        reviewsCount: reviews.length,
      });
    }
  }

  // ძიება
  async search(query: string) {
    return this.courseModel
      .find({
        isPublished: true,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } },
        ],
      })
      .populate('category', 'name')
      .populate('instructor', 'name');
  }
}
