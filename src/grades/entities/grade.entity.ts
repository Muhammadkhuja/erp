
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Student } from "../../students/entities/student.entity";
import { Homeworksubmission } from "../../homeworksubmissions/entities/homeworksubmission.entity";

@ObjectType()
@Entity()
export class Grade {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Teacher, (teacher_id) => teacher_id.grade)
  @Field((type) => Teacher)
  teacher_id: Teacher;

  @ManyToOne((type) => Student, (student_id) => student_id.grade)
  @Field((type) => Student)
  student_id: Student;

  @ManyToOne(
    (type) => Homeworksubmission,
    (homeworksub_id) => homeworksub_id.grade
  )
  @Field((type) => Homeworksubmission)
  homeworksub_id: Homeworksubmission;

  @Field()
  @Column()
  grade: number;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  comment: string;
}
