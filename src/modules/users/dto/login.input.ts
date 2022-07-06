import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}
