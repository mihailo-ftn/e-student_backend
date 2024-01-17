import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Student } from "src/student/student.model";

@ObjectType()
export class Class {
  @Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @Field((_type) => Int, {
    nullable: false,
  })
  classLabel!: number;

  @Field((_type) => Student, {
    nullable: false,
  })
  sudents?: Student[];
}