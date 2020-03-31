import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Episode } from './episode.model'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Course {
  @ApiProperty({description: '课程名'})
  @prop()
  title: string

  @ApiProperty({description: '封面图'})
  @prop()
  cover: string

  // @arrayProp({itemsRef: 'Episode'})
  // episode: Ref<Episode>
}