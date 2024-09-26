import { Controller, Get } from '@nestjs/common';
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

  @Get('option')
  option() {
    return {
      title: '课程管理',
      searchMenuSpan: 6,
      column:[
        {prop: 'title', label: '课程名称', sortable: true, search: true, regex: true, row: true, span: 24},
        {prop: 'cover', label: '课程封面',width: '200', type: 'upload', listType: 'picture-img', row: true, action: '/upload'}
      ]
    }
  }
}
