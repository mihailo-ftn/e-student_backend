import { InputType, Field, Int } from "@nestjs/graphql";


@InputType()
export class GradeInput {
  @Field((_type) => Int, {
    nullable: false,
  })
  value!: number;
}
