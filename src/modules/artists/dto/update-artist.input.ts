import { CreateArtistInput } from './create-artist.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateArtistInput extends PartialType(CreateArtistInput) {
  @Field(() => ID)
  id: string;
}
