import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll(@Query() filters: any) {
    return this.courseService.findAll(filters);
  }

  // GET /courses/search?q=... - ძიება
  @Get('search')
  search(@Query('q') query: string) {
    return this.courseService.search(query);
  }

  // GET /courses/:id - კონკრეტული კურსი
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  // POST /courses - ახალი კურსის შექმნა (API დოკუმენტაციის მიხედვით)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  // PUT /courses/:id - კურსის განახლება (API დოკუმენტაციის მიხედვით)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: Partial<CreateCourseDto>,
  ) {
    return this.courseService.update(id, updateCourseDto);
  }

  // PATCH /courses/:id - კურსის ნაწილობრივი განახლება
  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  // DELETE /courses/:id - კურსის წაშლა
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }

  // ===== LESSONS ENDPOINTS =====

  // GET /courses/:courseId/lessons - კურსის გაკვეთილების მიღება
  @Get(':courseId/lessons')
  getLessons(@Param('courseId') courseId: string) {
    return this.courseService.getLessons(courseId);
  }

  // GET /courses/:courseId/lessons/:lessonId - კონკრეტული გაკვეთილის სრული დეტალები
  @Get(':courseId/lessons/:lessonId')
  getLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.courseService.getLesson(lessonId);
  }

  // POST /courses/:courseId/lessons - ახალი გაკვეთილის შექმნა
  @Post(':courseId/lessons')
  addLesson(
    @Param('courseId') courseId: string,
    @Body() createLessonDto: CreateLessonDto,
  ) {
    return this.courseService.addLesson(courseId, createLessonDto);
  }

  // PUT /courses/:courseId/lessons/:lessonId - გაკვეთილის განახლება
  @Put(':courseId/lessons/:lessonId')
  updateLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @Body() updateLessonDto: Partial<CreateLessonDto>,
  ) {
    return this.courseService.updateLesson(lessonId, updateLessonDto);
  }

  // DELETE /courses/:courseId/lessons/:lessonId - გაკვეთილის წაშლა
  @Delete(':courseId/lessons/:lessonId')
  deleteLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.courseService.removeLesson(courseId, lessonId);
  }

  // PUT /courses/:courseId/lessons/reorder - გაკვეთილების თანმიმდევრობის განახლება
  @Put(':courseId/lessons/reorder')
  updateLessonsOrder(
    @Param('courseId') courseId: string,
    @Body() orderData: { lessonId: string; order: number }[],
  ) {
    return this.courseService.updateLessonsOrder(courseId, orderData);
  }

  // GET /courses/:id/reviews - კურსის რეცენზიები
  @Get(':id/reviews')
  getReviews(@Param('id') courseId: string) {
    return this.courseService.getReviews(courseId);
  }

  // POST /courses/:id/reviews - რეცენზიის დამატება
  @Post(':id/reviews')
  addReview(
    @Param('id') courseId: string,
    @Body() reviewData: { userId: string; rating: number; comment: string },
  ) {
    return this.courseService.addReview(
      courseId,
      reviewData.userId,
      reviewData,
    );
  }

  // ===== ADMIN ENDPOINTS (დამატებითი ფუნქციონალისთვის) =====

  // GET /courses/admin/all - ადმინისთვის ყველა კურსი (including unpublished)
  @Get('admin/all')
  getAllCoursesForAdmin(@Query() filters: any) {
    return this.courseService.findAllForAdmin(filters);
  }

  // GET /courses/admin/:id - ადმინისთვის კონკრეტული კურსის მიღება (რედაქტირებისთვის)
  @Get('admin/:id')
  getAdminCourse(@Param('id') id: string) {
    return this.courseService.findOneForAdmin(id);
  }

  // GET /courses/admin/:id/edit - კურსის სრული ინფორმაციის მიღება ედიტისთვის (populated)
  @Get('admin/:id/edit')
  getEditCourse(@Param('id') id: string) {
    return this.courseService.findOneForEdit(id);
  }

  // PATCH /courses/admin/:id/toggle - კურსის publish/unpublish
  @Patch('admin/:id/toggle')
  toggleCourseStatus(@Param('id') id: string) {
    return this.courseService.togglePublishStatus(id);
  }

  // PATCH /courses/admin/:id - ადმინისთვის კურსის განახლება
  @Patch('admin/:id')
  updateAdminCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, updateCourseDto);
  }
}
