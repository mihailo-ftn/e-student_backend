import { Field, ObjectType } from "@nestjs/graphql";
import { Student } from "src/student/student.model";


@ObjectType()
export class Modul {
  @Field(_type => String, {
    nullable: false
  })
  id!: string;

  @Field(_type => String, {
    nullable: false
  })
  moduleName!: string;

  @Field(_type => String, {
    nullable: false
  })
  moduleCode!: string;

  students?: Student[];
}
