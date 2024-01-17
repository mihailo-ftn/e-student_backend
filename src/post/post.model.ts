import { ObjectType, Field } from "@nestjs/graphql";
import { ExaminationPeriod } from "src/examinationPeriod/examinationPeriod.model";
import { Professor } from "src/professor/professor.model";


@ObjectType()
export class Post {
  @Field(_type => String, {
    nullable: false
  })
  id!: string;

  @Field(_type => Date, {
    nullable: false
  })
  creationDate!: Date;

  @Field(_type => Professor, {
    nullable: false
  })
  creator?: Professor;

  @Field(_type => String, {
    nullable: true
  })
  creatorID?: string;

  @Field(_type => String, {
    nullable: true
  })
  text?: string | null;

  @Field(_type => Boolean, {
    nullable: true
  })
  important?: boolean;
}