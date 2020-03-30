import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: Course
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  
  constructor(
    @InjectModel(Course) private readonly model:ModelType<Course>
  ){} 
}
