import { InputType, Field } from "@nestjs/graphql";


@InputType()
export class ExaminationPeriodInput {
  @Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @Field((_type) => Date, {
    nullable: false,
  })
  beginningDate!: Date;

  @Field((_type) => Date, {
    nullable: false,
  })
  endDate!: Date;

  @Field((_type) => String, {
    nullable: false,
  })
  modulID: string;
}
