import { CreateTrackInput } from './create-track.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrackInput extends PartialType(CreateTrackInput) {
  @Field(() => ID)
  id: string;
}
