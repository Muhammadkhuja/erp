import { Module } from "@nestjs/common";
import { AttendancesService } from "./attendances.service";
import { AttendancesController } from "./attendances.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "../students/entities/student.entity";
import { Schedule } from "../schedules/entities/schedule.entity";
import { AttendancesResolver } from "./attendances.resolver";
import { Attendance } from "./entities/attendance.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Student, Schedule])],
  controllers: [AttendancesController],
  providers: [AttendancesService, AttendancesResolver],
})
export class AttendancesModule {}
