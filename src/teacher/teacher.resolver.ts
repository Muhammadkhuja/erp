import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Teacher } from "./entities/teacher.entity";
import { UpdateTeacherDto } from "./dto/update-teacher.dto copy";

@Resolver("teacher")
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Query(() => [Teacher])
  findAllTeachers() {
    return this.teacherService.findAll();
  }

  @Query(() => Teacher)
  findOneTeachers(@Args("id") id: number) {
    return this.teacherService.findOne(id);
  }

  @Mutation(() => Teacher)
  createTeachers(@Args("createTeacher") createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Mutation(() => Teacher)
  updateTeachers(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateTeacher") updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Mutation(() => Teacher)
  removeTeachers(@Args("id", { type: () => ID }) id: number) {
    return this.teacherService.remove(id);
  }
}
