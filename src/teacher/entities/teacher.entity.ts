import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teachergroup } from "../../teachergroups/entities/teachergroup.entity";

@ObjectType()
@Entity()
export class Teacher {
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
  @Column()
  role: string;

  @Field()
  @Column({ default: true })
  is_active: boolean;

  @Field()
  @Column({ nullable: true })
  refresh_token: string;

    @OneToMany((type) => Teachergroup, (teachergroup) => teachergroup.teacher_id)
    @Field((type) => [Teachergroup])
    teachergroup: Teachergroup[];
}
