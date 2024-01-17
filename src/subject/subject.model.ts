import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Exam } from "src/exam/exam.model";
import { Modul } from "src/modul/modul.model";
import { Professor } from "src/professor/professor.model";
import { SubjectType } from "src/types/enums/subjectType.model";


@ObjectType()
export class Subject {
  @Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  subjectName!: string;

  @Field((_type) => Int, {
    nullable: false,
  })
  espp!: number;

  @Field((_type) => Professor, {
    nullable: false,
  })
  professor?: Professor;

  @Field((_type) => String, {
    nullable: false,
  })
  professorID!: string;

  @Field((_type) => Exam, {
    nullable: false,
  })
  exam?: Exam | null;

  @Field((_type) => SubjectType, {
    nullable: false,
  })
  type!: "REQUIRED" | "ELECTIVE";

  @Field((_type) => Modul, {
    nullable: false,
  })
  modul?: Modul;

  @Field(_type => String, {
    nullable: false
  })
  modulID!: string;
}
