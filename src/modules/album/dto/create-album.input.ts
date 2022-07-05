import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';

@InputType()
export class CreateAlbumInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  released: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsArray()
  artistsIds: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsArray()
  bandsIds: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsArray()
  trackIds: string;

  @Field({ nullable: true })
  @IsArray()
  @IsOptional()
  genresIds: string;
}
