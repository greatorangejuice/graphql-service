import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBandInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  origin: string;
  // @Field({ nullable: true })
  // members: [Member];
  @Field({ nullable: true })
  website: string;
  // @Field({ nullable: true })
  // genres: [Genre];
}
