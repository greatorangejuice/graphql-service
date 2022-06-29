import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  secondName: string;
  @Field({ nullable: true })
  middleName: string;
  @Field({ nullable: true })
  birthDate: string;
  @Field({ nullable: true })
  birthPlace: string;
  @Field({ nullable: true })
  country: string;
  // @Field({ nullable: true })
  // bands: [ID];
  @Field({ nullable: true })
  instruments: string;
}
