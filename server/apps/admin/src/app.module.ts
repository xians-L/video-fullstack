import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodeModule } from './episode/episode.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

const MAO = require('multer-aliyun-oss')

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET
            }
          })
        }
      }
    }),
    // MulterModule.register({
    //   storage: MAO({
    //     config: {
    //       region: 'oss-cn-shenzhen',
    //       accessKeyId: 'LTAI4FfD6pxWdEb7zsgMJzUP',
    //       accessKeySecret: 'Keld4QDmK0pHx52FEHc3z0xu1Ex0DE',
    //       bucket: 'vue-node-video'
    //     }
    //   })
    //   // dest: 'uploads'
    // }),
    UsersModule,
    CoursesModule,
    EpisodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
