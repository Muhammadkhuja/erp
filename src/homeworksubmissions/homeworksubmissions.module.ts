import { Module } from '@nestjs/common';
import { HomeworksubmissionsService } from './homeworksubmissions.service';
import { HomeworksubmissionsController } from './homeworksubmissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homeworksubmission } from './entities/homeworksubmission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Homeworksubmission])],
  controllers: [HomeworksubmissionsController],
  providers: [HomeworksubmissionsService],
})
export class HomeworksubmissionsModule {}
