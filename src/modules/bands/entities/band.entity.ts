import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Member } from '../../../utils/helper-models';

@ObjectType()
export class Band {
  @Field(() => ID)
  _id: string;
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
