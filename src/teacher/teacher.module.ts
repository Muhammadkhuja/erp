import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherResolver } from './teacher.resolver';
import { Teachergroup } from '../teachergroups/entities/teachergroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Teachergroup])],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherResolver],
  exports: [TeacherService, TeacherResolver],
})
export class TeacherModule {}
