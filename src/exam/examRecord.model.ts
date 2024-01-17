import { ObjectType, Field, Float } from "@nestjs/graphql";
import { Grade } from "src/grade/grade.model";
import { Student } from "src/student/student.model";
import { Exam } from "./exam.model";


@ObjectType()
export class ExamRecord {
  @Field(_type => String, {
    nullable: false
  })
  examId!: string;

  @Field(_type => String, {
    nullable: false
  })
  id!: string;

  @Field(_type => Float, {
    nullable: false
  })
  points!: number;

  @Field(_type => Boolean, {
    nullable: false
  })
  passed!: boolean;

  @Field(_type => Grade, {
    nullable: false
  })
  grade?: Grade | null;

  @Field(_type => String, {
    nullable: true
  })
  gradeID?: string | null;

  @Field(_type => Exam, {
    nullable: false
  })
  exam?: Exam | null;

  @Field(_type => String, {
    nullable: true
  })
  examID?: string | null;

  @Field(_type => Student, {
    nullable: true
  })
  student?: Student | null;

  @Field(_type => String, {
    nullable: true
  })
  studentID?: string | null;

  @Field(_type => Boolean, {
    nullable: false
  })
  singed!: boolean;
}