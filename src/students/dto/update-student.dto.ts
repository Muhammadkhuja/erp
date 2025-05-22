// import { Field, InputType } from "@nestjs/graphql";

// @InputType()
// export class UpdateStudentDto {
//   @Field()
//   first_name: string;

//   @Field()
//   last_name: string;

//   @Field()
//   email: string;

//   @Field()
//   phone: string;

//   @Field()
//   password: string;

//   @Field()
//   confirm_password: string;

//   @Field({ nullable: true })
//   refresh_token: string;

//   @Field({ defaultValue: true })
//   is_active: boolean;

//   @Field()
//   gender: boolean;

//   @Field()
//   datebirth: string;

//   @Field()
//   avatarurl: string;
// }


import { PartialType } from "@nestjs/graphql"; // <-- bu to'g'ri
import { InputType } from "@nestjs/graphql";
import { CreateStudentDto } from "./create-student.dto";

@InputType()
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}