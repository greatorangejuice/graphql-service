import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  middleName?: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
