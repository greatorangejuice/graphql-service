import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  secondName: string;

  @Field(() => String, { nullable: true })
  middleName: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}

@ObjectType()
export class JWT {
  @Field(() => String, { nullable: true })
  jwt: string;
}
