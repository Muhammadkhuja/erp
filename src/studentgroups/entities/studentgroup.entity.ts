import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "../../groups/entities/group.entity";
import { Student } from "../../students/entities/student.entity";

@ObjectType()
@Entity()
export class Studentgroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Student, (student_id) => student_id.studentgroup)
  @Field((type) => Studentgroup)
  student_id: Student;

  @ManyToOne((type) => Group, (group_id) => group_id.studentgroup)
  @Field((type) => Studentgroup)
  group_id: Group;

  @Field()
  @Column()
  period: string;

  @Field()
  @Column({ default: true })
  is_active: boolean;
}
