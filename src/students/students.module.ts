import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Attendance } from "../attendances/entities/attendance.entity";
import { Schedule } from "../schedules/entities/schedule.entity";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";
import { AttendancesService } from "../attendances/attendances.service";
import { AttendancesResolver } from "../attendances/attendances.resolver";
import { SchedulesService } from "../schedules/schedules.service";
import { SchedulesResolver } from "../schedules/schedules.resolver";
import { StudentsResolver } from "./students.resolver";


@Module({
  imports: [TypeOrmModule.forFeature([Student
    , Attendance, Schedule
  ])],
  controllers: [StudentsController],
  providers: [
    StudentsService,
    AttendancesService,
    AttendancesResolver,
    SchedulesService,
    SchedulesResolver,
    StudentsResolver,
  ],
  exports: [StudentsService]
})
export class StudentsModule {}
