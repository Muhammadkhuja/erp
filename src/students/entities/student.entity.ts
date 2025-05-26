import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attendance } from "../../attendances/entities/attendance.entity";
import { Studentgroup } from "../../studentgroups/entities/studentgroup.entity";
import { Homeworksubmission } from "../../homeworksubmissions/entities/homeworksubmission.entity";
import { Grade } from "../../grades/entities/grade.entity";

@ObjectType()
@Entity()
export class Student {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  hashed_password: string;

  @Field()
  @Column({ nullable: true })
  refresh_token: string;

  @Field()
  @Column({ default: true })
  is_active: boolean;

  @Field()
  @Column()
  gender: boolean;

  @Field()
  @CreateDateColumn()
  datebirth: string;

  @Field()
  @Column()
  avatarurl: string;

  @OneToMany((type) => Attendance, (attendance) => attendance.student_id)
  @Field((type) => [Attendance])
  attendance: Attendance[];

  @OneToMany((type) => Studentgroup, (studentgroup) => studentgroup.student_id)
  @Field((type) => [Studentgroup])
  studentgroup: Studentgroup[];

  @OneToMany(
    (type) => Homeworksubmission,
    (homeworksubmission) => homeworksubmission.student_id
  )
  @Field((type) => [Homeworksubmission])
  homeworksubmission: Homeworksubmission[];

  
    @OneToMany((type) => Grade, (grade) => grade.student_id)
    @Field((type) => [Grade])
    grade: Grade[];
  }
