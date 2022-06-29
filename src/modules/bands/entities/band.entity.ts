import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Band {
  @Field(() => ID)
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  origin: string;
  // @Field({ nullable: true })
  // members: [Member];
  @Field({ nullable: true })
  website: string;
  @Field({ nullable: true })
  genres: string;
}
