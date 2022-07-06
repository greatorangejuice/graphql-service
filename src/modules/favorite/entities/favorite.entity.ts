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
  @Field(() => [Band], { nullable: 'itemsAndList' })
  bands: [Band];
  @Field(() => [Genre], { nullable: 'itemsAndList' })
  genres: [Genre];
  @Field(() => [Artist], { nullable: 'itemsAndList' })
  artists: [Artist];
  @Field(() => [Track], { nullable: 'itemsAndList' })
  tracks: [Track];

  bandsIds: [string];
  genresIds: [string];
  tracksIds: [string];
  artistsIds: [string];
}
