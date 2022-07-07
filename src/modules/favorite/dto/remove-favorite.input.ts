import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IFavoriteType } from '../../../utils/helper-models';
import { FavoriteInput } from './favorite.input';

@InputType()
export class RemoveFavoriteInput extends PartialType(FavoriteInput) {
  @Field()
  type: IFavoriteType;
}
