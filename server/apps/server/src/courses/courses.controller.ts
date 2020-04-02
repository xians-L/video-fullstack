import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CoursesModule } from './courses.module';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course,
  routes: {
    create: false,
    update: false,
    delete: false
  }
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model:ModelType<Course>
  ) {}
}
