import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teachergroup } from './entities/teachergroup.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Group } from '../groups/entities/group.entity';
// import { TeachergroupsService } from './teachergroups.service';
// import { TeachergroupsController } from './teachergroups.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Teachergroup, Teacher, Group])],
  // controllers: [TeachergroupsController],
  // providers: [TeachergroupsService],
})
export class TeachergroupsModule {}
