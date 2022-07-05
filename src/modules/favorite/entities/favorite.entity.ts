import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Artist } from '../../artists/entities/artist.entity';
import { Band } from '../../bands/entities/band.entity';
import { Genre } from '../../genres/entities/genre.entity';
import { Track } from '../../track/entities/track.entity';

@ObjectType()
export class Favorite {
  @Field(() => ID, { name: 'id' })
  _id: string;
  @Field(() => ID, { nullable: true })
  userId: string;
  @Field(() => [Band], { nullable: true })
  bands: [Band];
  @Field(() => [Genre], { nullable: true })
  genres: [Genre];
  @Field(() => [Artist], { nullable: true })
  artists: [Artist];
  @Field(() => [Track], { nullable: true })
  tracks: [Track];

  bandsIds: [string];
  genresIds: [string];
  tracksIds: [string];
  artistsIds: [string];
}
