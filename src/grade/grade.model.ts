import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ExamRecord } from "src/exam/examRecord.model";


@ObjectType()
export class Grade {
  @Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @Field((_type) => Int, {
    nullable: false,
  })
  value!: number;

  @Field((_type) => ExamRecord, {
    nullable: false,
  })
  exam?: ExamRecord | null;
}
