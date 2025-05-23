import { Module } from "@nestjs/common";
import { SchedulesService } from "./schedules.service";
import { SchedulesController } from "./schedules.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schedule } from "./entities/schedule.entity";
import { Group } from "../groups/entities/group.entity";
import { GroupsService } from "../groups/groups.service";
import { GroupsResolver } from "../groups/groups.resolver";
import { SchedulesResolver } from "./schedules.resolver";
import { Student } from "../students/entities/student.entity";
import { AttendancesController } from "../attendances/attendances.controller";
import { AttendancesService } from "../attendances/attendances.service";
import { AttendancesResolver } from "../attendances/attendances.resolver";
import { StudentsService } from "../students/students.service";
import { StudentsResolver } from "../students/students.resolver";
import { Attendance } from "../attendances/entities/attendance.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, Student, Schedule, Group]),
  ],
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    GroupsService,
    GroupsResolver,
    AttendancesService,
    AttendancesResolver,
    StudentsService,
    StudentsResolver,
    SchedulesService,
    StudentsResolver,
    SchedulesResolver,
  ],
})
export class SchedulesModule {}
