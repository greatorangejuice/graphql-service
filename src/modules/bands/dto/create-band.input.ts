import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBandInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
