import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodeModule } from './episode/episode.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    CoursesModule,
    EpisodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
