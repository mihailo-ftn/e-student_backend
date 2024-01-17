import { ObjectType, Field } from "@nestjs/graphql";
import { ExaminationPeriod } from "src/examinationPeriod/examinationPeriod.model";
import { Subject } from "src/subject/subject.model";
import { ExamRecord } from "./examRecord.model";


@ObjectType()
export class Exam {
  @Field(_type => String, {
    nullable: false
  })
  id!: string;

  @Field(_type => Date, {
    nullable: false
  })
  date!: Date;

  @Field(_type => Subject, {
    nullable: false
  })
  subject?: Subject;

  @Field(_type => String, {
    nullable: true
  })
  subjectID?: string;

  @Field(_type => ExaminationPeriod, {
    nullable: true
  })
  examinationPeriod?: ExaminationPeriod | null;

  @Field(_type => String, {
    nullable: true
  })
  exPeriodID?: string | null;


  @Field(_type => ExamRecord, {
    nullable: true
  })
  examRecord?: ExamRecord | null;

}