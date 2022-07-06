import { Field, ObjectType } from '@nestjs/graphql';
import { Artist } from '../../artists/entities/artist.entity';

@ObjectType()
export class Member {
  // @Field(() => ID, { name: 'id' })
  _id: string;
  // @Field({ nullable: true })
  // firstName: string;
  // @Field({ nullable: true })
  // secondName: string;
  // @Field({ nullable: true })
  // middleName: string;
  @Field(() => Artist, { nullable: true })
  artist: Artist;
  @Field({ nullable: true })
  instrument: string;
  @Field(() => [String], { nullable: true })
  years: string;
}
