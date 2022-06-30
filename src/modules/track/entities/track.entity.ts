import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
