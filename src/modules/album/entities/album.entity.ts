import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Artist } from '../../artists/entities/artist.entity';
import { Band } from '../../bands/entities/band.entity';
import { Genre } from '../../genres/entities/genre.entity';
import { Track } from '../../track/entities/track.entity';

@ObjectType()
export class Album {
  @Field(() => ID, { name: 'id' })
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field(() => Int, { nullable: true })
  released: number;
  @Field(() => [Artist], { nullable: true })
  artists: [Artist];
  @Field(() => [Band], { nullable: true })
  bands: [Band];
  @Field(() => [Track], { nullable: true })
  tracks: [Track];
  @Field(() => [Genre], { nullable: true })
  genres: [Genre];
  @Field({ nullable: true })
  image: string;

  bandsIds: [string];
  artistsIds: [string];
  genresIds: [string];
  trackIds: [string];
}
