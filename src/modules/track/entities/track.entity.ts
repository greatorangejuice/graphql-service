import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Band } from '../../bands/entities/band.entity';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Genre } from '../../genres/entities/genre.entity';

@ObjectType()
export class Track {
  @Field(() => ID, { name: 'id' })
  _id: string;
  @Field()
  title: string;
  @Field(() => Album, { nullable: true })
  album: Album;
  @Field(() => [Artist], { nullable: true })
  artists: [Artist];
  @Field(() => [Band], { nullable: true })
  bands: [Band];
  @Field(() => Int, { nullable: true })
  duration: number;
  @Field(() => Int, { nullable: true })
  released: number;
  @Field(() => [Genre], { nullable: true })
  genres: [Genre];

  albumId: string;
  artistsIds: [string];
  bandsIds: [string];
  genresIds: [string];
}
