import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Band } from '../../bands/entities/band.entity';

@ObjectType()
export class Artist {
  @Field(() => ID)
  _id: string;

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

  @Field(() => [Band], { nullable: true })
  bands: [Band];

  @Field({ nullable: true })
  instruments: string;
}
