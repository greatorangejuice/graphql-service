import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field(() => ID, { name: 'id' })
  _id: string;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  secondName: string;
  @Field({ nullable: true })
  middleName: string;
  @Field({ nullable: true })
  instrument: string;
  @Field(() => [String], { nullable: true })
  years: string;
}
