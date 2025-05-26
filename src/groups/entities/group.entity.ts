import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "../../courses/entities/course.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";
import { Teachergroup } from "../../teachergroups/entities/teachergroup.entity";
import { Studentgroup } from "../../studentgroups/entities/studentgroup.entity";
import { Homework } from "../../homeworks/entities/homework.entity";

@ObjectType()
@Entity()
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne((type) => Course, (course_id) => course_id.group)
  @Field((type) => Course)
  course_id: Course;

  @Field()
  @CreateDateColumn()
  start_date: string;

  @Field()
  @CreateDateColumn()
  end_date: string;

  @Field()
  @Column()
  status: string;

  @OneToMany((type) => Schedule, (schedule) => schedule.group_id)
  @Field((type) => [Schedule])
  schedule: Schedule[];

  @OneToMany((type) => Teachergroup, (teachergroup) => teachergroup.group_id)
  @Field((type) => [Teachergroup])
  teachergroup: Teachergroup[];

  @OneToMany((type) => Studentgroup, (studentgroup) => studentgroup.group_id)
  @Field((type) => [Studentgroup])
  studentgroup: Studentgroup[];

  @OneToMany((type) => Homework, (homeworks) => homeworks.group_id)
  @Field((type) => [Homework])
  homeworks: Homework[];
}
