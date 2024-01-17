import { ObjectType, Field } from "@nestjs/graphql";
import { Class } from "src/class/class.model";
import { ExamRecord } from "src/exam/examRecord.model";
import { Modul } from "src/modul/modul.model";
import { Role } from "src/types/enums/role.model";


@ObjectType()
export class Student {
  @Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  firstName!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  middleName!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  lastName!: string;

  password!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  jmbg!: string;

  @Field((_type) => String, {
    nullable: false,
  })
  brind!: string;

  @Field((_type) => Date, {
    nullable: false,
  })
  birthDate!: Date;

  @Field(_type => Role, {
    nullable: false
  })
  role!: "ADMIN" | "STUDENT" | "PROFESSOR";

  modul?: Modul;

  @Field(_type => String, {
    nullable: false
  })
  
  class?: Class;

  @Field(_type => String, {
    nullable: false
  })
  classID!: string;

  @Field(_type => String, {
    nullable: false
  })
  modulID!: string;

  @Field(_type => ExamRecord, {
    nullable: false
  })
  exams?: ExamRecord[];
}
