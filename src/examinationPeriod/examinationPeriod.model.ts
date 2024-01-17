import { ObjectType, Field } from "@nestjs/graphql";
import { Exam } from "src/exam/exam.model";
import { Modul } from "src/modul/modul.model";


@ObjectType()
export class ExaminationPeriod {
  @Field((_type) => String, {
    nullable: false,
  })
  id!: string;

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


  @Field((_type) => [Exam], {
    nullable: false,
  })
  exams?: Exam[];

  modul?: Modul | null;

  @Field((_type) => String, {
    nullable: true,
  })
  modulID?: string | null;

  @Field((_type) => Boolean, {
    nullable: true,
  })
  active: Boolean
}
