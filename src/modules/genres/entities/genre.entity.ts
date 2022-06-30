import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Genre {
  @Field(() => ID)
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  country: string;
  @Field({ nullable: true })
  year: number;
}
