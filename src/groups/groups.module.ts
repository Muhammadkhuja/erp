import { Module } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "../courses/entities/course.entity";
import { Group } from "./entities/group.entity";
import { CoursesService } from "../courses/courses.service";
import { CoursesResolver } from "../courses/courses.resolver";
import { GroupsResolver } from "./groups.resolver";
import { Schedule } from "../schedules/entities/schedule.entity";
import { SchedulesService } from "../schedules/schedules.service";
import { SchedulesResolver } from "../schedules/schedules.resolver";
import { Teachergroup } from "../teachergroups/entities/teachergroup.entity";
import { Studentgroup } from "../studentgroups/entities/studentgroup.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Course, Group, Schedule, Teachergroup, Studentgroup])],
  controllers: [GroupsController],
  providers: [
    GroupsService,
    CoursesService,
    CoursesResolver,
    SchedulesService,
    SchedulesResolver,
    GroupsResolver,
  ],
})
export class GroupsModule {}
