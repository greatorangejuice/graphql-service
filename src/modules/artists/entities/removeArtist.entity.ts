import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemovedItem {
  @Field()
  acknowledged: string;

  @Field()
  deletedCount: boolean;
}