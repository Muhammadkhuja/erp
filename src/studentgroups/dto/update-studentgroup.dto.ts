import { Field, InputType, Int } from "@nestjs/graphql";
import { Student } from "../../students/entities/student.entity";
import { Group } from "../../groups/entities/group.entity";

@InputType()
export class UpdateStudentgroupDto {
  @Field((type) => Int, { nullable: true })
  student_id?: Student;

  @Field((type) => Int, { nullable: true })
  group_id?: Group;

  @Field()
  period?: string;

  @Field()
  is_active?: boolean;
}
