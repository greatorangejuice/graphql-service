import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FavoriteInput {
  @Field(() => ID)
  id: string;
}
