import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class CreateTrackInput {
  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => Int, { nullable: true })
  released: number;

  @Field(() => String, { nullable: true })
  albumId: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  artistsIds: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  bandsIds: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  genresIds: string;
}
