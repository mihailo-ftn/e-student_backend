import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ClassInput {
  @Field((_type) => Int, {
    nullable: false,
  })
  classLabel!: number;
}
