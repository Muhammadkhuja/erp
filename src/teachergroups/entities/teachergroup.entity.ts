import { Field, ObjectType } from "@nestjs/graphql"
import { Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Teacher } from "../../teacher/entities/teacher.entity"
import { Group } from "../../groups/entities/group.entity"

@ObjectType()
@Entity()
export class Teachergroup {
  @ManyToOne((type) => Teacher, (teacher_id) => teacher_id.teachergroup)
  @Field((type) => Teachergroup)
  @PrimaryColumn()
  teacher_id: number;

  @ManyToOne((type) => Group, (group_id) => group_id.teachergroup)
  @Field((type) => Teachergroup)
  @PrimaryColumn()
  group_id: number;
}
