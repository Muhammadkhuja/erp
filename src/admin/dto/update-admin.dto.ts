import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAdminDto {
  @Field()
  first_name?: string;
  @Field()
  last_name?: string;
  @Field()
  email?: string;
  @Field()
  phone?: string;
  @Field()
  password?: string;
  @Field()
  confirm_password?: string;
}
