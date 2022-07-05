import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Genre {
  @Field(() => ID, { name: 'id' })
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  country: string;
  @Field(() => Int, { nullable: true })
  year: number;
}
