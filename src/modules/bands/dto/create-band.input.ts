import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { CreateMemberInput } from './create-member.input';

@InputType()
export class CreateBandInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  origin: string;
  @Field(() => [CreateMemberInput], { nullable: 'itemsAndList' })
  members: [CreateMemberInput];
  @Field({ nullable: true })
  website: string;
  @Field(() => [String], { nullable: true })
  @IsArray()
  genresIds: string;
}
