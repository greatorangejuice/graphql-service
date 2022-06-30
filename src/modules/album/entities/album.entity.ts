import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Artist } from '../../artists/entities/artist.entity';
import { Band } from '../../bands/entities/band.entity';
import { Genre } from '../../genres/entities/genre.entity';

@ObjectType()
export class Album {
  @Field(() => ID)
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  released: number;
  @Field(() => [Artist], { nullable: true })
  artists: [Artist];
  @Field(() => [Band], { nullable: true })
  bands: [Band];
  // @Field(() => [Track], { nullable: true })
  // tracks: [Track];
  @Field(() => [Genre], { nullable: true })
  genres: [Genre];
  @Field({ nullable: true })
  image: string;
}
