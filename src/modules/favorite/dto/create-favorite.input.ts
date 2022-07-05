import { Field, ID, InputType } from '@nestjs/graphql';
import { IFavoriteType } from '../../../utils/helper-models';

@InputType()
export class CreateFavoriteInput {
  @Field()
  type: IFavoriteType;

  @Field(() => ID)
  id: string;
}
