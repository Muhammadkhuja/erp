import { Module } from '@nestjs/common';
import { StudentgroupsService } from './studentgroups.service';
import { StudentgroupsController } from './studentgroups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studentgroup } from './entities/studentgroup.entity';
import { Student } from '../students/entities/student.entity';
import { Group } from '../groups/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Studentgroup, Student, Group])],
  controllers: [StudentgroupsController],
  providers: [StudentgroupsService],
})
export class StudentgroupsModule {}
