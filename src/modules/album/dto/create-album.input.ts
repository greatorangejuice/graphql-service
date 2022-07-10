import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';

@InputType()
export class CreateAlbumInput {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  released: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  artistsIds: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  bandsIds: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  trackIds: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  genresIds: string;
}
