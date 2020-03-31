import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';


@Crud({
  model: Episode
})
@Controller('episode')
@ApiTags('课时')
export class EpisodeController {

  constructor(
    @InjectModel(Episode) private readonly model:ModelType<Episode>,
    @InjectModel(Course) private readonly courseModel:ModelType<Course>
  ){}

  @Get('option')
  async option() {
    const course = (await this.courseModel.find()).map(v => ({
      label: v.title,
      value: v._id
    }))
    return {
      title: '课时管理',
      translate: false,
      page:false,
      menuAlign:'center',
      column:[
        {prop: 'course', label: '所属课程', type: 'select', dicData: course, row: true},
        {prop: 'name', label: '课时名称', span: 24},
        {prop: 'file', label: '视频文件', span: 24, listType: 'picture-img', type: 'upload', action: '/upload'}
      ]
    }
  }
}
