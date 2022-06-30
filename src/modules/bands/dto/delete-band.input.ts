import { CreateBandInput } from './create-band.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBandInput extends PartialType(CreateBandInput) {
  @Field(() => ID)
  id: number;
}
