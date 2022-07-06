import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field({ name: 'id' })
  _id: string;
  @Field({ nullable: true })
  instrument: string;
  @Field(() => [String], { nullable: 'itemsAndList' })
  years: string;

  id: string;
}
