import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesResolver } from './courses.resolver';
import { Group } from '../groups/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Group])],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesResolver],
  exports: [CoursesService]
})
export class CoursesModule {}
