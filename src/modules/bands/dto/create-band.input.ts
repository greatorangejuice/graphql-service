import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

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

  @Field(() => [String], { nullable: true })
  @IsArray()
  genresIds: string;
}
