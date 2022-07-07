import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Genre } from '../../genres/entities/genre.entity';
import { Member } from './members.entity';

@ObjectType()
export class Band {
  @Field(() => ID, { name: 'id' })
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  origin: string;
  @Field(() => [Member], { nullable: 'itemsAndList' })
  members: [Member];
  @Field({ nullable: true })
  website: string;
  @Field(() => [Genre], { nullable: 'itemsAndList' })
  genres: Genre;

  genresIds: [string];
}
