// import { Field, InputType } from "@nestjs/graphql";

// @InputType()
// export class UpdateTeacherDto {
//   @Field()
//   first_name: string;
//   @Field()
//   last_name: string;
//   @Field()
//   email: string;
//   @Field()
//   password: string;
//   @Field()
//   confirm_password: string;
//   @Field()
//   phone: string;
//   @Field()
//   role: string;
// }


import { CreateTeacherDto } from "./create-teacher.dto";
import { PartialType } from "@nestjs/graphql"; // <-- bu to'g'ri
import { InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
