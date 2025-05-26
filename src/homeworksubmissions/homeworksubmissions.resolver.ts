import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { HomeworksubmissionsService } from "./homeworksubmissions.service";
import { CreateHomeworksubmissionDto } from "./dto/create-homeworksubmission.dto";
import { UpdateHomeworksubmissionDto } from "./dto/update-homeworksubmission.dto";
import { Homeworksubmission } from "./entities/homeworksubmission.entity";

@Resolver("homeworksubmissions")
export class HomeworksubmissionsResolver {
  constructor(
    private readonly homeworksubmissionsService: HomeworksubmissionsService
  ) {}

  @Query(() => [Homeworksubmission])
  findAllHomeworksubmission() {
    return this.homeworksubmissionsService.findAll();
  }

  @Query(() => Homeworksubmission)
  findOneHomeworksubmission(@Args("id") id: number) {
    return this.homeworksubmissionsService.findOne(id);
  }

  @Mutation(() => Homeworksubmission)
  createHomeworksubmission(
    @Args("createHomeworksubmission")
    createHomeworksubmissionDto: CreateHomeworksubmissionDto
  ) {
    return this.homeworksubmissionsService.create(createHomeworksubmissionDto);
  }

  @Mutation(() => Homeworksubmission)
  updateHomeworksubmission(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateHomeworksubmission")
    updateHomeworksubmissionDto: UpdateHomeworksubmissionDto
  ) {
    return this.homeworksubmissionsService.update(
      id,
      updateHomeworksubmissionDto
    );
  }

  @Mutation(() => Number)
  removeHomeworksubmission(@Args("id", { type: () => ID }) id: number) {
    return this.homeworksubmissionsService.remove(id);
  }
}
