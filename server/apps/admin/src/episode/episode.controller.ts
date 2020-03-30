import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';


@Crud({
  model: Episode
})
@Controller('episode')
@ApiTags('课时')
export class EpisodeController {

  constructor(
    @InjectModel(Episode) private readonly model:ModelType<Episode>
  ){}
}
