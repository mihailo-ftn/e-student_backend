import { InputType, Field, Float } from "@nestjs/graphql";


@InputType()
export class ExamRecordInput {
  @Field(_type => String, {
    nullable: false
  })
  examId!: string;

  @Field(_type => Float, {
    nullable: false
  })
  points!: number;

  @Field(_type => Boolean, {
    nullable: false
  })
  passed!: boolean;

  @Field(_type => String, {
    nullable: true
  })
  gradeID?: string | null;

  @Field(_type => String, {
    nullable: true
  })
  examID?: string | null;

  @Field(_type => String, {
    nullable: true
  })
  studentID?: string | null;
}
