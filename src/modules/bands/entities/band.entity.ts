import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Genre } from '../../genres/entities/genre.entity';

@ObjectType()
export class Band {
  @Field(() => ID, { name: 'id' })
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  origin: string;
  // @Field({ nullable: true })
  // members: [Member];
  @Field({ nullable: true })
  website: string;
  @Field(() => [Genre], { nullable: true })
  genres: Genre;

  genresIds: [string];
}
