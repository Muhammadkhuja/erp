import { Field, InputType, Int } from "@nestjs/graphql";
import { Student } from "../../students/entities/student.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";

@InputType()
export class CreateAttendanceDto {
  @Field((type) => Int, { nullable: true })
  student_id: Student;

  @Field((type) => Int, { nullable: true })
  schudule_id: Schedule;

  @Field()
  date: string;

  @Field()
  status: string;
}
